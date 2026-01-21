import {Colors, FONTS} from '@utils/Constants';
import React, {FC, ReactNode, isValidElement} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import ClearInputButton from '../clearInputButton';

interface Props extends TextInputProps {
  leftComponent?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onClear?: () => void;
}

const Input: FC<Props> = props => {
  const {leftComponent, containerStyle, onClear, ...rest} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {isValidElement(leftComponent) && leftComponent}
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.inactive}
        {...rest}
      />
      {Boolean(rest.value) && !rest.readOnly && (
        <ClearInputButton
          onClear={onClear}
          style={styles.clear}
          hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 42,
    flex: 1,
    fontFamily: FONTS.heading2,
    fontWeight: '500',
    fontSize: 14,
  },
  clear: {paddingRight: 10},
});

export default Input;
