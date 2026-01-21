import {Colors, FONTS} from '@utils/Constants';
import React, {FC, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useGetCart, useUpdateCartItem} from '@modules/cart/utils';

import {CartItem} from '@modules/cart/types';
import Icon from '@modules/components/icon';
import {Product} from '@modules/home/types';

interface Props {
  catalogItem?: Product;
  cartItem?: CartItem;
  handleRemove?: () => void;
}

const QuantitySelector: FC<Props> = ({catalogItem, cartItem, handleRemove}) => {
  const item = catalogItem || cartItem;
  const quantity = useGetCart()?.[item?._id || '']?.quantity || 0;
  const quantityRef = useRef(quantity);
  const updateCartItem = useUpdateCartItem();

  const add = () => {
    quantityRef.current = 1;
    updateCartItem(item, quantityRef.current);
  };

  const increment = () => {
    quantityRef.current++;
    updateCartItem(item, quantityRef.current);
  };

  const decrement = () => {
    if (quantityRef.current === 1 && handleRemove) {
      handleRemove();
    } else {
      quantityRef.current--;
      updateCartItem(item, quantityRef.current);
    }
  };

  if (!quantity) {
    return (
      <TouchableOpacity
        onPress={add}
        hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
        style={styles.noContainer}>
        <Text style={styles.add}>ADD</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={decrement}
        hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
        style={styles.iconRemove}>
        <Icon
          name="remove"
          size={28}
          color={Colors.text}
          iconFamily="MaterialIcons"
        />
      </TouchableOpacity>
      <View style={styles.quantity}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={increment}
        hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
        style={styles.iconAdd}>
        <Icon
          name="add"
          size={28}
          color={Colors.text}
          iconFamily="MaterialIcons"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightYellow,
    width: 125,
    borderWidth: 1,
    borderColor: Colors.inactive,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 30,
    marginTop: 5,
  },
  add: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 14,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.lightYellow,
    width: 125,
    minHeight: 30,
    marginTop: 5,
  },
  iconRemove: {
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 3,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  quantityText: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 16,
  },
  iconAdd: {
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 3,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuantitySelector;
