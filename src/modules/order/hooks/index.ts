import {useAppDispatch, useAppSelector} from '@store/hooks';

import {CACHE_TIME} from '@utils/Constants';
import {Order} from '../types';
import apiService from '@modules/config/api/service';
import {cacheTimeLimitNotExceeded} from '@utils/index';
import {orderActions} from '../store';
import {useState} from 'react';

export function useGetOrders() {
  const appDispatch = useAppDispatch();
  const userId = useAppSelector(gState => gState.auth.user?._id) || '';
  const orders = useAppSelector(gState => gState.order.orders?.[userId]);
  const lastUpdatedAt = useAppSelector(gState => gState.order.lastUpdatedAt);
  const cacheTime = useAppSelector(gState => gState.auth.constants?.CACHE_TIME);

  const [ordersState, setOrdersState] = useState<{
    loading: boolean;
    error: string;
  }>({
    loading: orders?.length ? false : true,
    error: '',
  });

  async function getOrders() {
    try {
      if (
        orders?.length &&
        lastUpdatedAt &&
        cacheTimeLimitNotExceeded(
          lastUpdatedAt,
          Number(cacheTime) || CACHE_TIME,
        )
      ) {
        if (ordersState.loading) {
          setOrdersState({loading: false, error: ''});
        }
        return;
      }

      setOrdersState({loading: true, error: ''});

      const response = await apiService.request<{
        success: boolean;
        orders: Order[];
      }>({
        method: 'GET',
        url: '/order',
      });

      if (response?.success) {
        appDispatch(orderActions.setOrders({userId, orders: response.orders}));
      } else {
        throw new Error('Something went wrong');
      }

      setOrdersState({loading: false, error: ''});
    } catch (error: any) {
      setOrdersState({
        loading: false,
        error: error?.status !== 404 ? error?.message : '',
      });
    }
  }

  return {getOrders, ordersState};
}
