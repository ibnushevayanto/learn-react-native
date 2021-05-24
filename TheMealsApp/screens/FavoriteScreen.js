import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MealList from '../components/MealList';
import {useSelector} from 'react-redux';

const FavoriteScreen = props => {
  const favMeals = useSelector(state => state.meals.favoriteMeals);
  const toDetail = (id, title) => {
    props.navigation.navigate('MealDetailScreen', {id, title});
  };
  return favMeals.length ? (
    <MealList item={favMeals} toDetail={toDetail} />
  ) : (
    <View>
      <Text style={styles.textContainer}>
        No Favorite Meals Found. Start adding some!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    padding: 20,
    color: 'grey',
  },
});

export default FavoriteScreen;
