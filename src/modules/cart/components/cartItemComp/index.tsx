import {Colors, FONTS} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Carousel} from '@modules/components/carousel';
import {CartItem} from '@modules/cart/types';
import Divider from '@modules/components/divider';
import FastImage from '@d11/react-native-fast-image';
import Icon from '@modules/components/icon';
import QuantitySelector from '@modules/components/quantitySelector';
import {formatCurrency} from '@utils/index';

interface Props {
  item: CartItem;
  setDeleteModal?: (item: CartItem) => void;
  index: number;
  items: CartItem[];
  mode: 'Cart' | 'Order';
}

const CartItemComp: FC<Props> = ({
  item,
  setDeleteModal,
  index,
  items,
  mode,
}) => {
  const {name, image_uris, quantity, original_price, price, weight} = item;

  const isLastItem = index + 1 === items?.length;

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.left}>
          <Text numberOfLines={2} style={styles.name}>
            {name}
          </Text>
          <View>
            <View style={styles.price}>
              <Text style={styles.priceText}>
                {formatCurrency(quantity * price)}
              </Text>
              {original_price && original_price > price && (
                <Text style={styles.original}>
                  {formatCurrency(original_price * quantity)}
                </Text>
              )}
            </View>
            <Text style={styles.each}>
              {quantity} X {weight} | {formatCurrency(price)} each
            </Text>
          </View>
          {mode === 'Cart' && (
            <View style={styles.cart}>
              <TouchableOpacity onPress={() => setDeleteModal?.(item)}>
                <Icon
                  name="trash-outline"
                  size={20}
                  color={Colors.inactive}
                  iconFamily="Ionicons"
                />
              </TouchableOpacity>
              <View style={styles.selector}>
                <QuantitySelector
                  cartItem={item}
                  handleRemove={() => setDeleteModal?.(item)}
                />
              </View>
            </View>
          )}
          {mode === 'Order' && (
            <View style={styles.order}>
              <Text style={styles.quantity}>Quantity: {quantity}</Text>
              <Text style={styles.weight}>{weight}</Text>
            </View>
          )}
        </View>
        <Carousel<string>
          data={image_uris}
          renderItem={({item: image}) => (
            <FastImage
              source={{uri: image}}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          keyExtractor={(_, imageIdx) => String(imageIdx)}
          itemWidth={140}
        />
      </View>
      <View style={styles.footer}>
        {!isLastItem && <Divider style={styles.divider} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  name: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    marginBottom: 3,
    color: Colors.text,
    fontSize: 18,
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 3,
    gap: 5,
  },
  priceText: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 16,
  },
  original: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  each: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    marginBottom: 3,
    color: Colors.text,
    fontSize: 10,
  },
  cart: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selector: {minWidth: 125, maxWidth: '100%'},
  order: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  quantity: {
    backgroundColor: Colors.lightYellow,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 12,
  },
  weight: {
    backgroundColor: Colors.lightYellow,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 12,
  },
  image: {
    height: 100,
    // width: 100,
    borderRadius: 10,
    marginHorizontal: 20,
    aspectRatio: 1,
    backgroundColor: Colors.background,
  },
  footer: {marginTop: 20},
  divider: {marginVertical: 0, marginRight: 15, opacity: 0.2},
});

export default CartItemComp;
