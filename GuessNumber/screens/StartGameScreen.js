import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import DefaultStyles from '../constants/defaultStyles';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
  const [EnteredValue, setEnteredValue] = useState('');
  const [Confirmed, setConfirmed] = useState(false);
  const [ChoosenNumber, setChoosenNumber] = useState();

  const getTextColor = () => {
    return DefaultStyles.whiteText;
  };
  const numberInputHandler = value => {
    setEnteredValue(value.replace(/[^0-9]/g, ''));
  };
  const resetHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmHandler = () => {
    const choosenNumber = +EnteredValue;

    if (choosenNumber === 0 || choosenNumber > 99 || isNaN(choosenNumber)) {
      Alert.alert(
        'Invalid Number !',
        'Number has to be a number between 1 and 99.',
        [{text: 'Okay', style: 'destructive', onPress: resetHandler}],
      );
      return;
    }

    setConfirmed(true);
    setChoosenNumber(choosenNumber);
    setEnteredValue('');
  };

  let confirmedElement;
  if (Confirmed) {
    confirmedElement = (
      <NumberContainer
        startGameHandler={props.startGameHandler}
        title="You Choose">
        {ChoosenNumber}
      </NumberContainer>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={DefaultStyles.screen}>
            <Text style={[styles.title, getTextColor()]}>Start A New Game</Text>
            <Card style={styles.inputContainer}>
              <Text style={[getTextColor()]}>Select a Number</Text>
              <Input
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                value={EnteredValue}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                style={styles.inputNumberField}
              />
              <View style={DefaultStyles.buttonContainer}>
                <View style={styles.button}>
                  <MainButton type="danger" onClick={resetHandler}>
                    Reset
                  </MainButton>
                  {/* <Button color={colors.red} title="Reset" onPress={resetHandler} /> */}
                </View>
                <View style={styles.button}>
                  <MainButton type="success" onClick={confirmHandler}>
                    Confirm
                  </MainButton>
                </View>
              </View>
            </Card>
            {confirmedElement}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    minWidth: 300,
    maxWidth: '100%',
  },
  button: {
    width: Dimensions.get('window').width / 4,
  },
  inputNumberField: {
    width: '100%',
    marginVertical: 15,
    textAlign: 'center',
  },
});

export default StartGameScreen;
