import React, {FC} from 'react';
import {StyleProp, TextStyle} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IconProps {
  color?: string;
  size: number;
  name: string;
  iconFamily: 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons';
  style?: StyleProp<TextStyle>;
}

const Icon: FC<IconProps> = ({
  color,
  size,
  name,
  iconFamily,
  style,
}: IconProps) => {
  return (
    <>
      {iconFamily === 'Ionicons' && (
        <Ionicons name={name} size={size} color={color} style={style} />
      )}
      {iconFamily === 'MaterialCommunityIcons' && (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
          style={style}
        />
      )}
      {iconFamily === 'MaterialIcons' && (
        <MaterialIcons name={name} size={size} color={color} style={style} />
      )}
    </>
  );
};

export default Icon;
