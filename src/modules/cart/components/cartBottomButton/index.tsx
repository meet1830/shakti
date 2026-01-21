import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Colors,
  FONTS,
  FREE_DELIVERY_ORDER_VALUE,
  MIN_ORDER_VALUE,
} from '@utils/Constants';
import React, {FC, Fragment, useState} from 'react';
import {
  useCalculatePaymentBreakdown,
  useGetCart,
  useIsUserFieldsMissing,
} from '@modules/cart/utils';

import AddressSheet from '@modules/components/addressSheet';
import BottomSheet from '@modules/components/bottomsheet';
import ClearInputButton from '@modules/components/clearInputButton';
import Icon from '@modules/components/icon';
import IfElse from '@modules/components/ifElse';
import PaymentBreakdown from '../paymentBreakdown';
import {formatCurrency} from '@utils/index';
import {navigate} from '@navigation/NavigationUtil';
import {useAppSelector} from '@store/hooks';
import {useCreateOrder} from '@modules/cart/hooks';

const CartBottomButton: FC = () => {
  const constants = useAppSelector(gState => gState.auth.constants);
  const minimumOrderValue =
    Number(constants?.MIN_ORDER_VALUE) || MIN_ORDER_VALUE;
  const freeDeliveryOrderValue =
    Number(constants?.FREE_DELIVERY_ORDER_VALUE) || FREE_DELIVERY_ORDER_VALUE;
  const cartItems = Object.values(useGetCart());
  const calculatePaymentBreakdown = useCalculatePaymentBreakdown();
  const {
    total,
    minOrderValueDiff,
    totalPrice,
    mrp,
    discount,
    paymentBreakDownArray,
  } = calculatePaymentBreakdown(cartItems);
  const userFieldsMissing = useIsUserFieldsMissing();
  const [paymentSheet, setPaymentSheet] = useState(false);
  const [addressSheet, setAddressSheet] = useState(false);
  const {createOrder, createOrderError, createOrderLoading} = useCreateOrder();

  const togglePaymentSheet = () => {
    setPaymentSheet(prev => !prev);
  };

  const toggleAddressSheet = () => {
    setAddressSheet(prev => !prev);
  };

  const handlePlaceOrder = () => {
    if (minOrderValueDiff > 0) {
      navigate('MainNavigator', {
        screen: 'Shop',
      });
      return;
    }
    if (userFieldsMissing) {
      toggleAddressSheet();
      return;
    }
    createOrder(cartItems);
  };

  const headerTextComponent = () => {
    if (!total || total <= 0) {
      return <></>;
    }
    if (minOrderValueDiff > 0) {
      return (
        <Text>
          Min order value is {formatCurrency(minimumOrderValue)}, add items of{' '}
          <Text style={styles.minOrderValue}>
            {formatCurrency(minOrderValueDiff)}
          </Text>{' '}
          to proceed
        </Text>
      );
    }
    if (userFieldsMissing) {
      return <Text>Add your details so that we can deliver your order</Text>;
    }
    if (totalPrice < freeDeliveryOrderValue) {
      return (
        <Text>
          <Text style={styles.free}>🎉 FREE</Text> deliveries on orders above
          MRP{' '}
          <Text style={styles.freeValue}>
            {formatCurrency(freeDeliveryOrderValue - 100)}
          </Text>
        </Text>
      );
    }
    if (totalPrice >= freeDeliveryOrderValue) {
      return (
        <Text>
          Enjoy your order with{' '}
          <Text style={styles.freeDelivery}>FREE delivery 🎉</Text>
        </Text>
      );
    }
    return <></>;
  };

  const buttonTextHelper = () => {
    if (!total || total <= 0) {
      return '';
    }
    if (minOrderValueDiff > 0) {
      return 'Add Items';
    }
    if (userFieldsMissing) {
      return 'Add your Details';
    }
    return 'Place Order';
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <Text style={styles.header}>{headerTextComponent()}</Text>
        <View style={styles.content}>
          <TouchableOpacity onPress={togglePaymentSheet} style={styles.total}>
            <Text style={styles.totalText}>{formatCurrency(total)}</Text>
            <View style={styles.view}>
              <Text style={styles.viewText}>View Summary</Text>
              <Icon
                name="keyboard-arrow-down"
                size={20}
                color={Colors.text}
                iconFamily="MaterialIcons"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.right}>
            <TouchableOpacity onPress={handlePlaceOrder} style={styles.button}>
              <IfElse
                condition={createOrderLoading}
                ifComp={
                  <ActivityIndicator size={'small'} color={Colors.text} />
                }
                elseComp={
                  <Text style={styles.buttonText}>{buttonTextHelper()}</Text>
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        {createOrderError && (
          <Text style={styles.error}>{createOrderError}</Text>
        )}
      </View>
      {paymentSheet && (
        <BottomSheet open={paymentSheet} onClose={togglePaymentSheet}>
          <Fragment>
            <View style={styles.payment}>
              <Text style={styles.paymentText}>Payment Summary</Text>
              <ClearInputButton onClear={togglePaymentSheet} />
            </View>
            <PaymentBreakdown
              paymentBreakdownArray={paymentBreakDownArray}
              mrp={mrp}
              discount={discount}
              totalPrice={totalPrice}
            />
          </Fragment>
        </BottomSheet>
      )}
      {addressSheet && (
        <AddressSheet open={addressSheet} onClose={toggleAddressSheet} />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  minOrderValue: {fontWeight: '800'},
  free: {fontWeight: '800'},
  freeValue: {fontWeight: '800'},
  freeDelivery: {fontWeight: '800'},
  container: {
    marginBottom: 5,
    marginHorizontal: 10,
  },
  header: {
    fontFamily: FONTS.heading2,
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
    backgroundColor: Colors.lightYellow,
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 20,
    marginBottom: -15,
    borderRadius: 10,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {flex: 1},
  totalText: {
    fontFamily: FONTS.heading2,
    fontSize: 18,
    color: Colors.text,
    fontWeight: '700',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 1,
  },
  viewText: {
    fontFamily: FONTS.heading2,
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
  },
  right: {alignItems: 'flex-end'},
  button: {
    minWidth: 125,
    borderWidth: 1,
    borderColor: Colors.inactive,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightYellow,
  },
  buttonText: {
    fontFamily: FONTS.heading2,
    fontSize: 14,
    color: Colors.text,
    fontWeight: '800',
    textAlign: 'center',
  },
  error: {
    fontFamily: FONTS.heading2,
    fontSize: 14,
    color: Colors.error,
    fontWeight: '800',
    textAlign: 'center',
    marginVertical: 10,
  },
  payment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  paymentText: {
    fontFamily: FONTS.heading2,
    fontSize: 18,
    color: Colors.text,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    marginRight: -25,
  },
});

export default CartBottomButton;
