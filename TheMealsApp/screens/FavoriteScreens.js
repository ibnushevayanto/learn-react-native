import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import MealList from '../components/MealList/MealList';
import {MEALS} from '../data/dummy-data';
// import {FavoritesContext} from '../store/context/favorites-context';

export default function () {
  // const favoriteStore = useContext(FavoritesContext);
  const favoriteStore = useSelector(state => state.favoriteMeals);
  const dataMeals = MEALS.filter(res => favoriteStore.ids.includes(res.id));

  return (
    <View style={styles.container}>
      {dataMeals.length ? (
        <MealList data={dataMeals} />
      ) : (
        <Text style={styles.notFoundText}>You have no favorite meals</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
});
