import {Colors, FONTS, shadow} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Divider from '@modules/components/divider';
import {Order} from '@modules/order/types';
import {formatDate} from '@utils/index';

interface Props {
  order: Order;
}

interface OrderInfoItemProps {
  title: string;
  subtitle: string;
}

const OrderInfoItem: FC<OrderInfoItemProps> = ({title, subtitle}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>{subtitle}</Text>
    </View>
  );
};

const OrderInfo: FC<Props> = ({order}) => {
  const {
    createdAt,
    address: {area, city, landmark, street, zipCode},
  } = order;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Info</Text>
      <Divider style={styles.divider} />
      <OrderInfoItem title="🗓️ Placed on:" subtitle={formatDate(createdAt)} />
      <OrderInfoItem
        title="🏠 Address:"
        subtitle={`${street}, ${landmark}, ${area}, ${city} - ${zipCode}`}
      />
    </View>
  );
};

export default OrderInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginTop: 20,
    borderRadius: 10,
    padding: 15,
    ...shadow[2],
  },
  title: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 16,
  },
  divider: {opacity: 0.2, marginHorizontal: -15, marginBottom: 5},
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 7,
    marginTop: 10,
  },
  itemTitle: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 14,
  },
  itemSubtitle: {
    flex: 1,
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.text,
    fontSize: 14,
  },
});
