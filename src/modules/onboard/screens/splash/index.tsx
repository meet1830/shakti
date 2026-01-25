import {Image, StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';

import {Colors} from '@utils/Constants';
import ImageAutoScroll from '@modules/components/imageAutoScroll';
import {useGetConstants} from '@modules/onboard/hooks';

const Splash: FC = () => {
  const {getConstants} = useGetConstants();

  useEffect(() => {
    getConstants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ImageAutoScroll
      source={require('@assets/images/splash.webp')}
      width={1500}>
      <View style={styles.container}>
        <Image
          source={require('@assets/images/logo_t.png')}
          style={styles.image}
        />
      </View>
    </ImageAutoScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});

export default Splash;
