import {
  DEFAULT_DELIVERY_FEE,
  FREE_DELIVERY_ORDER_VALUE,
  MIN_ORDER_VALUE,
} from '@utils/Constants';

import {CartItem} from '../types';
import {Product} from '@modules/home/types';
import {cartActions} from '../store';
import {formatCurrency} from '@utils/index';
import {store} from '@store/store';
import {useAppSelector} from '@store/hooks';

export function useGetCart() {
  const userId = useAppSelector(gState => gState.auth.user?._id);
  const cart = useAppSelector(gState => gState.cart);
  return userId ? cart.cart?.[userId] || {} : {};
}

export function useUpdateCartItem() {
  const userId = useAppSelector(gState => gState.auth.user?._id);

  function updateCartItem(
    item: Product | CartItem | undefined,
    quantity: number,
  ) {
    if (userId && item && quantity !== undefined) {
      store.dispatch(cartActions.updateCart({userId, item, quantity}));
    }
  }

  return updateCartItem;
}

export function useIsUserFieldsMissing(): boolean {
  const user = useAppSelector(gState => gState.auth.user);
  return (
    !user?.phone ||
    Boolean(Object.values(user?.address?.[0] || {}).find(value => !value))
  );
}

export function useCalculatePaymentBreakdown() {
  const constants = useAppSelector(gState => gState.auth.constants);
  const minimumOrderValue =
    Number(constants?.MIN_ORDER_VALUE) || MIN_ORDER_VALUE;
  const defaultDeliveryFee =
    Number(constants?.DEFAULT_DELIVERY_FEE) || DEFAULT_DELIVERY_FEE;
  const freeDeliveryOrderValue =
    Number(constants?.FREE_DELIVERY_ORDER_VALUE) || FREE_DELIVERY_ORDER_VALUE;

  function calculatePaymentBreakdown(cartItems: CartItem[]) {
    let mrp = 0,
      discount = 0,
      totalPrice = 0;

    cartItems?.forEach?.(item => {
      if (item.original_price) {
        mrp += item.original_price * item.quantity;
      } else if (item.price) {
        mrp += item.price * item.quantity;
      }

      totalPrice += (item.price || item.original_price || 0) * item.quantity;

      if (item.original_price && item.price) {
        discount += (item.original_price - item.price) * item.quantity;
      }
    });

    let total = mrp - discount;

    let deliveryFee = defaultDeliveryFee;
    if (totalPrice >= freeDeliveryOrderValue) {
      deliveryFee = 0;
    }

    total += deliveryFee;

    const minOrderValueDiff = minimumOrderValue - totalPrice;

    const paymentBreakDownArray = [
      {
        key: 'mrp',
        header: 'MRP Total',
        value: totalPrice,
        formatted: formatCurrency(totalPrice),
      },
      {
        key: 'discount',
        header: 'Product discount',
        value: discount,
        formatted: `- ${formatCurrency(discount)}`,
      },
      {
        key: 'deliveryFee',
        header: 'Delivery Fee',
        value: deliveryFee,
        formatted: deliveryFee === 0 ? '🎉  FREE' : formatCurrency(deliveryFee),
      },
      {
        key: 'total',
        header: 'Total',
        value: total,
        formatted: formatCurrency(total),
      },
    ];

    return {
      mrp,
      discount,
      total,
      deliveryFee,
      totalPrice,
      minOrderValueDiff,
      paymentBreakDownArray,
    };
  }

  return calculatePaymentBreakdown;
}
