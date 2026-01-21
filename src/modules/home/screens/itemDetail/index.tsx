import {Colors, FONTS, screenWidth, shadow} from '@utils/Constants';
import {ItemDetailParams, Product} from '@modules/home/types';
import React, {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import BackButton from '@modules/components/backButton';
import {Carousel} from '@modules/components/carousel';
import CartButton from '@modules/home/components/cartButton';
import FastImage from '@d11/react-native-fast-image';
import QuantitySelector from '@modules/components/quantitySelector';
import {SafeAreaView} from 'react-native-safe-area-context';
import {formatCurrency} from '@utils/index';
import {useAppSelector} from '@store/hooks';
import {useRoute} from '@react-navigation/native';

const ItemDetail: FC = () => {
  const params: ItemDetailParams = useRoute().params;
  const itemId = params?.itemId || '';

  const item = useAppSelector(gState =>
    gState.home.allProducts?.products?.find(product => product?._id === itemId),
  ) as Product;
  const {
    image_uris = [],
    name,
    price,
    original_price,
    weight,
    description,
  } = item;

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView style={styles.scrollView}>
        <View style={styles.carousel}>
          <Carousel<string>
            data={image_uris}
            renderItem={({item: image}) => {
              return (
                <FastImage
                  source={{uri: image}}
                  style={styles.image}
                  resizeMode="contain"
                />
              );
            }}
            keyExtractor={(_, itemIdx) => String(itemIdx)}
            itemWidth={screenWidth - 40}
          />
        </View>
        <View style={styles.details}>
          <View style={styles.nameWeight}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.weight}>{weight}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
      <CartButton source="ItemDetail" style={styles.cart} />
      <View style={styles.bottomButton}>
        <View>
          <View style={styles.left}>
            <Text style={styles.price}>{formatCurrency(price)}</Text>
            <Text style={styles.original}>
              {formatCurrency(original_price)}
            </Text>
          </View>
          <Text style={styles.addItem}>Add item to cart</Text>
        </View>
        <View style={styles.selector}>
          <QuantitySelector catalogItem={item} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.background, height: '100%'},
  scrollView: {height: '100%', padding: 20},
  carousel: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    paddingBottom: 10,
    borderRadius: 10,
    ...shadow[2],
  },
  image: {
    width: screenWidth - 80,
    // height: screenWidth - 80,
    marginHorizontal: 20,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: Colors.background,
  },
  details: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    ...shadow[2],
  },
  nameWeight: {flexDirection: 'row', gap: 10, alignItems: 'flex-start'},
  name: {
    fontFamily: FONTS.heading2,
    fontSize: 20,
    color: Colors.text,
    fontWeight: '700',
    flex: 1,
  },
  weight: {
    fontFamily: FONTS.heading2,
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: Colors.lightYellow,
    alignSelf: 'flex-start',
    opacity: 0.8,
  },
  description: {
    fontFamily: FONTS.heading2,
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
    marginTop: 20,
  },
  cart: {position: 'absolute', bottom: 130, right: 10},
  bottomButton: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  price: {
    fontFamily: FONTS.heading2,
    fontSize: 18,
    color: Colors.text,
    fontWeight: '700',
  },
  original: {
    fontFamily: FONTS.heading2,
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },
  addItem: {
    fontFamily: FONTS.heading2,
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
    marginTop: 2,
  },
  selector: {minWidth: 125},
});

export default ItemDetail;
