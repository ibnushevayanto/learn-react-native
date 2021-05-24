import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import DefaultText from '../components/DefaultText';
import {useDispatch} from 'react-redux';
import {setFilters} from '../store/actions/meals';

const FilterSwitch = props => (
  <View style={styles.rowContainer}>
    <DefaultText>{props.title}</DefaultText>
    <Switch
      value={props.state}
      thumbColor="white"
      trackColor={{true: 'lightgreen'}}
      onValueChange={newValue => props.onChange(newValue)}
    />
  </View>
);

const FiltersScreen = props => {
  const [IsGlutenFree, setIsGlutenFree] = useState(false);
  const [IsLactoseFree, setIsLactoseFree] = useState(false);
  const [IsVegan, setIsVegan] = useState(false);
  const [IsVegetarian, setIsVegetarian] = useState(false);
  const {navigation} = props;
  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const applieFilters = {
      glutenFree: IsGlutenFree,
      lactoseFree: IsLactoseFree,
      vegan: IsVegan,
      vegetarian: IsVegetarian,
    };
    dispatch(setFilters(applieFilters));
  }, [IsGlutenFree, IsLactoseFree, IsVegan, IsVegetarian, dispatch]);

  useEffect(() => {
    navigation.dispatch(CommonActions.setParams({save: saveFilters}));
  }, [saveFilters, navigation]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restricitions</Text>
      <FilterSwitch
        title="Gluten-free"
        state={IsGlutenFree}
        onChange={setIsGlutenFree}
      />
      <FilterSwitch
        title="Lactose-free"
        state={IsLactoseFree}
        onChange={setIsLactoseFree}
      />
      <FilterSwitch title="IsVegan" state={IsVegan} onChange={setIsVegan} />
      <FilterSwitch
        title="IsVegetarian"
        state={IsVegetarian}
        onChange={setIsVegetarian}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});

export default FiltersScreen;
