import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import React, {FC} from 'react';

import {KeyboardAvoidingView} from 'react-native-keyboard-controller';

interface Props {
  children: React.ReactNode;
  offset?: number;
  style?: StyleProp<ViewStyle>;
}

const KeyboardAvoidLayout: FC<Props> = props => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={props.offset ?? 0}
      style={[styles.keyboardView, props?.style]}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidLayout;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 0,
    padding: 0,
  },
});
