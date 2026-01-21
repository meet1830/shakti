import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import {Colors} from '@utils/Constants';
import Icon from '../icon';

interface Props extends TouchableOpacityProps {
  onClear: (() => void) | undefined;
  style?: StyleProp<ViewStyle>;
}

const ClearInputButton: FC<Props> = ({onClear, style, ...rest}) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 40, right: 40, bottom: 40, left: 40}}
      onPress={onClear}
      style={style}
      {...rest}>
      <View style={styles.icon}>
        <Icon
          name="close"
          size={18}
          color={Colors.text}
          iconFamily="Ionicons"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 2,
    backgroundColor: Colors.lightYellow,
    borderRadius: 50,
  },
});

export default ClearInputButton;
