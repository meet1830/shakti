import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, FONTS} from '@utils/Constants';
import React, {FC, useCallback, useEffect, useRef} from 'react';

import CartButton from '@modules/home/components/cartButton';
import CatalogItem from '@modules/home/components/catalogItem';
import Empty from '@modules/components/empty';
import HomeHeader from '@modules/home/components/homeHeader';
import {HomeHeaderImperativeRef} from '@modules/home/types';
import KeyboardAvoidLayout from '@modules/components/keyboardAvoidLayout';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetAllProducts} from '@modules/home/hooks';
import {useIsFocused} from '@react-navigation/native';

const separator = () => <View style={styles.separator} />;

const Home: FC = () => {
  const isFocused = useIsFocused();
  const {
    getAllProducts,
    productsState: {allProducts, filteredProducts, loading, error},
    filterProducts,
  } = useGetAllProducts();
  const headerImperativeRef = useRef<HomeHeaderImperativeRef>(null);

  const clearSearch = useCallback(() => {
    Keyboard.dismiss();
    headerImperativeRef.current?.handleSearchTextChange('');
  }, []);

  useEffect(() => {
    if (isFocused) {
      getAllProducts(clearSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader
        handleSearch={filterProducts}
        headerImperativeRef={headerImperativeRef}
      />
      <KeyboardAvoidLayout>
        <View style={styles.content}>
          {filteredProducts?.length && !loading && !error ? (
            <FlatList
              data={filteredProducts}
              style={styles.list}
              contentContainerStyle={styles.listContentContainer}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              keyExtractor={item => item?._id}
              ListHeaderComponent={
                <Text style={styles.header}>
                  {allProducts?.length === filteredProducts?.length
                    ? 'Explore all namkeen'
                    : 'Search Results'}
                </Text>
              }
              ItemSeparatorComponent={separator}
              ListFooterComponent={<View style={styles.footer} />}
              renderItem={CatalogItem}
            />
          ) : loading ? (
            <ActivityIndicator size="large" />
          ) : allProducts?.length ? (
            <Empty
              text="No Items found!"
              buttonText="Browse all items"
              onPress={clearSearch}
            />
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>No Items found!</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidLayout>
      <CartButton hideButton style={styles.cart} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {marginVertical: 7},
  container: {flex: 1, backgroundColor: Colors.primary},
  content: {
    height: '100%',
    backgroundColor: Colors.background,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  list: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  listContentContainer: Platform.OS === 'android' ? {paddingBottom: 150} : {},
  header: {
    fontFamily: FONTS.heading,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 18,
    marginBottom: 15,
  },
  footer: {height: 250},
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 18,
  },
  cart: {position: 'absolute', bottom: 40, right: 10},
});

export default Home;
