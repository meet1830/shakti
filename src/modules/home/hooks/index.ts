import {AllProducts, Product} from '../types';
import {useAppDispatch, useAppSelector} from '@store/hooks';

import {CACHE_TIME} from '@utils/Constants';
import apiService from '@modules/config/api/service';
import {cacheTimeLimitNotExceeded} from '@utils/index';
import {cartActions} from '@modules/cart/store';
import {homeActions} from '../store';
import {useGetCart} from '@modules/cart/utils';
import {useState} from 'react';

export function useGetAllProducts() {
  const appDispatch = useAppDispatch();
  const globalProductsState = useAppSelector(gState => gState.home.allProducts);
  const cacheTime = useAppSelector(gState => gState.auth.constants?.CACHE_TIME);
  const userId = useAppSelector(gState => gState.auth.user?._id);
  const cart = useGetCart();

  const items = globalProductsState?.products || [];

  const [productsState, setProductsState] = useState<{
    allProducts: Product[];
    filteredProducts: Product[];
    loading: boolean;
    error: string | undefined;
  }>({
    allProducts: items,
    filteredProducts: items,
    loading: items ? false : true,
    error: undefined,
  });

  async function getAllProducts(clearSearch: () => void) {
    try {
      clearSearch?.();

      if (productsState.allProducts?.length) {
        return;
      }

      if (
        globalProductsState &&
        items?.length &&
        cacheTimeLimitNotExceeded(
          globalProductsState.updatedAt,
          Number(cacheTime) || CACHE_TIME,
        )
      ) {
        setProductsState({
          allProducts: items,
          filteredProducts: items,
          loading: false,
          error: undefined,
        });
        return;
      }

      const productsRes = await apiService.request<{
        success: boolean;
        products: Product[];
      }>({
        method: 'GET',
        url: '/product',
      });

      const allProducts: AllProducts = {
        updatedAt: new Date().toString(),
        products: productsRes?.products,
      };
      setProductsState({
        allProducts: allProducts?.products,
        filteredProducts: allProducts?.products,
        loading: false,
        error: undefined,
      });
      appDispatch(homeActions.setAllProducts(allProducts));

      // sync cart
      if (Object.keys(cart).length) {
        const productItemIdsSet = new Set(
          allProducts.products.map(product => product._id),
        );

        const outOfSyncItemIds: string[] = [];
        Object.keys(cart).forEach(cartItemId => {
          if (!productItemIdsSet.has(cartItemId)) {
            outOfSyncItemIds.push(cartItemId);
          }
        });

        if (outOfSyncItemIds?.length) {
          const updatedCart = {...cart};

          outOfSyncItemIds.forEach(itemId => {
            delete updatedCart[itemId];
          });

          if (userId) {
            appDispatch(cartActions.setCart({userId, userCart: updatedCart}));
          }
        }
      }
    } catch (err: any) {
      setProductsState({
        allProducts: [],
        filteredProducts: [],
        loading: false,
        error: err.message,
      });
    }
  }

  function filterProducts(query: string) {
    setProductsState(prev => ({
      ...prev,
      filteredProducts: query?.length
        ? prev.allProducts?.filter(item => {
            return item?.name?.toLowerCase()?.includes?.(query?.toLowerCase());
          })
        : prev.allProducts,
    }));
  }

  return {getAllProducts, productsState, filterProducts};
}
