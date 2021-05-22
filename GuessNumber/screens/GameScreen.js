import React, {useState, useRef, useEffect} from 'react';
import {
  Alert,
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/defaultStyles';
import MainButton from '../components/MainButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = props => {
  const initialGuess = generateRandomNumber(1, 100, props.userChoice);
  const [CurrentGuess, setCurrentGuess] = useState(initialGuess);
  const [PastGuess, setPastGuess] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const {userChoice, onGameOver} = props;
  const [ScreenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const heightAdjustHandler = () => {
      setScreenHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', heightAdjustHandler);
    return () => {
      Dimensions.removeEventListener('change', heightAdjustHandler);
    };
  }, [ScreenHeight]);

  useEffect(() => {
    if (CurrentGuess === props.userChoice) {
      props.onGameOver(PastGuess.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && CurrentGuess < props.userChoice) ||
      (direction === 'greater' && CurrentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = CurrentGuess;
    } else {
      currentLow.current = CurrentGuess + 1;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      CurrentGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuess(prevState => [nextNumber.toString(), ...prevState]);
  };

  const rendererListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
      <Text style={DefaultStyles.whiteText}>
        #{listLength - itemData.index}
      </Text>
      <Text style={DefaultStyles.whiteText}>{itemData.item}</Text>
    </View>
  );

  let content = (
    <React.Fragment>
      <NumberContainer justTitle title="Opponent's Choose">
        {CurrentGuess}
      </NumberContainer>
      <Card style={DefaultStyles.buttonContainer}>
        <MainButton
          type="danger"
          onClick={nextGuessHandler.bind(this, 'lower')}>
          <Icon name="minus" size={15} />
        </MainButton>
        <MainButton
          type="success"
          onClick={nextGuessHandler.bind(this, 'greater')}>
          <Icon name="plus" size={15} />
        </MainButton>
      </Card>
    </React.Fragment>
  );

  if (ScreenHeight < 500) {
    content = (
      <View style={styles.containerLandscape}>
        <MainButton
          type="danger"
          onClick={nextGuessHandler.bind(this, 'lower')}>
          <Icon name="minus" size={15} />
        </MainButton>
        <NumberContainer justTitle title="Opponent's Choose">
          {CurrentGuess}
        </NumberContainer>
        <MainButton
          type="success"
          onClick={nextGuessHandler.bind(this, 'greater')}>
          <Icon name="plus" size={15} />
        </MainButton>
      </View>
    );
  }

  return (
    <View style={DefaultStyles.screen}>
      {content}

      {/* <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{justifyContent: 'flex-end', flexGrow: 1}}>
        {PastGuess.map((guess, index) =>
          rendererListItem(guess, PastGuess.length - index),
        )}
      </ScrollView> */}
      <FlatList
        keyExtractor={item => item}
        data={PastGuess}
        style={{width: '100%'}}
        contentContainerStyle={{justifyContent: 'flex-end', flexGrow: 1}}
        renderItem={rendererListItem.bind(this, PastGuess.length)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: Dimensions.get('window').height / 24,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    marginVertical: Dimensions.get('window').height / 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerLandscape: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default GameScreen;
