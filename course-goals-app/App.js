import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';
import GoalItem from './components/GoalItem/GoalItem';
import GoalInput from './components/GoalInput/GoalInput';

export default function App() {
  const [CourseGoals, setCourseGoals] = useState([]);
  const [ModalFormGoal, setModalFormGoal] = useState(false);

  const addGoalHandler = value => {
    setCourseGoals(prevState => [...prevState, value]);
    togleModalFormGoal();
  };

  const deleteGoalHandler = valIndex => {
    setCourseGoals(currentGoals =>
      currentGoals.filter((res, index) => index !== valIndex),
    );
  };

  const togleModalFormGoal = () => {
    setModalFormGoal(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add New Goal"
        color="#3778b4"
        onPress={togleModalFormGoal}
      />
      <GoalInput
        show={ModalFormGoal}
        cancelHandler={togleModalFormGoal}
        addItemHandler={addGoalHandler}
      />
      <View style={styles.containerList}>
        {CourseGoals.length > 0 ? (
          <FlatList
            data={CourseGoals}
            keyExtractor={(item, index) => item + index}
            renderItem={itemData => (
              <GoalItem
                title={itemData.item}
                index={itemData.index}
                deleteHandler={deleteGoalHandler}
              />
            )}
          />
        ) : (
          <Text style={styles.emptyText}>Data Masih Kosong</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  containerList: {
    marginTop: 15,
  },
  emptyText: {
    color: '#acacac',
    textAlign: 'center',
  },
});
