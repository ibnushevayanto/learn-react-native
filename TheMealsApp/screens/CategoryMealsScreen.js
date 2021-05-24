import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MealList from '../components/MealList';
import {useSelector} from 'react-redux';

const CategoryMealsScreen = props => {
  const catId = props.route.params.categoryId;
  const availableMeals = useSelector(state => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0,
  );
  const toDetail = (id, title) => {
    props.navigation.navigate('MealDetailScreen', {id, title});
  };

  return displayedMeals.length ? (
    <MealList item={displayedMeals} toDetail={toDetail} />
  ) : (
    <View>
      <Text style={styles.content}>
        No meals found, maybe check your filters?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    padding: 20,
    color: 'grey',
  },
});

export default CategoryMealsScreen;
