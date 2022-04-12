import React from 'react';
import {FlatList} from 'react-native';
import ExpenseItem from './ExpenseItem';

function RenderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

export default function ({expenses}) {
  return (
    <FlatList
      data={expenses}
      renderItem={RenderExpenseItem}
      keyExtractor={itemData => itemData.id}
    />
  );
}
