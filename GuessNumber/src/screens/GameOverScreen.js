import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import BodyText from '../components/UI/BodyText';
import DefaultStyles from '../constants/styles';

const GameOverScreen = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <BodyText style={DefaultStyles.title}>The Game Is Over!</BodyText>
        <Image
          source={require('../assets/img/success.png')}
          style={styles.avatar}
        />
        <View style={styles.containerText}>
          <BodyText>
            Number of rounds{' '}
            <BodyText style={DefaultStyles.highlight}>
              {props.roundsNumber}
            </BodyText>
          </BodyText>
          <BodyText>
            The Number was{' '}
            <BodyText style={DefaultStyles.highlight}>
              {props.userNumber}
            </BodyText>
          </BodyText>
        </View>
        <Button
          onPress={props.restartHandler.bind(this, false)}
          title="Restart"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontDefault: {
    fontFamily: 'NotoSans-Regular',
  },
  avatar: {
    borderRadius: Dimensions.get('window').width / 1.5,
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').width / 1.5,
    marginVertical: Dimensions.get('window').height / 20,
  },
  containerText: {
    marginVertical: Dimensions.get('window').height / 40,
  },
});

export default GameOverScreen;
