import React from 'react';
import { View, Text, StyleSheet } from "react-native";

export default function ({ data }) {
  return data.map((res, index) => (
    <View style={styles.listItem} key={index}>
      <Text style={styles.itemText}>{res}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});
