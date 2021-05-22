import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import DefaultStyles from '../constants/defaultStyles';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={[DefaultStyles.screen, DefaultStyles.contentCenter]}>
        <Text style={[DefaultStyles.whiteText, styles.gameOverText]}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: (Dimensions.get('window').width * 0.9) / 2,
    height: (Dimensions.get('window').width * 0.9) / 2,
    overflow: 'hidden',
    borderRadius: (Dimensions.get('window').width * 0.9) / 2,
    marginVertical: Dimensions.get('window').height / 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    marginBottom: Dimensions.get('window').height / 30,
    textAlign: 'center',
    paddingHorizontal: Dimensions.get('window').height / 30,
  },
  highlight: {
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    color: colors.green,
  },
  gameOverText: {
    marginBottom: Dimensions.get('window').height / 80,
    fontWeight: 'bold',
  },
});

export default GameOverScreen;
