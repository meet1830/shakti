import {Colors, FONTS, shadow} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {CartItem} from '@modules/cart/types';
import CartItemComp from '@modules/cart/components/cartItemComp';
import Divider from '@modules/components/divider';

interface Props {
  orderItems: CartItem[];
}

const OrderItemsList: FC<Props> = ({orderItems}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Items</Text>
      <Divider style={styles.divider} />
      {orderItems?.map((orderItem, index, orderItemsArray) => {
        return (
          <CartItemComp
            key={index}
            index={index}
            items={orderItemsArray}
            item={orderItem}
            mode="Order"
          />
        );
      })}
    </View>
  );
};

export default OrderItemsList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: 20,
    borderRadius: 10,
    ...shadow[2],
  },
  title: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 12,
  },
  divider: {marginVertical: 0, opacity: 0.2},
});
