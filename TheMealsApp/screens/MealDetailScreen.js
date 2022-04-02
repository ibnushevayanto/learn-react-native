import React, {useLayoutEffect, useContext} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Button} from 'react-native';
import {MEALS} from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import IconButton from '../components/IconButton';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../store/redux/favorites';

// import {FavoritesContext} from '../store/context/favorites-context';

export default function ({route, navigation}) {
  const idMeal = route.params.mealId;
  const title = route.params.title;
  const meal = MEALS.find(res => res.id === idMeal);

  // * useContext
  // const favMealsStore = useContext(FavoritesContext);

  // * reduxjs
  const favMealsStore = useSelector(state => state.favoriteMeals);
  const dispatch = useDispatch();

  const isFavMeal = favMealsStore.ids.includes(idMeal);

  const toggleFavoriteMealHandler = () => {
    if (isFavMeal) {
      // favMealsStore.removeFavorite(idMeal);
      dispatch(removeFavorite({id: idMeal}));
    } else {
      dispatch(addFavorite({id: idMeal}));
      // favMealsStore.addFavorite(idMeal);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => (
        <IconButton
          onPress={toggleFavoriteMealHandler}
          icon={isFavMeal ? 'star' : 'star-outline'}
          size={24}
          color="white"
        />
      ),
    });
  }, [isFavMeal]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{uri: meal.imageUrl}} />
      <Text style={styles.title}>{meal.title}</Text>
      <View>
        <MealDetails
          duration={meal.duration}
          affordability={meal.affordability}
          complexity={meal.complexity}
          textStyle={styles.detailText}
        />
        <View style={styles.outerListContainer}>
          <View style={styles.listContainer}>
            <Subtitle>Ingredients</Subtitle>
            <List data={meal.ingredients} />
            <Subtitle>Steps</Subtitle>
            <List data={meal.ingredients} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  rootContainer: {
    marginBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listContainer: {
    width: '80%',
  },
  outerListContainer: {
    alignItems: 'center',
  },
});
