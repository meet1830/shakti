import Icon from '@modules/components/icon';

interface TabIconProps {
  focused: boolean;
  size: number;
  color: string;
}

export const HomeIcon = ({focused, size, color}: TabIconProps) => {
  return (
    <Icon
      name={focused ? 'home' : 'home-outline'}
      size={size}
      iconFamily="Ionicons"
      color={color}
    />
  );
};

export const CartIcon = ({focused, size, color}: TabIconProps) => {
  return (
    <Icon
      name={focused ? 'cart' : 'cart-outline'}
      size={size}
      iconFamily="MaterialCommunityIcons"
      color={color}
    />
  );
};

export const OrdersIcon = ({focused, size, color}: TabIconProps) => {
  return (
    <Icon
      name={focused ? 'list-circle-sharp' : 'list-circle-outline'}
      size={size}
      iconFamily="Ionicons"
      color={color}
    />
  );
};
