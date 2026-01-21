import {Colors, FONTS, shadow} from '@utils/Constants';
import {Order, OrderStatus} from '@modules/order/types';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from '@modules/components/icon';
import {OrderDetailSource} from '@modules/order/types/orderDetail';
import {resetAndNavigate} from '@navigation/NavigationUtil';

interface Props {
  order: Order;
  source: OrderDetailSource;
}

const OrderStatusInfo: FC<Props> = ({order, source}) => {
  const resetToHome = () => {
    resetAndNavigate('MainNavigator', {
      screen: 'Shop',
    });
  };

  const resetToOrders = () => {
    resetAndNavigate('MainNavigator', {
      screen: 'Orders',
    });
  };

  const estimatedDeliveryDate =
    new Date(order?.createdAt).getDate() === new Date().getDate()
      ? 'Tomorrow'
      : 'Today';

  let statusInfo = {icon: <></>, header: '', subheader: ''};
  switch (order.status) {
    case OrderStatus.orderPlaced:
      statusInfo = {
        icon: (
          <Icon
            name="checkmark-circle-sharp"
            size={46}
            color={Colors.primary}
            iconFamily="Ionicons"
          />
        ),
        header: 'Order placed successfully',
        subheader: `Estimated delivery date: ${estimatedDeliveryDate}⚡️`,
      };
      break;
    case OrderStatus.delivered:
      statusInfo = {
        icon: (
          <Icon
            name="checkmark-done-circle-sharp"
            size={46}
            color={Colors.primary}
            iconFamily="Ionicons"
          />
        ),
        header: 'Order delivered successfully',
        subheader: 'Enjoy your delicious namkeen 🎉',
      };
      break;
    case OrderStatus.cancelled:
      statusInfo = {
        icon: (
          <Icon
            name="cancel"
            size={46}
            color={Colors.error}
            iconFamily="MaterialIcons"
          />
        ),
        header: 'Order cancelled',
        subheader: 'We are sorry for the inconvenience caused 🙏',
      };
      break;
    default:
      break;
  }

  return (
    <View style={styles.container}>
      {statusInfo.icon}
      <Text style={styles.header}>{statusInfo.header}</Text>
      <Text style={styles.subheader}>{statusInfo.subheader}</Text>

      {source === 'Cart' && (
        <View style={styles.buttons}>
          <TouchableOpacity onPress={resetToHome} style={styles.shopping}>
            <Text style={styles.shoppingTitle}>Continue Shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetToOrders} style={styles.order}>
            <Text style={styles.orderTitle}>View all orders</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default OrderStatusInfo;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    ...shadow[2],
  },
  header: {
    fontFamily: FONTS.heading,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 10,
  },
  subheader: {
    fontFamily: FONTS.heading,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 20,
    marginTop: 20,
  },
  shopping: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.lightYellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  shoppingTitle: {
    fontFamily: FONTS.heading,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  order: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: Colors.lightYellow,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  orderTitle: {
    fontFamily: FONTS.heading,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});
