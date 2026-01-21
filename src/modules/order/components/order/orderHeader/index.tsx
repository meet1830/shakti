import {Colors, FONTS} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import apiService from '@modules/config/api/service';
import {useAppSelector} from '@store/hooks';

const OrderHeader: FC = () => {
  const user = useAppSelector(gState => gState.auth.user);

  const logout = () => {
    apiService.logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Text style={styles.name}>Hi, {user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <TouchableOpacity onPress={logout} style={styles.logout}>
        <Text style={styles.logoutTitle}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  user: {flex: 1},
  name: {
    fontFamily: FONTS.heading,
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
  },
  email: {
    fontFamily: FONTS.heading,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.inactive,
    marginTop: 5,
  },
  logout: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightYellow,
    borderRadius: 10,
  },
  logoutTitle: {
    fontFamily: FONTS.heading,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
});
