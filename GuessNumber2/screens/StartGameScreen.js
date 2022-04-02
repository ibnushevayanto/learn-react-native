import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

export default function ({onPickedNumber}) {
  const [enteredNumber, setEnteredNumber] = useState('');
  const {width, height} = useWindowDimensions();

  const confirmHandler = () => {
    const chosenNumber = +enteredNumber;

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [
          {
            text: 'Okay',
            style: 'destructive',
            onPress: () => setEnteredNumber(''),
          },
        ],
      );
      return;
    }

    onPickedNumber(enteredNumber);
  };

  const marginTopSpace = height < 400 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, {marginTop: marginTopSpace}]}>
          <Title>Guess Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={value => setEnteredNumber(value)}
              value={enteredNumber}
            />
            <View style={styles.containerButton}>
              <View style={styles.flex}>
                <PrimaryButton onPress={() => setEnteredNumber('')}>
                  RESET
                </PrimaryButton>
              </View>
              <View style={styles.flex}>
                <PrimaryButton onPress={confirmHandler}>START</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  screen: {
    flex: 1,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerButton: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});
