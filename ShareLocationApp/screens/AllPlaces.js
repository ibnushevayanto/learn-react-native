import React, {useState, useEffect} from 'react';
import PlacesList from '../components/Places/PlacesList';
import {useIsFocused} from '@react-navigation/native';
import {fetchPlaces} from '../util/databases';

export default function ({route}) {
  const isFocussed = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    if (isFocussed) {
      const loadPlace = async () => {
        const places = await fetchPlaces();
        setLoadedPlaces(places);
      };
      loadPlace();
    }
  }, [isFocussed, route]);

  return <PlacesList places={loadedPlaces} />;
}
