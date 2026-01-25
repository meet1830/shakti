import {Colors, FONTS, shadow} from '@utils/Constants';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {
  FC,
  Fragment,
  RefObject,
  useImperativeHandle,
  useState,
} from 'react';

import AddressSheet from '@modules/components/addressSheet';
import {HomeHeaderImperativeRef} from '@modules/home/types';
import Icon from '@modules/components/icon';
import Input from '@modules/components/input';
import {useAppSelector} from '@store/hooks';

interface Props {
  handleSearch: (query: string) => void;
  headerImperativeRef: RefObject<HomeHeaderImperativeRef>;
}

const HomeHeader: FC<Props> = props => {
  const userAddress = useAppSelector(gState => gState.auth.user?.address?.[0]);
  const isAddressMissing =
    !userAddress || Object.values(userAddress || {}).find(value => !value);
  const {handleSearch} = props;
  const [query, setQuery] = useState('');
  const [addressSheet, setAddressSheet] = useState(false);

  const toggleAddressSheet = () => {
    setAddressSheet(prev => !prev);
  };

  const handleChangeText = (changedText: string) => {
    setQuery(changedText);
    handleSearch(changedText?.trim());
  };

  const clearQuery = () => {
    Keyboard.dismiss();
    handleChangeText('');
  };

  useImperativeHandle(
    props?.headerImperativeRef,
    () => {
      return {
        handleSearchTextChange: handleChangeText,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Fragment>
      <View style={styles.container}>
        <Text style={styles.delivering}>Delivering to</Text>
        <TouchableOpacity onPress={toggleAddressSheet}>
          <View style={styles.address}>
            <Text numberOfLines={1} style={styles.addressText}>
              {isAddressMissing
                ? 'Vasna, Bhayli, Atladara'
                : `${userAddress?.street}, ${userAddress?.area}`}
            </Text>
            <Icon
              name="keyboard-arrow-down"
              size={30}
              color={Colors.text}
              iconFamily="MaterialIcons"
            />
          </View>
          <View
            style={[
              styles.noAddress,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                alignItems: !isAddressMissing ? 'center' : 'flex-end',
              },
            ]}>
            <Text
              style={[
                styles.noAddressText,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  textDecorationLine: isAddressMissing ? 'underline' : 'none',
                },
              ]}>
              {isAddressMissing
                ? 'Add your address'
                : `${userAddress?.zipCode} - ${userAddress?.city}`}
            </Text>
            {isAddressMissing && (
              <Icon
                name="edit"
                size={18}
                color={Colors.text}
                iconFamily="MaterialIcons"
              />
            )}
          </View>
        </TouchableOpacity>

        {/* Search */}
        <Input
          containerStyle={styles.search}
          leftComponent={
            <Icon
              name="search"
              size={20}
              color={Colors.inactive}
              iconFamily="Ionicons"
              style={styles.input}
            />
          }
          value={query}
          onChangeText={handleChangeText}
          onClear={clearQuery}
          placeholder="Search for sev, chivda..."
        />
      </View>
      {addressSheet && (
        <AddressSheet open={addressSheet} onClose={toggleAddressSheet} />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {paddingTop: 5, padding: 15},
  delivering: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    marginBottom: 3,
    color: Colors.text,
    fontSize: 12,
  },
  address: {flexDirection: 'row', alignItems: 'center'},
  addressText: {
    fontFamily: FONTS.heading,
    fontWeight: '800',
    fontSize: 24,
    marginRight: 5,
    color: Colors.text,
    maxWidth: '92%',
  },
  noAddress: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    gap: 5,
  },
  noAddressText: {
    fontFamily: FONTS.heading,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 14,
  },
  search: {
    borderRadius: 15,
    marginTop: 15,
    ...shadow[4],
  },
  input: {marginLeft: 10, marginRight: 10},
});

export default HomeHeader;
