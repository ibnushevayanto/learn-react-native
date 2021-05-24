import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import MealItem from './MealItem';

const MealList = props => {
  const renderMealItem = itemData => (
    <MealItem data={itemData.item} onChange={props.toDetail} />
  );
  return (
    <View style={styles.screen}>
      <FlatList
        data={props.item}
        renderItem={renderMealItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default MealList;
