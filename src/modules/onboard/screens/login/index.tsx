import {Colors, FONTS} from '@utils/Constants';
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, useRef} from 'react';

import AppleAuth from '@modules/onboard/components/appleAuth';
import GoogleAuth from '@modules/onboard/components/googleAuth';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Login: FC = () => {
  const {bottom} = useSafeAreaInsets();
  const disableRef = useRef(false);

  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/logo_t.png')}
        style={styles.image}
      />
      <View
        style={[
          styles.login,
          {
            paddingBottom: bottom + 20,
          },
        ]}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subheader}>Login to view delicious namkeen!</Text>
        <View style={styles.buttonContainer}>
          <GoogleAuth disableRef={disableRef} />
          <AppleAuth disableRef={disableRef} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'center',
  },
  container: {flex: 1, backgroundColor: Colors.primary},
  login: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    paddingTop: 25,
  },
  heading: {
    fontFamily: FONTS.heading,
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: '800',
    marginBottom: 15,
    marginTop: 5,
    color: Colors.text,
  },
  subheader: {
    fontFamily: FONTS.heading2,
    marginBottom: 20,
    fontWeight: '400',
    color: Colors.text,
    fontSize: 16,
  },
  buttonContainer: {gap: 25},
});

export default Login;
