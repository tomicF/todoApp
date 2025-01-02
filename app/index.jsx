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
import { useNavigation } from "@react-navigation/native";

const App = () => {
  const navigation = useNavigation();

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
        <TouchableOpacity onPress={() => navigation.navigate("create")}>
          <AntDesign name="pluscircle" size={50} color="#89A8B2" />
        </TouchableOpacity>
      </View>
      <View style={styles.breakLine}></View>
      {tasks[0].header !== "" && tasks[0].task !== "" ? (
        <ScrollView>
          {tasks.map((group, groupIndex) => (
            <View key={groupIndex}>
              <Text style={styles.groupHeader}>{group.header}</Text>
              {group.tasks.map((task, taskIndex) => (
                <TouchableOpacity
                  key={taskIndex}
                  style={styles.taskCointainer}
                  onPress={() =>
                    toggleTask(groupIndex * group.tasks.length + taskIndex)
                  }
                >
                  <Text style={styles.taskText}>{task}</Text>
                  <View
                    style={[
                      styles.circle,
                      taskStates[
                        groupIndex * group.tasks.length + taskIndex
                      ] && { backgroundColor: "#F1F0E8" },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      ) : null}
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
