import React from 'react';
import {FlatList} from 'react-native';
import {CATEGORIES} from '../data/dummy-data';
import CategoryTile from '../components/CategoryTile';

const CategoriesScreen = props => {
  const toDetail = (id, title) => {
    props.navigation.navigate('CategoryMealsScreen', {
      categoryId: id,
      categoryTitle: title,
    });
  };

  const renderGridItem = itemData => (
    <CategoryTile
      data={itemData.item}
      onChange={toDetail.bind(this, itemData.item.id, itemData.item.title)}
    />
  );

  return (
    <FlatList
      keyExtractor={item => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGridItem}
    />
  );
};

export default CategoriesScreen;
