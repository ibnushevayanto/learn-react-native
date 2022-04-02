import React from 'react';
import {FlatList} from 'react-native';
import MealItem from './MealItem';

export default function ({data}) {
  return (
    <FlatList
      data={data}
      renderItem={itemData => <MealItem {...itemData.item} />}
      keyExtractor={itemData => itemData.id}
    />
  );
}
