import {Colors, FONTS} from '@utils/Constants';
import React, {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {goBack, resetAndNavigate} from '@navigation/NavigationUtil';

import BackButton from '@modules/components/backButton';
import {OrderDetailParams} from '@modules/order/types/orderDetail';
import OrderInfo from '@modules/order/components/orderDetail/orderInfo';
import OrderItemsList from '@modules/order/components/orderDetail/orderItemsList';
import OrderStatusInfo from '@modules/order/components/orderDetail/orderStatusInfo';
import PaymentSummary from '@modules/order/components/orderDetail/paymentSummary';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector} from '@store/hooks';
import {useRoute} from '@react-navigation/native';

const OrderDetail: FC = () => {
  const params: OrderDetailParams = useRoute()?.params;
  const userId = useAppSelector(gState => gState.auth.user?._id) || '';
  const order = useAppSelector(gState =>
    gState.order.orders?.[userId]?.find?.(
      item => item?._id === (params?.orderId || ''),
    ),
  );

  const handleGoBack = () => {
    if (params?.source === 'Cart') {
      resetAndNavigate('MainNavigator', {
        screen: 'Shop',
      });
    } else {
      goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleGoBack} style={styles.back} />
        <Text style={styles.headerTitle}>Order Summary</Text>
      </View>
      {!order ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Order not found</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <OrderStatusInfo order={order} source={params?.source} />
          <OrderInfo order={order} />
          <OrderItemsList orderItems={order?.orderItems || []} />
          <PaymentSummary orderItems={order?.orderItems || []} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  header: {flexDirection: 'row', alignItems: 'center'},
  back: {
    paddingLeft: 15,
    paddingBottom: 5,
  },
  headerTitle: {
    textAlign: 'center',
    fontFamily: FONTS.heading,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
    marginLeft: -60,
  },
  empty: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyTitle: {
    textAlign: 'center',
    fontFamily: FONTS.heading,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.inactive,
  },
  scrollView: {padding: 15},
});
