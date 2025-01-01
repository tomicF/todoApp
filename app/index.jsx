import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { tasks } from "../assets/tasks";
import AntDesign from "@expo/vector-icons/AntDesign";

const App = () => {
  // Initialize state as an array of booleans for each task
  const [taskStates, setTaskStates] = useState(() =>
    tasks.flatMap((group) => group.tasks.map(() => false))
  );

  const toggleTask = (index) => {
    setTaskStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>TO DO: </Text>
        <TouchableOpacity>
          <AntDesign name="pluscircle" size={50} color="#89A8B2" />
        </TouchableOpacity>
      </View>
      <View style={styles.breakLine}></View>
      <ScrollView style={{ width: "100%" }}>
        {tasks.map((taskGroup, groupIndex) => (
          <View key={groupIndex}>
            <Text style={styles.groupHeader}>{taskGroup.header}</Text>
            {taskGroup.tasks.map((task, taskIndex) => {
              // Calculate the flat index for the current task
              const flatIndex =
                tasks.slice(0, groupIndex).flatMap((group) => group.tasks)
                  .length + taskIndex;

              return (
                <TouchableOpacity
                  key={flatIndex}
                  style={styles.taskCointainer}
                  onPress={() => toggleTask(flatIndex)}
                >
                  <Text style={styles.taskText}>{task}</Text>
                  <View
                    style={[
                      styles.circle,
                      taskStates[flatIndex] && { backgroundColor: "#ADD8E6" },
                    ]}
                  ></View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E8",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 30,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    color: "#89A8B2",
    fontWeight: "900",
  },
  groupHeader: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 30,
    color: "#89A8B2",
    fontWeight: "900",
  },
  taskCointainer: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#B3C8CF",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 40,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 20,
    color: "#F1F0E8",
    marginLeft: 10,
  },
  circle: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderColor: "#F1F0E8",
    borderWidth: 3,
    borderRadius: 10,
  },
  breakLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#89A8B2",
    marginTop: 10,
  },
});
