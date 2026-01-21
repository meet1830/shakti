import {Colors, FONTS, shadow} from '@utils/Constants';
import React, {FC, Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Divider from '@modules/components/divider';

const PaymentOptions: FC = () => {
  return (
    <Fragment>
      <View style={styles.header}>
        <Text style={styles.headerText}>3. Payment Options</Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.optionContainer}>
        <View style={styles.option}>
          <View style={styles.radio}>
            <View style={styles.radioInner} />
          </View>
          <Text style={styles.optionText}>Cash on Delivery</Text>
        </View>
        <Text style={styles.optionNote}>
          You will have option of paying both online or cash to the delivery
          person
        </Text>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
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
  optionContainer: {
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    ...shadow[2],
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  radio: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.text,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    backgroundColor: Colors.text,
    borderRadius: 50,
    height: 12,
    width: 12,
  },
  optionText: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 16,
  },
  optionNote: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.inactive,
    fontSize: 12,
    marginTop: 10,
  },
});

export default PaymentOptions;
