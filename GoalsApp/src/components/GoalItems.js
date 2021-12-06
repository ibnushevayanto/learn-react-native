import React from 'react';
import {FlatList} from 'react-native';
import GoalItem from './GoalItem';

const GoalItems = props => {
  return (
    <FlatList
      keyExtractor={(...params) => params[1]}
      data={props.ItemsGoals}
      renderItem={itemData => (
        <GoalItem
          onDelete={props.onDelete.bind(null, itemData.index)}
          item={itemData.item}
        />
      )}
    />
  );
};

export default GoalItems;
