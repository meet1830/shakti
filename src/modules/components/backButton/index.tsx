import {Colors, shadow} from '@utils/Constants';
import React, {FC} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Icon from '../icon';
import {goBack} from '@navigation/NavigationUtil';

interface Props {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const BackButton: FC<Props> = ({onPress, style}) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 40, right: 40, bottom: 40, left: 40}}
      onPress={onPress ? onPress : goBack}
      style={[styles.container, style]}>
      <View style={styles.icon}>
        <Icon
          name="chevron-back"
          size={24}
          color={Colors.inactive}
          iconFamily="Ionicons"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingTop: 5,
    zIndex: 1,
  },
  icon: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: Colors.white,
    ...shadow[3],
  },
});

export default BackButton;
