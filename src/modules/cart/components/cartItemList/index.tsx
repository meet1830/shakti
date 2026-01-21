import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Colors, FONTS, shadow} from '@utils/Constants';
import React, {FC, Fragment, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {CartItem} from '@modules/cart/types';
import CartItemComp from '../cartItemComp';
import Divider from '@modules/components/divider';
import RemoveItemModal from '../removeItemModal';
import {useUpdateCartItem} from '@modules/cart/utils';

interface Props {
  cartItems: CartItem[];
}

const CartItemList: FC<Props> = ({cartItems}) => {
  const [deleteModal, setDeleteModal] = useState<CartItem | undefined>();
  const [expand, setExpand] = useState(cartItems?.length === 1 ? true : false);
  const maxHeight = useSharedValue(cartItems?.length === 1 ? 1000 : 0);
  const updateCartItem = useUpdateCartItem();

  const openDeleteModal = (value: CartItem) => {
    setDeleteModal(value);
  };

  const closeDeleteModal = () => {
    setDeleteModal(undefined);
  };

  const handleDelete = () => {
    updateCartItem(deleteModal, 0);
    setDeleteModal(undefined);
  };

  const toggleExpand = () => {
    setExpand(prev => {
      maxHeight.set(withTiming(prev === false ? 1000 : 0, {duration: 750}));
      return !prev;
    });
  };

  const animatedHeightStyle = useAnimatedStyle(() => {
    return {
      maxHeight: maxHeight.value,
    };
  });

  return (
    <Fragment>
      <View style={styles.header}>
        <Text style={styles.headerText}>1. Verify your Items</Text>
        <Divider style={styles.divider} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity onPress={toggleExpand} style={styles.title}>
          <Text style={styles.titleText}>Your Items</Text>
          <View>
            <Text style={styles.expand}>{expand ? 'Hide' : 'Show'}</Text>
          </View>
        </TouchableOpacity>
        <Animated.View style={[animatedHeightStyle, styles.list]}>
          <Divider style={styles.listDivider} />
          {cartItems.map((cartItem, index, cartItemsArray) => {
            return (
              <CartItemComp
                key={index}
                index={index}
                items={cartItemsArray}
                item={cartItem}
                setDeleteModal={openDeleteModal}
                mode="Cart"
              />
            );
          })}
        </Animated.View>
      </View>

      {deleteModal && (
        <RemoveItemModal
          open={deleteModal}
          onClose={closeDeleteModal}
          onSubmit={handleDelete}
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  headerText: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.inactive,
    fontSize: 16,
  },
  divider: {flex: 1, marginVertical: 0},
  content: {
    backgroundColor: Colors.white,
    marginVertical: 10,
    borderRadius: 10,
    ...shadow[2],
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  titleText: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 16,
  },
  expand: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 14,
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  list: {overflow: 'hidden'},
  listDivider: {marginVertical: 0, opacity: 0.2},
});

export default CartItemList;
