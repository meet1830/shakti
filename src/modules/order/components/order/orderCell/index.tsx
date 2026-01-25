import {Colors, FONTS, shadow} from '@utils/Constants';
import {
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Divider from '@modules/components/divider';
import FastImage from '@d11/react-native-fast-image';
import {Order} from '@modules/order/types';
import {OrderDetailParams} from '@modules/order/types/orderDetail';
import React from 'react';
import {formatDate} from '@utils/index';
import {navigate} from '@navigation/NavigationUtil';

const OrderCell: ListRenderItem<Order> = ({item: order}) => {
  const {createdAt, orderItems, status} = order;

  const orderItemImages: string[] = [];
  for (let i = 0; i < orderItems?.length && i < 3; i++) {
    if (orderItems[i].image_uris?.length) {
      orderItemImages.push(orderItems[i].image_uris[0]);
    }
  }

  const onOrderPress = () => {
    navigate('OrderDetail', {
      orderId: order?._id,
      source: 'Order',
    } as OrderDetailParams);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Text style={styles.orderId}>Order #{order?._id?.slice(-10)}</Text>
          <Text style={styles.orderDate}>🗓️ {formatDate(createdAt)}</Text>
        </View>
        <Text style={styles.status}>{status?.toUpperCase()}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.bottom}>
        <View style={styles.images}>
          {orderItemImages?.map((image, index) => {
            return (
              <FastImage
                key={index}
                source={{uri: image}}
                style={styles.image}
              />
            );
          })}
        </View>
        <TouchableOpacity style={styles.view} onPress={onOrderPress}>
          <Text style={styles.viewText}>View Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCell;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    ...shadow[2],
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  topLeft: {flex: 1},
  orderId: {
    fontFamily: FONTS.heading2,
    fontSize: 16,
    color: Colors.text,
    fontWeight: '700',
  },
  orderDate: {
    fontFamily: FONTS.heading2,
    fontSize: 12,
    color: Colors.inactive,
    fontWeight: '600',
    marginTop: 7,
    marginLeft: -1,
  },
  status: {
    fontFamily: FONTS.heading2,
    fontSize: 12,
    color: Colors.inactive,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  divider: {opacity: 0.2, marginVertical: 20},
  bottom: {flexDirection: 'row', gap: 10},
  images: {flexDirection: 'row', gap: 10, flex: 1},
  image: {height: 45, width: 45, borderRadius: 10},
  view: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  viewText: {
    fontFamily: FONTS.heading2,
    fontSize: 14,
    color: Colors.text,
    fontWeight: '700',
  },
});
