import {Colors, FONTS} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {CartItem} from '@modules/cart/types';
import ClearInputButton from '@modules/components/clearInputButton';
import Modal from '@modules/components/modal';

interface Props {
  open: CartItem;
  onClose: () => void;
  onSubmit: () => void;
}

const RemoveItemModal: FC<Props> = ({open, onClose, onSubmit}) => {
  return (
    <Modal open={Boolean(open)} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Remove Item</Text>
          <ClearInputButton onClear={onClose} style={styles.close} />
        </View>
        <Text style={styles.title}>
          Are you sure you want to remove "{open.name}" from your cart? You can
          again add it anytime from the Shop.
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onClose} style={styles.no}>
            <Text style={styles.noText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit} style={styles.submit}>
            <Text style={styles.submitText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, gap: 20},
  header: {flexDirection: 'row', justifyContent: 'space-between'},
  headerText: {
    fontFamily: FONTS.heading,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    marginRight: -25,
  },
  close: {alignSelf: 'flex-end'},
  title: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.text,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
    gap: 20,
  },
  no: {
    backgroundColor: Colors.primary,
    minWidth: 100,
    paddingVertical: 10,
    borderRadius: 50,
    flex: 1,
    maxWidth: 150,
  },
  noText: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.text,
    fontSize: 16,
    textAlign: 'center',
  },
  submit: {
    backgroundColor: Colors.lightRed,
    minWidth: 100,
    paddingVertical: 10,
    borderRadius: 50,
    flex: 1,
    maxWidth: 150,
  },
  submitText: {
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RemoveItemModal;
