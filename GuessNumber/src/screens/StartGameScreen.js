import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/UI/Card';
import Colors from '../constants/colors';
import Input from '../components/UI/Input';
import NumberContainer from '../components/UI/NumberContainer';
import BodyText from '../components/UI/BodyText';
import DefaultStyles from '../constants/styles';
import MainButton from '../components/UI/MainButton';

const StartGameScreen = props => {
  const [EnteredValue, setEnteredValue] = useState('');
  const [Confirmed, setConfirmed] = useState(false);
  const [ButtonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4,
  );

  const changeInputHandler = value => {
    setEnteredValue(value.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const choosenNumber = +EnteredValue;
    if (!choosenNumber || choosenNumber > 99) {
      Alert.alert(
        'Invalid Number!',
        'Number has to be a number between 1 and 99.',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }
    setEnteredValue('');
    setConfirmed(true);
    props.selectNumberHandler(choosenNumber);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const changeWidth = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    const eventDimensions = Dimensions.addEventListener('change', changeWidth);
    return () => {
      eventDimensions.remove();
    };
  }, []);

  let confirmOutput;

  if (Confirmed) {
    confirmOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You Selected</BodyText>
        <NumberContainer>{props.selectedNumber}</NumberContainer>
        <MainButton onPress={props.gameStartHandler.bind(null, true)}>
          Start Game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Start a New Game!</Text>
            <Card style={styles.containerInput}>
              <Text style={styles.fontDefault}>Select a Number</Text>
              <Input
                blurOnSubmit
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={2}
                value={EnteredValue}
                onChangeText={changeInputHandler}
              />
              <View style={styles.containerButton}>
                <View style={{width: ButtonWidth}}>
                  <MainButton
                    styleContainer={{backgroundColor: Colors.accent}}
                    onPress={resetInputHandler}>
                    Reset
                  </MainButton>
                </View>
                <View style={{width: ButtonWidth}}>
                  <MainButton
                    onPress={confirmInputHandler}
                    color={Colors.primary}>
                    Confirm
                  </MainButton>
                </View>
              </View>
            </Card>
            {confirmOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  containerInput: {
    alignItems: 'center',
    width: '80%',
    maxWidth: '95%',
    marginVertical: 20,
    minWidth: 300,
  },
  input: {
    width: 100,
    textAlign: 'center',
  },
  summaryContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  fontDefault: {
    fontFamily: 'NotoSans-Regular',
  },
});

export default StartGameScreen;
