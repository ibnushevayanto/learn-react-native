import React from 'react';
import PlaceForm from '../components/Places/PlaceForm';
import {insertPlace} from '../util/databases';

export default function ({navigation}) {
  const createPlaceHandler = async place => {
    await insertPlace(place);
    navigation.navigate('AllPlace');
  };
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
