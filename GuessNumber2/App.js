import React, {useState} from 'react';
import StartGameScreen from './screens/StartGameScreen';
import {StyleSheet, ImageBackground, SafeAreaView, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

export default function () {
  const [userNumber, setUserNumber] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const pickedNumberHandler = pickedNumber => {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
    setGuessRounds(0);
  };

  const gameOverHandler = () => setIsGameOver(true);

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen gameOverHandler={gameOverHandler} setGuessRounds={(value) => setGuessRounds(value)} userNumber={userNumber} />
    );
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        onStartNewGame={pickedNumberHandler.bind(this, '')}
        roundsNumber={guessRounds}
      />
    );
  }

  return (
    <>
    <StatusBar barStyle='light-content' />
    <LinearGradient
      colors={[Colors.primary800, Colors.accent500]}
      style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
        style={styles.rootScreen}>
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
