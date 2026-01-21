import {CartIcon, HomeIcon, OrdersIcon} from './TabIcons';
import {Platform, StyleSheet} from 'react-native';
import React, {FC} from 'react';

import Cart from '@modules/cart/screens/cart';
import {Colors} from '@utils/Constants';
import Home from '@modules/home/screens/home';
import Order from '@modules/order/screens/order';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useGetCart} from '@modules/cart/utils';

const Tab = createBottomTabNavigator();

const MainNavigator: FC = () => {
  const cartItems = Object.keys(useGetCart()).length;
  const cartItemsCount = cartItems
    ? String(cartItems).padStart(2, '0')
    : undefined;

  return (
    <Tab.Navigator
      screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.inactive,
          lazy: true,
          tabBarStyle: styles.tabBarStyle,
        }}>
      <Tab.Screen
        name="Shop"
        component={Home}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: CartIcon,
          tabBarBadge: cartItemsCount,
          tabBarBadgeStyle: [styles.cartBadge],
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Order}
        options={{
          tabBarIcon: OrdersIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    padding: Platform.OS === 'android' ? 0 : 10,
  },
  cartBadge: {
    minHeight: 16,
    minWidth: 16,
    maxHeight: 30,
    maxWidth: 30,
    fontSize: 12,
    alignSelf: 'center',
    color: Colors.inactive,
    backgroundColor: Colors.primary,
    fontWeight: '600',
  },
});
