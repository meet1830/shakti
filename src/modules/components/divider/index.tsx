import React, {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {Colors} from '@utils/Constants';

interface Props {
  style?: StyleProp<ViewStyle>;
}

const Divider: FC<Props> = props => {
  const {style} = props;

  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    borderTopWidth: 1,
    height: 1,
    borderTopColor: Colors.inactive,
    marginVertical: 15,
    opacity: 0.3,
  },
});

export default Divider;
