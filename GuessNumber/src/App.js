/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const App = () => {
  const [IsGameStart, setIsGameStart] = useState(false);
  const [SelectedNumber, setSelectedNumber] = useState();
  const selectNumberHandler = value => {
    setSelectedNumber(value);
  };
  const [UserGuess, setUserGuess] = useState(0);

  const gameStartHandler = value => {
    setUserGuess(0);
    setIsGameStart(value);
  };

  const gameOverHandler = userGuess => {
    setUserGuess(userGuess);
  };

  return (
    <View style={styles.screen}>
      {UserGuess === 0 && <Header title="Guess a Number" />}
      {IsGameStart ? (
        UserGuess > 0 ? (
          <GameOverScreen
            roundsNumber={UserGuess}
            userNumber={SelectedNumber}
            restartHandler={gameStartHandler}
          />
        ) : (
          <GameScreen
            userChoice={SelectedNumber}
            gameOverHandler={gameOverHandler}
          />
        )
      ) : (
        <StartGameScreen
          selectedNumber={SelectedNumber}
          selectNumberHandler={selectNumberHandler}
          gameStartHandler={gameStartHandler}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
