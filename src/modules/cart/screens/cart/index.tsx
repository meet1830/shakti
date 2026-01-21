import {Colors, FONTS} from '@utils/Constants';
import React, {FC, Fragment} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import BackButton from '@modules/components/backButton';
import CartBottomButton from '@modules/cart/components/cartBottomButton';
import CartItemList from '@modules/cart/components/cartItemList';
import {CartNavigationParams} from '@modules/cart/types';
import DeliveryAddress from '@modules/cart/components/deliveryAddress';
import Empty from '@modules/components/empty';
import IfElse from '@modules/components/ifElse';
import PaymentOptions from '@modules/cart/components/paymentOptions';
import PaymentSummary from '@modules/cart/components/paymentSummary';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '@navigation/NavigationUtil';
import {useGetCart} from '@modules/cart/utils';
import {useRoute} from '@react-navigation/native';

const Cart: FC = () => {
  const params: CartNavigationParams = useRoute()?.params;
  const isFromItemDetail = params?.source;
  const cartItems = Object.values(useGetCart());

  const navigateToShop = () => {
    navigate('MainNavigator', {
      screen: 'Shop',
    });
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={isFromItemDetail ? undefined : ['top']}>
      <View style={styles.content}>
        {isFromItemDetail && <BackButton style={styles.back} />}
        <Text
          style={[
            styles.header,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              marginLeft: isFromItemDetail ? -60 : 0,
            },
          ]}>
          Your Cart
        </Text>
      </View>
      <IfElse
        condition={cartItems.length}
        ifComp={
          <Fragment>
            <ScrollView
              style={styles.scrollView}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={true}
              persistentScrollbar>
              <CartItemList cartItems={cartItems} />
              <DeliveryAddress />
              <PaymentOptions />
              <PaymentSummary cartItems={cartItems} />
            </ScrollView>
            <CartBottomButton />
          </Fragment>
        }
        elseComp={
          <Empty
            text="Add some items to Cart"
            buttonText="Browse Items"
            onPress={navigateToShop}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  content: {flexDirection: 'row', marginTop: 10, alignItems: 'center'},
  back: {
    paddingLeft: 15,
    marginTop: -10,
  },
  header: {
    textAlign: 'center',
    fontFamily: FONTS.heading,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
    paddingBottom: 10,
  },
  scrollView: {flex: 1, paddingHorizontal: 15, paddingVertical: 10},
});

export default Cart;
