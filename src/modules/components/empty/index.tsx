import {Colors, FONTS} from '@utils/Constants';
import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  onPress: () => void;
  text: string;
  buttonText: string;
  style?: StyleProp<ViewStyle>;
}

const Empty: FC<Props> = ({onPress, text, buttonText, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  text: {
    fontFamily: FONTS.heading2,
    fontWeight: '700',
    color: Colors.text,
    fontSize: 18,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: FONTS.heading2,
    fontWeight: '600',
    color: Colors.text,
    fontSize: 16,
  },
});

export default Empty;
