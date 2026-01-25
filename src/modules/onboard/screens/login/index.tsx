import {Colors, FONTS} from '@utils/Constants';
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, useRef} from 'react';

import AppleAuth from '@modules/onboard/components/appleAuth';
import GoogleAuth from '@modules/onboard/components/googleAuth';
import ImageAutoScroll from '@modules/components/imageAutoScroll';
import {name} from '../../../../../app.json';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Login: FC = () => {
  const disableRef = useRef(false);
  const {bottom} = useSafeAreaInsets();

  return (
    <ImageAutoScroll
      source={require('@assets/images/splash.webp')}
      width={1500}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@assets/images/logo_t.png')}
            style={styles.image}
          />
        </View>
        <View
          style={[
            styles.login,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              paddingBottom: bottom ? bottom + 20 : 70,
            },
          ]}>
          <Text style={styles.heading}>Welcome to {name}</Text>
          <Text style={styles.subheader}>Login to view delicious namkeen!</Text>
          <View style={styles.buttonContainer}>
            <GoogleAuth disableRef={disableRef} />
            <AppleAuth disableRef={disableRef} />
          </View>
        </View>
      </View>
    </ImageAutoScroll>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 125,
    width: 125,
    resizeMode: 'contain',
    borderRadius: 50,
    padding: 10,
    backgroundColor: Colors.primary,
  },
  container: {flex: 1},
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
