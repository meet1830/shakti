import {Colors, FONTS} from '@utils/Constants';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';

import {FormEnum} from './types';
import Input from '../input';

interface Props extends TextInputProps {
  id: FormEnum;
  handleChange?: (key: FormEnum, val: string) => void;
  header: string;
  placeholder?: string;
  error: string;
  defaultValue: string;
}

const FormInput: FC<Props> = ({
  header,
  id,
  handleChange,
  error,
  defaultValue,
  ...rest
}) => {
  const [defaultColor, setDefaultColor] = useState(Boolean(defaultValue));

  let keyboardType: KeyboardTypeOptions = 'default';
  if (id === FormEnum.phone || id === FormEnum.zipCode) {
    keyboardType = 'phone-pad';
  }

  let borderColor = Colors.inactive;
  if (id === FormEnum.city) {
    borderColor = Colors.inactive;
  } else if (defaultColor && defaultValue) {
    borderColor = Colors.text;
  } else if (error) {
    borderColor = Colors.error;
  } else if (rest.value) {
    borderColor = Colors.success;
  }

  const onChangeText = (newValue: string) => {
    handleChange?.(id, newValue);
    setDefaultColor(false);
  };

  const onClear = () => {
    handleChange?.(id, '');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <Input
        containerStyle={[
          styles.input,
          {borderColor},
          id === FormEnum.city && {backgroundColor: Colors.disabled},
        ]}
        onChangeText={onChangeText}
        onClear={onClear}
        keyboardType={keyboardType}
        {...rest}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    fontFamily: FONTS.heading,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  error: {
    fontFamily: FONTS.heading,
    fontWeight: '700',
    color: Colors.error,
    fontSize: 12,
    marginTop: 5,
  },
});

export default FormInput;
