import React, {ReactNode} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
} from 'react-native';
import {Colors} from '../constants';

interface Props {
  children?: ReactNode | ((state: PressableStateCallbackType) => ReactNode);
  onPress?: (event: GestureResponderEvent) => void;
}

function Button({onPress: handlePress, children}: Props): JSX.Element {
  return (
    <Pressable
      onPress={handlePress}
      style={({pressed}) => [
        {backgroundColor: pressed ? Colors.primaryHover : Colors.primary},
        styles.button,
      ]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 8,
    lineHeight: 8,
  },
});

export default Button;
