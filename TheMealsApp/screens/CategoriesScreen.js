import React from 'react';
import { View, FlatList } from "react-native";
import CategoryTiles from "../components/CategoryTiles";
import { CATEGORIES } from "../data/dummy-data";

export default function CategoriesScreen() {
  return (
    <View>
      <FlatList
        numColumns={2}
        data={CATEGORIES}
        renderItem={(itemData) => (
          <CategoryTiles
            id={itemData.item.id}
            title={itemData.item.title}
            color={itemData.item.color}
          />
        )}
        keyExtractor={(itemData) => itemData.id}
      />
    </View>
  );
}
