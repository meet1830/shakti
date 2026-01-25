import {useEffect, useState} from 'react';

import Cart from '@modules/cart/screens/cart';
import {Colors} from '@utils/Constants';
import IfElse from '@modules/components/ifElse';
import ItemDetail from '@modules/home/screens/itemDetail';
import Login from '@modules/onboard/screens/login';
import MainNavigator from './MainNavigator';
import {NavigationContainer} from '@react-navigation/native';
import OrderDetail from '@modules/order/screens/orderDetail';
import Splash from '@modules/onboard/screens/splash';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './NavigationUtil';
import {useAppSelector} from '@store/hooks';

const Stack = createNativeStackNavigator();

const MainStack = ({isSplashShown}: {isSplashShown: boolean}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isSplashShown && <Stack.Screen name="Splash" component={Splash} />}
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
};

const AuthStack = ({isSplashShown}: {isSplashShown: boolean}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isSplashShown && <Stack.Screen name="Splash" component={Splash} />}
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const user = useAppSelector(gState => gState.auth.user);
  const [isSplashShown, setIsSplashShown] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSplashShown(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle={'dark-content'}
        translucent
      />
      <IfElse
        condition={user}
        ifComp={<MainStack isSplashShown={isSplashShown} />}
        elseComp={<AuthStack isSplashShown={isSplashShown} />}
      />
    </NavigationContainer>
  );
};

export default Navigation;
