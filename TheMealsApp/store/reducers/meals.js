import {MEALS} from '../../data/dummy-data';
import {TOGGLE_FAVORITE, SET_FILTERS} from '../actions/meals';
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TOGGLE_FAVORITE:
      const indexDataFavorite = state.favoriteMeals.findIndex(
        res => res.id === actions.id,
      );

      if (indexDataFavorite >= 0) {
        const favoriteMeals = [...state.favoriteMeals];
        favoriteMeals.splice(indexDataFavorite, 1);
        return {...state, favoriteMeals};
      } else {
        const data = state.meals.find(res => res.id === actions.id);
        return {...state, favoriteMeals: state.favoriteMeals.concat(data)};
      }
    case SET_FILTERS:
      const appliedFilters = actions.filters;
      const filteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });
      return {...state, filteredMeals};
    default:
      return state;
  }
};

export default mealReducer;
