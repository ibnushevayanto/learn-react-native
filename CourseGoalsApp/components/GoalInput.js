import { View, Image, Button, StyleSheet, TextInput, Modal } from "react-native";
import { useState } from "react";

export default function GoalInput(props) {
  const [GoalsInput, setGoalsInput] = useState("");

  const goalsInputHandler = (value) => {
    setGoalsInput(value);
  };

  const buttonAddGoalHandler = () => {
    props.addItemCourseGoalHandler(GoalsInput);
    props.toggleModal()
  };

  return (
    <Modal visible={props.IsModalVisible} animationType="slide">
      <View style={styles.formContainer}>
        <View style={styles.inputConatainer}>
          <Image style={styles.image} source={require('../assets/goal.png')} />
          <TextInput
            style={styles.textInput}
            value={GoalsInput}
            onChangeText={goalsInputHandler}
            placeholder="Your course goal"
          />
        </View>
        <View style={styles.containerButton}>
          <Button title="Add Goal" onPress={buttonAddGoalHandler} color="#5e0acc" />
          <Button title="Cancel" onPress={props.toggleModal} color="#f31282" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#311b6b'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  inputConatainer: {
    alignItems: 'center'
  },  
  containerButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: '100%',
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
  },
});
