import {Image, StyleSheet, View} from 'react-native';
import React, {FC, useEffect} from 'react';

import {Colors} from '@utils/Constants';
import {useGetConstants} from '@modules/onboard/hooks';

const Splash: FC = () => {
  const {getConstants} = useGetConstants();

  useEffect(() => {
    getConstants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/logo_t.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  image: {height: 200, width: 200, resizeMode: 'contain'},
});

export default Splash;
