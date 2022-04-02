import React from 'react';
import { StyleSheet, Text, View } from "react-native";

export default function ({ children }) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: "white",
    fontSize: 18,
    color: "#e2b497",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleContainer: {
    padding: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    borderBottomColor: "#e2b497",
    borderBottomWidth: 2,
  },
});
