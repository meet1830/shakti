import {Colors, FONTS, shadow} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {CartItem} from '@modules/cart/types';
import Divider from '@modules/components/divider';
import PaymentBreakdown from '../paymentBreakdown';
import {useCalculatePaymentBreakdown} from '@modules/cart/utils';

interface Props {
  cartItems: CartItem[];
}

const PaymentSummary: FC<Props> = ({cartItems}) => {
  const calculatePaymentBreakdown = useCalculatePaymentBreakdown();
  const {mrp, discount, totalPrice, paymentBreakDownArray} =
    calculatePaymentBreakdown(cartItems);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>4. View Payment Summary</Text>
        <Divider style={styles.divider} />
      </View>
      <PaymentBreakdown
        paymentBreakdownArray={paymentBreakDownArray}
        mrp={mrp}
        discount={discount}
        totalPrice={totalPrice}
        style={shadow[2]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 50},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
  },
  headerText: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.inactive,
    fontSize: 16,
  },
  divider: {flex: 1, marginVertical: 0},
});

export default PaymentSummary;
