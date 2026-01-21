import {Colors, FONTS, FREE_DELIVERY_ORDER_VALUE} from '@utils/Constants';
import React, {FC, Fragment} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

import Divider from '@modules/components/divider';
import {formatCurrency} from '@utils/index';
import {useAppSelector} from '@store/hooks';

interface Props {
  paymentBreakdownArray: any[];
  mrp: number;
  discount: number;
  totalPrice: number;
  style?: StyleProp<ViewStyle>;
}

const PaymentBreakdown: FC<Props> = ({
  paymentBreakdownArray,
  mrp,
  discount,
  totalPrice,
  style,
}) => {
  const constants = useAppSelector(gState => gState.auth.constants);
  const freeDeliveryOrderValue =
    Number(constants?.FREE_DELIVERY_ORDER_VALUE) || FREE_DELIVERY_ORDER_VALUE;

  return (
    <View style={[styles.container, style]}>
      {/* Minimum order value notification */}
      {/* {minOrderValueDiff > 0 && (
          <MinimumOrderValue minOrderValueDiff={minOrderValueDiff} />
        )} */}

      {paymentBreakdownArray.map(
        ({key, header, value, formatted}, index, array) => {
          const isLastItem = index + 1 === array.length;

          if (key === 'discount' && discount <= 0) {
            return <Fragment key={key} />;
          }

          return (
            <Fragment key={key}>
              <View
                style={[
                  styles.item,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    marginTop: index !== 0 ? 5 : 0,
                  },
                ]}>
                {/* header */}
                <View style={styles.header}>
                  <Text
                    style={[
                      styles.headerText,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        fontWeight: key === 'total' ? '600' : '500',
                        fontSize: key === 'total' ? 17 : 14,
                      },
                    ]}>
                    {header}
                  </Text>
                  {key === 'deliveryFee' &&
                    totalPrice < freeDeliveryOrderValue && (
                      <Text style={styles.free}>
                        🎉 FREE for orders above MRP{' '}
                        {formatCurrency(freeDeliveryOrderValue - 100)}
                      </Text>
                    )}
                </View>

                {/* amount */}
                <Text
                  style={[
                    styles.amount,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      color:
                        key === 'discount' ||
                        (key === 'deliveryFee' && value === 0)
                          ? Colors.success
                          : Colors.text,
                      fontSize: key === 'total' ? 17 : 14,
                    },
                  ]}>
                  {key === 'mrp' && mrp && totalPrice && mrp > totalPrice && (
                    <Text style={styles.mrp}>{formatCurrency(mrp)}</Text>
                  )}
                  {'  '}
                  {formatted}
                </Text>
              </View>
              {!isLastItem && <Divider style={styles.divider} />}
            </Fragment>
          );
        },
      )}
      {discount > 0 && (
        <Text style={styles.discount}>
          You Saved {formatCurrency(discount)} 🎉
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  header: {flex: 1},
  headerText: {
    fontFamily: FONTS.heading2,
    color: Colors.text,
  },
  free: {
    fontFamily: FONTS.heading2,
    fontWeight: '800',
    color: Colors.text,
    fontSize: 12,
    marginTop: 3,
  },
  amount: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    textAlign: 'right',
  },
  mrp: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.inactive,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  divider: {marginVertical: 10, opacity: 0.2},
  discount: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.success,
    fontSize: 14,
    textAlign: 'right',
    marginTop: 5,
  },
});

export default PaymentBreakdown;
