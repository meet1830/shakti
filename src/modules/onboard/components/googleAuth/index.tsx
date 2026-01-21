import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Colors, FONTS} from '@utils/Constants';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {FC, Fragment, RefObject, useState} from 'react';

import {AuthType} from '@modules/onboard/types';
import {ConfigKey} from '@modules/types';
import {getConfig} from '@utils/index';
import {useLoginUser} from '@modules/onboard/hooks';

GoogleSignin.configure({
  webClientId: getConfig(ConfigKey.AUTH_WEB_CLIENT_ID), // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: getConfig(ConfigKey.AUTH_IOS_CLIENT_ID), // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
  openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

interface Props {
  disableRef: RefObject<boolean>;
}

const GoogleAuth: FC<Props> = ({disableRef}) => {
  const {loginUser} = useLoginUser();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleGoogleAuth = async () => {
    if (loading || disableRef.current) {
      return;
    }
    try {
      setLoading(true);
      disableRef.current = true;
      setLoginError('');

      await GoogleSignin.hasPlayServices();

      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const user = response.data;

        if (user.idToken) {
          const error = await loginUser({
            idToken: user.idToken,
            authType: AuthType.google,
          });
          if (error) {
            setLoginError(error?.message);
          }
        }
      } else {
        // sign in was cancelled by user
      }
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            setLoginError(error.message);
            break;
          default:
            setLoginError(error.message);
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
        setLoginError(error.message);
      }
    } finally {
      setLoading(false);
      disableRef.current = false;
    }
  };

  return (
    <Fragment>
      <View style={styles.buttonContainer}>
        <GoogleSigninButton
          onPress={handleGoogleAuth}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          style={styles.google}
          disabled={loading}
        />
        {loading && <ActivityIndicator />}
      </View>
      {loginError && <Text style={styles.error}>{loginError}</Text>}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  google: {flex: 1},
  error: {
    fontFamily: FONTS.heading2,
    color: Colors.error,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default GoogleAuth;
