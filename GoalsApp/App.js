import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, Button} from 'react-native';
import GoalInput from './src/components/GoalInput';
import GoalItems from './src/components/GoalItems';

const App = () => {
  const [ItemsGoals, setItemsGoals] = useState([]);
  const goalInputRef = useRef();

  const goalsSubmitHandler = value => {
    setItemsGoals(prevState => prevState.concat(value));
    goalInputRef.current.reset();
  };

  const deleteItemHandler = index => {
    setItemsGoals(prevState =>
      prevState.filter((...props) => props[1] !== index),
    );
  };

  const showForm = () => {
    goalInputRef.current.toggleForm();
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Button onPress={showForm} title="Show Form" />
      <GoalInput ref={goalInputRef} goalsSubmitHandler={goalsSubmitHandler} />
      <GoalItems ItemsGoals={ItemsGoals} onDelete={deleteItemHandler} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
  },
});

export default App;
