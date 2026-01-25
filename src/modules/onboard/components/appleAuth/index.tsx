import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, FONTS} from '@utils/Constants';
import React, {FC, Fragment, RefObject, useState} from 'react';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';

import {AuthType} from '@modules/onboard/types';
import { Logger } from '@utils/logger';
import {useLoginUser} from '@modules/onboard/hooks';

interface Props {
  disableRef: RefObject<boolean>;
}

const AppleAuth: FC<Props> = ({disableRef}) => {
  const {loginUser} = useLoginUser();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleAppleSignAuth = async () => {
    const logger: Record<string, any> = {};

    if (loading || disableRef.current) {
      logger.loading = loading;
      logger.disableRef = disableRef.current;
      return;
    }

    try {
      setLoading(true);
      disableRef.current = true;
      setLoginError('');

      logger.started = true;
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      logger.response = appleAuthRequestResponse;

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      logger.credentialState = credentialState;

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated

        const {identityToken, email, fullName} = appleAuthRequestResponse;

        if (identityToken) {
          const error = await loginUser({
            idToken: identityToken,
            authType: AuthType.apple,
            fullname: fullName?.givenName
              ? `${fullName.givenName} ${fullName.familyName}`
              : null,
            email,
          });

          if (error) {
            setLoginError(error?.message);
            logger.error = error;
          }
        }
      }
    } catch (error: any) {
      logger.error = error;
      if ((error?.message as string)?.includes('1001')) {
        return;
      }
      setLoginError(error?.message);
    } finally {
      setLoading(false);
      disableRef.current = false;
      Logger.debug('AppleSignIn', logger);
    }
  };

  if (Platform.OS !== 'ios' || !appleAuth.isSupported) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <View style={styles.buttonContainer}>
        <AppleButton
          style={[styles.apple, loading && styles.buttonLoading]}
          onPress={handleAppleSignAuth}
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
        />
        {loading && <ActivityIndicator />}
      </View>
      {loginError && <Text style={styles.error}>{loginError}</Text>}
    </Fragment>
  );
};

export default AppleAuth;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  apple: {height: 42, width: '98%', alignSelf: 'center'},
  buttonLoading: {width: '89%'},
  error: {
    fontFamily: FONTS.heading2,
    color: Colors.error,
    textAlign: 'center',
    fontWeight: '500',
  },
});
