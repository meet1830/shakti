import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Colors, screenHeight, screenWidth} from '@utils/Constants';
import {
  Keyboard,
  Modal,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, ReactNode, useEffect} from 'react';

import {useKeyboardState} from 'react-native-keyboard-controller';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  bodyStyle?: StyleProp<ViewStyle>;
}

const BottomSheet: FC<Props> = props => {
  const {open, onClose, children} = props;

  const {bottom} = useSafeAreaInsets();
  const {height} = useKeyboardState();
  const marginBottom = useSharedValue(0);

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginBottom: marginBottom.value,
    };
  });

  useEffect(() => {
    if (!open || !height) {
      marginBottom.set(0);
    } else {
      marginBottom.value = withTiming(
        Platform.OS === 'ios' ? height - 20 : height,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, open]);

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      onRequestClose={handleClose}>
      <TouchableOpacity
        style={[styles.underlay, {height: screenHeight, width: screenWidth}]}
        onPress={handleClose}
      />
      <View style={styles.content}>
        <View style={styles.childrenContainer}>
          <Animated.View
            style={[
              styles.childrenAnimContainer,
              {paddingBottom: bottom || (height ? 10 : 20)},
              animatedStyle,
            ]}>
            {children}
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  underlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {flex: 1, justifyContent: 'flex-end'},
  childrenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    maxHeight: screenHeight * 0.94,
  },
  childrenAnimContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default BottomSheet;
