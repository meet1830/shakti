import {Colors, FONTS, shadow} from '@utils/Constants';
import React, {FC, Fragment, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import AddressSheet from '@modules/components/addressSheet';
import Divider from '@modules/components/divider';
import {useAppSelector} from '@store/hooks';
import {useIsUserFieldsMissing} from '@modules/cart/utils';

const DeliveryAddress: FC = () => {
  const userAddress = useAppSelector(gState => gState.auth.user?.address?.[0]);
  const userFieldsMissing = useIsUserFieldsMissing();
  const [addressSheet, setAddressSheet] = useState(false);

  const toggleAddressSheet = () => {
    setAddressSheet(prev => !prev);
  };

  const estimatedDeliveryBy = (
    <Text style={styles.estimated}>Estimated delivery by: Tomorrow⚡️</Text>
  );

  const deliveryLocationNote = (
    <Text style={styles.note}>
      Note: We currently process orders only from and around{' '}
      <Text style={styles.area}>Vasna, Bhayli and Atladara</Text>.
    </Text>
  );

  return (
    <Fragment>
      <Fragment>
        <View style={styles.container}>
          <Text style={styles.header}>2. Verify Delivery details</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.content}>
          {userFieldsMissing ? (
            <View>
              <View style={styles.missing}>
                <View style={styles.missingTitle}>
                  {estimatedDeliveryBy}
                  <Text style={styles.missingTitleText}>
                    Kindly give us your details to place order
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={toggleAddressSheet}
                  style={styles.addDetails}>
                  <Text style={styles.addDetailsText}>Add Details</Text>
                </TouchableOpacity>
              </View>
              {deliveryLocationNote}
            </View>
          ) : (
            <View>
              {estimatedDeliveryBy}
              {deliveryLocationNote}
              <TouchableOpacity
                onPress={toggleAddressSheet}
                style={styles.address}>
                <Text style={styles.addressText}>
                  {userAddress?.street}, {userAddress?.landmark},{' '}
                  {userAddress?.area}, {userAddress?.city} -{' '}
                  {userAddress?.zipCode}
                </Text>
                <View style={styles.edit}>
                  <Text style={styles.editText}>edit</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Fragment>
      {addressSheet && (
        <AddressSheet open={addressSheet} onClose={toggleAddressSheet} />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  estimated: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 16,
  },
  note: {
    fontFamily: FONTS.heading,
    fontWeight: '500',
    color: Colors.text,
    fontSize: 14,
    marginTop: 10,
    lineHeight: 22,
  },
  area: {fontWeight: '900'},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
  },
  header: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.inactive,
    fontSize: 16,
  },
  divider: {flex: 1, marginVertical: 0},
  content: {
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    ...shadow[2],
  },
  missing: {flexDirection: 'row', gap: 10},
  missingTitle: {flex: 1},
  missingTitleText: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.text,
    fontSize: 12,
    marginTop: 10,
  },
  addDetails: {
    width: 120,
    maxHeight: 50,
    backgroundColor: Colors.lightYellow,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  addDetailsText: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  address: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addressText: {
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    flex: 1,
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.text,
    fontSize: 14,
  },
  edit: {
    backgroundColor: Colors.lightYellow,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 8,
  },
  editText: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 14,
  },
});

export default DeliveryAddress;
