import {Colors, FONTS} from '@utils/Constants';
import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {CartNavigationParams} from '@modules/cart/types';
import Icon from '@modules/components/icon';
import {navigate} from '@navigation/NavigationUtil';
import {useGetCart} from '@modules/cart/utils';

interface Props {
  source?: 'ItemDetail';
  hideButton?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CartButton: FC<Props> = props => {
  const {hideButton, source, style} = props;
  const cartItems = Object.keys(useGetCart()).length;
  const cartItemsCount = cartItems
    ? String(cartItems).padStart(2, '0')
    : undefined;

  const navigateToCart = () => {
    navigate('Cart', {
      source,
    } as CartNavigationParams);
  };

  if (!cartItemsCount && hideButton) {
    return <></>;
  }

  return (
    <TouchableOpacity
      onPress={navigateToCart}
      style={[styles.container, style]}>
      {cartItemsCount && (
        <View style={styles.count}>
          <Text style={styles.countText}>{cartItemsCount}</Text>
        </View>
      )}
      <View style={styles.icon}>
        <Icon
          name="shopping-cart"
          size={24}
          color={Colors.text}
          iconFamily="MaterialIcons"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'flex-end', marginVertical: 20},
  count: {
    backgroundColor: Colors.lightYellow,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: -15,
    marginLeft: 30,
    alignSelf: 'flex-end',
    zIndex: 1,
    paddingVertical: 5,
  },
  countText: {
    fontFamily: FONTS.heading2,
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  icon: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 50,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default CartButton;
