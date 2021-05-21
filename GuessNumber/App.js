import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const App = () => {
  const [ChoosenNumber, setChoosenNumber] = useState();
  const [GuessRounds, setGuessRounds] = useState(0);

  const startGameHandler = value => {
    setChoosenNumber(value);
    setGuessRounds(0);
  };

  const configureNewGame = () => {
    setGuessRounds(0);
    setChoosenNumber(null);
  };

  const gameOverHandler = guessOfRound => {
    setGuessRounds(guessOfRound);
  };

  let content = <StartGameScreen startGameHandler={startGameHandler} />;
  if (ChoosenNumber && GuessRounds <= 0) {
    content = (
      <GameScreen userChoice={ChoosenNumber} onGameOver={gameOverHandler} />
    );
  } else if (GuessRounds > 0) {
    content = (
      <GameOverScreen
        userNumber={ChoosenNumber}
        numberOfRounds={GuessRounds}
        onRestart={configureNewGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#202040',
  },
});

export default App;
