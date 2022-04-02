import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function App() {
  const [CourseGoals, setCourseGoals] = useState([]);
  const [IsModalVisible, setIsModalVisible] = useState(false);

  const addItemCourseGoalHandler = (value) => {
    setCourseGoals((prevState) => prevState.concat(value));
  };

  const deleteItemCourseGoalHandler = (indexCourse) => {
    setCourseGoals((prevState) =>
      prevState.filter((res, index) => index !== indexCourse)
    );
  };

  const toggleModal = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  return (
    <>
    <ExpoStatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Goal" color="#a065ec" onPress={toggleModal} />
        <GoalInput
          toggleModal={toggleModal}
          IsModalVisible={IsModalVisible}
          addItemCourseGoalHandler={addItemCourseGoalHandler}
        />
        <GoalItem
          CourseGoals={CourseGoals}
          deleteItemCourseGoalHandler={deleteItemCourseGoalHandler}
        />
      </View>
    </>
  );
}

/**
 * ! Untuk mengaktifkan stylesheet flex, parent dari komponen harus memiliki propert flex juga
 */

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 48,
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
});
