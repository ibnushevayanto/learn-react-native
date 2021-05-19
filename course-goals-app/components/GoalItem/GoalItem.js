import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function GoalItem(props) {
  return (
    <TouchableOpacity onPress={() => props.deleteHandler(props.index)}>
      <Text style={styles.listItem}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    borderColor: '#acacac',
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 4,
  },
});
