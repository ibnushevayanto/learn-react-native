import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function ({roundsNumber, userNumber, onStartNewGame}) {
  const {width, height} = useWindowDimensions();

  let imageSize = 300;

  if (width < 300) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require('../assets/images/success.png')}
          />
        </View>
        <Text style={styles.summaryText}>
          your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          rounds to guess the number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Restart</PrimaryButton>
      </View>
    </ScrollView>
  );
}

// const dimensionWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imageContainer: {
    // width: dimensionWidth < 380 ? 150 : 300,
    // height: dimensionWidth < 380 ? 150 : 300,
    // borderRadius: dimensionWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'OpenSans-Bold',
    color: Colors.primary500,
  },
  screen: {
    flex: 1,
  },
});
