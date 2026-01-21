import {Colors, FONTS, MIN_ORDER_VALUE} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from '@modules/components/icon';
import {formatCurrency} from '@utils/index';
import {navigate} from '@navigation/NavigationUtil';
import {useAppSelector} from '@store/hooks';

interface Props {
  minOrderValueDiff: number;
}

const MinimumOrderValue: FC<Props> = ({minOrderValueDiff}) => {
  const minimumOrderValue = Number(
    useAppSelector(gState => gState.auth.constants?.MIN_ORDER_VALUE) ||
      MIN_ORDER_VALUE,
  );

  const navigateToShop = () => {
    navigate('MainNavigator', {
      screen: 'Shop',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.minOrderValue}>
        <Icon
          name="alert-circle"
          size={18}
          color={Colors.black}
          iconFamily="Ionicons"
          style={styles.alertIcon}
        />
        <Text style={styles.minOrderValueText}>
          Minimum order is {formatCurrency(minimumOrderValue)}.
        </Text>
      </View>
      <View style={styles.addContainer}>
        <Text style={styles.addText}>
          Please add more items worth{' '}
          <Text style={styles.addTextPrice}>
            {formatCurrency(minOrderValueDiff)}
          </Text>{' '}
          to place your order.
        </Text>
        <TouchableOpacity onPress={navigateToShop} style={styles.addItems}>
          <Text style={styles.addItemsText}>Add Items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: Colors.lightYellow,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 20,
  },
  minOrderValue: {flexDirection: 'row', gap: 5, alignItems: 'center'},
  alertIcon: {marginLeft: -2},
  minOrderValueText: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 14,
    flex: 1,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addText: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.text,
    fontSize: 14,
    marginTop: 5,
    flex: 1,
  },
  addTextPrice: {fontWeight: '800'},
  addItems: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 10,
    maxWidth: 100,
    borderWidth: 1,
    borderColor: Colors.inactive,
  },
  addItemsText: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 14,
  },
});

export default MinimumOrderValue;
