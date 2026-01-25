import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Colors, FONTS} from '@utils/Constants';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {FC, Fragment, RefObject, useEffect, useState} from 'react';

import {AuthType} from '@modules/onboard/types';
import {ConfigKey} from '@modules/types';
import {Logger} from '@utils/logger';
import {getConfig} from '@utils/index';
import {useLoginUser} from '@modules/onboard/hooks';

interface Props {
  disableRef: RefObject<boolean>;
}

const GoogleAuth: FC<Props> = ({disableRef}) => {
  const {loginUser} = useLoginUser();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleGoogleAuth = async () => {
    const logger: Record<string, any> = {};

    if (loading || disableRef.current) {
      logger.loading = loading;
      logger.disableRef = disableRef.current;
      return;
    }
    try {
      logger.started = true;
      setLoading(true);
      disableRef.current = true;
      setLoginError('');

      const hasPlayServices = await GoogleSignin.hasPlayServices();
      logger.hasPlayServices = hasPlayServices;

      const response = await GoogleSignin.signIn();
      logger.signIn = response;

      if (response.idToken) {
        const error = await loginUser({
          idToken: response.idToken,
          authType: AuthType.google,
        });
        if (error) {
          setLoginError(error?.message);
          logger.loginError = error;
        }
      } else {
        setLoginError('Something went wrong');
      }
    } catch (error: any) {
      logger.error = error;
      if (error.code) {
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
      logger.finished = true;

      Logger.debug('GoogleSignIn', logger);
    }
  };

  useEffect(() => {
    try {
      GoogleSignin.configure({
        scopes: [],
        webClientId: getConfig(ConfigKey.AUTH_WEB_CLIENT_ID), // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
        iosClientId: getConfig(ConfigKey.AUTH_IOS_CLIENT_ID),
        profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
      });
    } catch (error: any) {
      setLoginError(error);
      Logger.error('GoogleSignIn configure', {error});
    }
  }, []);

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
