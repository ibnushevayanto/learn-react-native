import React from 'react';
import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ({ icon, color, onPress, size }) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <Icon name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
