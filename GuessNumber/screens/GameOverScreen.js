import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import DefaultStyles from '../constants/defaultStyles';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  return (
    <View style={[DefaultStyles.screen, {justifyContent: 'center'}]}>
      <Text
        style={[
          DefaultStyles.whiteText,
          {marginBottom: 12, fontWeight: 'bold'},
        ]}>
        The Game is Over !
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/success.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={[DefaultStyles.whiteText, styles.caption]}>
        Your phone needed{' '}
        <Text style={styles.highlight}>{props.numberOfRounds}</Text> rounds to
        guess the number{' '}
        <Text style={styles.highlight}>{props.userNumber}</Text>.
      </Text>
      <MainButton type="success" onClick={props.onRestart}>
        New Game
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 150,
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  highlight: {
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    color: colors.green,
  },
});

export default GameOverScreen;
