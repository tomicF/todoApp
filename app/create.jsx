import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { tasks } from "../assets/tasks";
import { useNavigation } from "@react-navigation/native";
let i = 0;

const Create = () => {
  const [header, setHeader] = useState("");
  const [taskNew, setTaskNew] = useState("");
  const [tasksNew, setTasksNew] = useState([]);
  const navigation = useNavigation();

  const handleAddTaskNew = () => {
    if (taskNew.trim() !== "") {
      setTasksNew([...tasksNew, taskNew]);
      setTaskNew("");
    }
  };

  const handleSubmit = () => {
    console.log("Header:", header);
    console.log("TasksNew:", tasksNew);

    const newGroup = {
      header: header,
      tasks: tasksNew,
    };
    if (i === 0) {
      tasks[0].header = header;
      tasks[0].tasks = tasksNew;
    } else {
      tasks.push(newGroup);
    }

    tasks.forEach((group) => {
      console.log("Group Header:", group.header);
      console.log("Group Tasks:", group.tasks);
    });
    i++;
    navigation.navigate("index");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.textAbove}>HEADER:</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Header"
          value={header}
          onChangeText={setHeader}
        />
        <Text style={styles.textAbove}>TASKS:</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Add a task"
          value={taskNew}
          onChangeText={setTaskNew}
        />
        <TouchableOpacity onPress={handleAddTaskNew} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>

        {/* Display the added tasks */}
        {tasksNew.map((taskItem, index) => (
          <Text key={index} style={styles.taskItem}>
            {index + 1}. {taskItem}
          </Text>
        ))}

        {/* Submit button */}
        <TouchableOpacity
          disabled={header.trim() === "" || tasksNew.length === 0}
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  box: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButton: {
    marginTop: 20,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#89A8B2",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: 20,
    color: "#F1F0E8",
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 10,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputBox: {
    width: "100%",
    height: 50,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: "#89A8B2",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  textAbove: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#89A8B2",
  },
  taskItem: {
    fontSize: 16,
    marginTop: 5,
    color: "#333",
  },
});
