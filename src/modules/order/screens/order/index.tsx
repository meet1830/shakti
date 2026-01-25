import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, FONTS, screenHeight} from '@utils/Constants';
import React, {FC, useEffect} from 'react';

import Divider from '@modules/components/divider';
import Empty from '@modules/components/empty';
import IfElse from '@modules/components/ifElse';
import OrderCell from '@modules/order/components/order/orderCell';
import OrderHeader from '@modules/order/components/order/orderHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '@navigation/NavigationUtil';
import {useAppSelector} from '@store/hooks';
import {useGetOrders} from '@modules/order/hooks';
import {useIsFocused} from '@react-navigation/native';

const OrderListSeparator: FC = () => <View style={styles.separator} />;

const OrderListFooter: FC = () => <View style={styles.footer} />;

const Order: FC = () => {
  const isFocused = useIsFocused();
  const userId = useAppSelector(gState => gState.auth.user?._id) || '';
  const orders = useAppSelector(gState => gState.order.orders?.[userId]);
  const {
    getOrders,
    ordersState: {loading, error},
  } = useGetOrders();

  const navigateToShop = () => {
    navigate('MainNavigator', {
      screen: 'Shop',
    });
  };

  useEffect(() => {
    if (isFocused) {
      getOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FlatList
        data={orders}
        ListFooterComponent={OrderListFooter}
        ItemSeparatorComponent={OrderListSeparator}
        renderItem={OrderCell}
        ListEmptyComponent={
          <IfElse
            condition={!loading}
            ifComp={
              <Empty
                text="No Orders yet!"
                buttonText="Browse Items"
                onPress={navigateToShop}
                style={{height: screenHeight * 0.6}}
              />
            }
            elseComp={
              <IfElse
                condition={error}
                ifComp={<Text style={styles.error}>{error}</Text>}
                elseComp={<ActivityIndicator size="large" />}
              />
            }
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <OrderHeader />

            <Divider style={styles.divider} />

            <Text style={styles.title}>Your Orders</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  separator: {marginVertical: 12},
  footer: {height: 50},
  container: {flex: 1, backgroundColor: Colors.background},
  error: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.error,
    fontSize: 16,
    marginHorizontal: 25,
    textAlign: 'center',
  },
  header: {paddingHorizontal: 15, paddingVertical: 20},
  divider: {marginVertical: 20},
  title: {
    fontFamily: FONTS.heading,
    fontSize: 20,
    color: Colors.text,
    fontWeight: '700',
  },
});
