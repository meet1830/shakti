import {Colors, FONTS, shadow} from '@utils/Constants';
import {
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Carousel} from '@modules/components/carousel';
import FastImage from '@d11/react-native-fast-image';
import {Product} from '@modules/home/types';
import QuantitySelector from '@modules/components/quantitySelector';
import React from 'react';
import {formatCurrency} from '@utils/index';
import {navigate} from '@navigation/NavigationUtil';

const CatalogItem: ListRenderItem<Product> = props => {
  const {item} = props;
  const {image_uris, name, price, original_price, weight} = item;

  const navigateToItemDetail = () => {
    navigate('ItemDetail', {
      itemId: item?._id,
    });
  };

  return (
    <View style={styles.container}>
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
        enableAutoscroll
      />
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.name}>
          {name}
        </Text>
        <View style={styles.detailsRight}>
          <View style={styles.weightPrice}>
            <Text style={styles.weight}>{weight}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatCurrency(price)}</Text>
              <Text style={styles.original}>
                {formatCurrency(original_price)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={navigateToItemDetail} style={styles.view}>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>
        <QuantitySelector catalogItem={item} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 20,
    ...shadow[2],
  },
  image: {
    // height: 120,
    width: 120,
    borderRadius: 10,
    marginHorizontal: 10,
    aspectRatio: 1,
    backgroundColor: Colors.background,
  },
  details: {flex: 1, justifyContent: 'space-between'},
  name: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    marginBottom: 3,
    color: Colors.text,
    fontSize: 18,
  },
  weightPrice: {gap: 5},
  detailsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weight: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    // color: Colors.inactive,
    fontSize: 14,
    // backgroundColor: Colors.lightYellow,
    // borderRadius: 5,
    paddingVertical: 4,
    paddingRight: 7,
    // borderColor: Colors.primary,
    // borderWidth: 1,
    color: Colors.text,
    alignSelf: 'flex-start',
    // opacity: 0.7,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  price: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 18,
  },
  original: {
    fontFamily: FONTS.heading2,
    fontWeight: '400',
    color: Colors.text,
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  view: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: Colors.inactive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewText: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.inactive,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CatalogItem;
