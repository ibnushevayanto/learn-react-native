import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

export default function GoalItem(props) {
  return (
    <View style={styles.goalsContainer}>
      <FlatList
        data={props.CourseGoals}
        renderItem={(itemData) => (
          <View style={styles.goalItem}>
            <Pressable
              android_ripple={{ color: "#ddd" }}
              onPress={() => props.deleteItemCourseGoalHandler(itemData.index)}
              style={({pressed}) => pressed && styles.pressedItem}
            >
              <Text style={styles.goalText}>{itemData.item}</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  goalText: {
    color: "white",
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5
  },  
  goalItem: {
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalsContainer: {
    flex: 4,
  },
});
