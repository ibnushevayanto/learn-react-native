import React, {createContext, useState} from 'react';

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: id => {},
  removeFavorite: id => {},
});

export default function ({children}) {
  const [favoriteMealsIds, setFavoriteMealsIds] = useState([]);

  const addFavorite = id => {
    setFavoriteMealsIds(prevState => prevState.concat(id));
  };

  const removeFavorite = id => {
    setFavoriteMealsIds(prevState => prevState.filter(item => item !== id));
  };

  const value = {
    ids: favoriteMealsIds,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
