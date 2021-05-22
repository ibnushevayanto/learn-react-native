import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import DefaultStyles from '../constants/defaultStyles';

const Header = props => {
  const [WatchHeight, setWatchHeight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const updateHeight = () => {
      setWatchHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateHeight);
    return () => {
      Dimensions.removeEventListener('change', updateHeight);
    };
  }, [WatchHeight]);

  return (
    <View
      style={[
        styles.header,
        {height: WatchHeight * 0.16, paddingBottom: WatchHeight * 0.04},
      ]}>
      <Text style={[DefaultStyles.whiteText, {fontSize: 18}]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    elevation: 12,
    justifyContent: 'flex-end',
  },
});

export default Header;
