import {CartItem} from '../types';
import {Order} from '@modules/order/types';
import {OrderDetailParams} from '@modules/order/types/orderDetail';
import apiService from '@modules/config/api/service';
import {cartActions} from '../store';
import {navigate} from '@navigation/NavigationUtil';
import {orderActions} from '@modules/order/store';
import {store} from '@store/store';
import {useAppSelector} from '@store/hooks';
import {useState} from 'react';

export function useCreateOrder() {
  const [createOrderLoading, setCreateOrderLoading] = useState(false);
  const [createOrderError, setCreateOrderError] = useState('');
  const userId = useAppSelector(gState => gState.auth.user?._id) || '';

  async function createOrder(cartItems: CartItem[]) {
    try {
      if (!userId) {
        throw new Error('UserId not found');
      }

      setCreateOrderLoading(true);
      setCreateOrderError('');

      const response = await apiService.request<{
        success: boolean;
        order: Order;
      }>({
        method: 'POST',
        url: '/order/',
        data: {
          cartItems,
        },
      });

      if (response?.success) {
        store.dispatch(
          orderActions.createOrder({userId, order: response?.order}),
        );
        store.dispatch(cartActions.clearCart(userId));
        navigate('OrderDetail', {
          orderId: response?.order?._id,
          source: 'Cart',
        } as OrderDetailParams);
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error: any) {
      setCreateOrderError(error?.message);
    } finally {
      setCreateOrderLoading(false);
    }
  }

  return {createOrder, createOrderLoading, createOrderError};
}
