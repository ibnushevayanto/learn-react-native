import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MainButton from './MainButton';

const NumberContainer = props => {
  return (
    <View style={styles.choosenNumberContainer}>
      <Text style={styles.yourChooseText}>{props.title} </Text>
      <Text style={styles.choosenNumber}>{props.children} </Text>
      {!props.justTitle && (
        <MainButton
          type="warning"
          onClick={() => props.startGameHandler(props.children)}>
          {' '}
          Start Game
        </MainButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  choosenNumberContainer: {
    padding: 30,
    elevation: 8,
    marginTop: 8,
  },
  choosenNumber: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    marginBottom: 8,
  },
  yourChooseText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default NumberContainer;
