import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function Button(props) {
  const { onPress, iconName = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <FontAwesome6 name={iconName} size={16} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
});
