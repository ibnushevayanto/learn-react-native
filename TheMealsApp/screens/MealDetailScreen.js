import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {useSelector} from 'react-redux';
import DefaultText from '../components/DefaultText';

const MealDetailScreen = props => {
  const {navigation} = props;
  const mealId = props.route.params.id;
  const availAbleMeals = useSelector(state => state.meals.meals);
  const selectedMeal = availAbleMeals.find(meal => meal.id === mealId);
  const isFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(res => res.id === mealId),
  );

  useEffect(() => {
    navigation.setParams({isFavorite});
  }, [isFavorite, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={[styles.mealRow]}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map((res, index) => (
          <Text style={styles.list} key={index + res}>
            {res}
          </Text>
        ))}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map((res, index) => (
          <Text style={styles.list} key={index + res}>
            {res}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  screen: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  list: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#acacac',
    marginBottom: 15,
    borderWidth: 1,
  },
});

export default MealDetailScreen;
