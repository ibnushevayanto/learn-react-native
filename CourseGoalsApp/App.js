import { useState } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function App() {
  const [GoalsInput, setGoalsInput] = useState("");
  const [CourseGoals, setCourseGoals] = useState([]);

  const goalsInputHandler = (value) => {
    setGoalsInput(value);
  };

  const addGoalHandler = () => {
    setCourseGoals((prevState) => prevState.concat(GoalsInput));
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={goalsInputHandler}
          placeholder="Your course goal"
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        <ScrollView>
          {CourseGoals.map((res, index) => (
            /**
             * ! Harus dibungkus dengan komponen view, agar support StyleSheet borderRadius
             */
            <View key={index} style={styles.goalItem}>
              <Text style={styles.whiteText}>{res}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

/**
 * ! Untuk mengaktifkan stylesheet flex, parent dari komponen harus memiliki propert flex juga
 * ! Contoh, liat appContainer, goalsContainers, formContainer
 */

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 48,
    flex: 1,
    paddingHorizontal: 16,
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    borderBottomWidth: 1,
    marginBottom: 24,
    paddingBottom: 24,
    borderColor: "#ccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    padding: 8,
    marginRight: 8,
  },
  goalsContainer: {
    flex: 4,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  whiteText: {
    color: "white",
  },
});
