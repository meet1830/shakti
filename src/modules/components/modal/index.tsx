import {Colors, windowWidth} from '@utils/Constants';
import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, ReactNode} from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  modalViewStyle?: StyleProp<ViewStyle>;
}

const CustomModal: FC<ModalProps> = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.open}
      onRequestClose={props?.onClose}>
      <TouchableOpacity
        style={[styles.centeredView, props?.modalViewStyle]}
        activeOpacity={1}
        onPress={props?.onClose}>
        <View style={[styles.modalView, {width: windowWidth - 40}]}>
          {props.children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default CustomModal;
