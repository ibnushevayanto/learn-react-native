import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, TextInput, StyleSheet, Button, Modal} from 'react-native';

const GoalInput = (props, ref) => {
  const [GoalsInput, setGoalsInput] = useState('');
  const [isShowForm, setIsShowForm] = useState(false);

  const goalsInputHandler = inputValue => {
    setGoalsInput(inputValue);
  };

  const resetInputHandler = () => {
    setGoalsInput('');
  };

  const toggleForm = () => {
    console.log('ajksjaks');
    setIsShowForm(prevState => !prevState);
  };

  useImperativeHandle(ref, () => ({
    reset: resetInputHandler,
    toggleForm,
  }));

  return (
    <Modal visible={isShowForm} animationType="slide">
      <Button onPress={toggleForm} title="Close" />
      <View style={styles.containerInputGoals}>
        <TextInput
          placeholder="Course Goal"
          style={styles.textInput}
          onChangeText={goalsInputHandler}
          value={GoalsInput}
        />
        <Button
          title="ADD"
          onPress={props.goalsSubmitHandler.bind(null, GoalsInput)}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerInputGoals: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    flexGrow: 1,
    marginRight: 10,
    borderColor: '#acacac',
    padding: 6,
  },
});

export default forwardRef(GoalInput);
