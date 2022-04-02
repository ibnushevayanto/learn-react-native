import React from 'react';
import { MEALS } from "../data/dummy-data";
import { View, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import MealList from '../components/MealList/MealList';

export default function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;
  const mealsItem = MEALS.filter((res) => res.categoryIds.includes(categoryId));
  
  useLayoutEffect(() => {
    const title = route.params.categoryTitle;
    navigation.setOptions({ title });
  }, []);

  return (
    <View style={styles.container}>
      <MealList data={mealsItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
