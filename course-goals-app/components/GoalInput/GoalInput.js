import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Modal,
} from 'react-native';

export default function GoalInput(props) {
  const [Model, setModel] = useState('');

  const changeValueFieldHandler = text => {
    setModel(text);
  };

  const addGoal = () => {
    props.addItemHandler(Model);
    clearModel();
  };

  const clearModel = () => {
    setModel();
  };

  return (
    <Modal visible={props.show} animationType="slide">
      <View style={styles.containerField}>
        <TextInput
          placeholder="Course Goal"
          style={styles.textFieldStyle}
          value={Model}
          onChangeText={changeValueFieldHandler}
        />
        <View style={styles.containerActions}>
          <TouchableOpacity style={styles.buttonAdd} onPress={addGoal}>
            <Text style={styles.whiteText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => {
              clearModel();
              props.cancelHandler();
            }}>
            <Text style={styles.whiteText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textFieldStyle: {
    color: '#40414f',
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 12,
  },
  containerField: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    color: 'white',
  },
  containerActions: {
    marginTop: 10,
    flexDirection: 'row',
  },
  buttonAdd: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#3778b4',
  },
  buttonCancel: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#e94c3d',
  },
});
