import {Colors, FONTS, shadow} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {CartItem} from '@modules/cart/types';
import PaymentBreakdown from '@modules/cart/components/paymentBreakdown';
import {useCalculatePaymentBreakdown} from '@modules/cart/utils';

interface Props {
  orderItems: CartItem[];
}

const PaymentSummary: FC<Props> = ({orderItems}) => {
  const calculatePaymentBreakdown = useCalculatePaymentBreakdown();
  const {paymentBreakDownArray, mrp, totalPrice, discount} =
    calculatePaymentBreakdown(orderItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Summary</Text>
      <PaymentBreakdown
        paymentBreakdownArray={paymentBreakDownArray}
        mrp={mrp}
        totalPrice={totalPrice}
        discount={discount}
        style={styles.breakdown}
      />
    </View>
  );
};

export default PaymentSummary;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingBottom: 20,
    marginTop: 20,
    marginBottom: 50,
    ...shadow[2],
  },
  title: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 16,
  },
  breakdown: {
    borderRadius: 0,
    marginVertical: 0,
    paddingHorizontal: 0,
    paddingBottom: 5,
  },
});
