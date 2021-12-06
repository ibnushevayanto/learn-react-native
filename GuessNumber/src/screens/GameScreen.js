import React, {useState, useRef, useEffect, Fragment} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import NumberContainer from '../components/UI/NumberContainer';
import Card from '../components/UI/Card';
import BodyText from '../components/UI/BodyText';
import MainButton from '../components/UI/MainButton';
import DefaultStyles from '../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const generateRandomBetween = (min, max, exclude) => {
  let minimal = Math.ceil(min);
  let maximal = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (maximal - minimal) + minimal);

  if (rndNum === exclude) {
    return generateRandomBetween(minimal, maximal, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (data, itemData) => {
  return (
    <View
      style={{
        ...styles.listItem,
        width:
          data.WatchWindowWidth > 350
            ? data.WatchWindowWidth - (data.WatchWindowWidth * 60) / 100
            : data.WatchWindowWidth - (data.WatchWindowWidth * 80) / 100,
      }}>
      <BodyText>#{+data.numOfRounds - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
};

const GameScreen = props => {
  const {userChoice, gameOverHandler} = props;
  const initialValue = generateRandomBetween(1, 100, userChoice);
  const [CurrentGuess, setCurrentGuess] = useState(initialValue);
  const [GuessRounds, setGuessRounds] = useState(1);
  const [ListValue, setListValue] = useState([initialValue]);
  const [WatchWindowWidth, setWatchWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const [WatchWindowHeight, setWatchWindowHeight] = useState(
    Dimensions.get('window').height,
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (CurrentGuess === userChoice) {
      gameOverHandler(GuessRounds);
    }
  }, [CurrentGuess, userChoice, GuessRounds, gameOverHandler]);

  useEffect(() => {
    const setWidthDimension = () => {
      setWatchWindowWidth(Dimensions.get('window').width);
      setWatchWindowHeight(Dimensions.get('window').height);
    };
    const eventDimension = Dimensions.addEventListener(
      'change',
      setWidthDimension,
    );
    return () => {
      eventDimension.remove();
    };
  }, []);

  /**
   * Menggunakan useRef tidak merender ulang komponen, bagus untuk performa aplikasi
   */

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && CurrentGuess < userChoice) ||
      (direction === 'greater' && CurrentGuess > userChoice)
    ) {
      Alert.alert("Don't Lie!", 'You know that this is wrong...', [
        {text: 'Sorry', style: 'cancel'},
      ]);
      return;
    }
    setGuessRounds(prevValue => prevValue + 1);
    if (direction === 'lower') {
      currentHigh.current = CurrentGuess;
    } else {
      currentLow.current = CurrentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      CurrentGuess,
    );
    setCurrentGuess(nextNumber);
    setListValue(prevState => prevState.concat(nextNumber));
  };

  let containerContent = (
    <Fragment>
      <NumberContainer>{CurrentGuess}</NumberContainer>
      <Card
        style={{
          ...styles.buttonContainer,
          marginVertical: WatchWindowHeight > 600 ? 20 : 5,
        }}>
        <MainButton
          style={DefaultStyles.bulet}
          onPress={nextGuessHandler.bind(this, 'lower')}>
          <Icon name="minus" size={14} color="#fff" />
        </MainButton>
        <MainButton
          style={DefaultStyles.bulet}
          onPress={nextGuessHandler.bind(this, 'greater')}>
          <Icon name="plus" size={14} color="#fff" />
        </MainButton>
      </Card>
    </Fragment>
  );

  if (WatchWindowWidth < 500) {
    containerContent = (
      <Fragment>
        <Card style={styles.buttonContainer}>
          <MainButton
            style={DefaultStyles.bulet}
            onPress={nextGuessHandler.bind(this, 'lower')}>
            <Icon name="minus" size={14} color="#fff" />
          </MainButton>
          <NumberContainer>{CurrentGuess}</NumberContainer>
          <MainButton
            style={DefaultStyles.bulet}
            onPress={nextGuessHandler.bind(this, 'greater')}>
            <Icon name="plus" size={14} color="#fff" />
          </MainButton>
        </Card>
      </Fragment>
    );
  }

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      {containerContent}
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {ListValue.map((res, index) =>
            renderListItem(res, ListValue.length - index, WatchWindowWidth),
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={value => value}
          data={ListValue}
          contentContainerStyle={styles.list}
          renderItem={renderListItem.bind(this, {
            numOfRounds: ListValue.length,
            WatchWindowWidth,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 300,
    maxWidth: '80%',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    width: '80%',
    flex: 1,
  },
  list: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
});

export default GameScreen;
