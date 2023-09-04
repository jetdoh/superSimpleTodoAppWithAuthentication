import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

//connect to firebase
import { db, auth } from "../firebase";
import { collection, setDoc, deleteDoc, onSnapshot, doc} from "firebase/firestore";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [loading, setLoading] = useState(true);
  
  //get uid
  const uid = auth.currentUser.uid;
  const usersCollectionRef = collection(db, "users"); //create collection named users in database
  const usersDocsRef = doc(usersCollectionRef, uid); //create document named uid in users collection
  const usersTodosSubCollectionRef = collection(usersDocsRef, "todos");

  useEffect(() => {
    onSnapshot(usersTodosSubCollectionRef, {
        next: (querySnapshot) => {
        const todos = [];
        querySnapshot.docs.forEach((doc) => {
            todos.push({
                id: doc.id,
                ...doc.data(),
            })
        })
        setTodos(todos);
    }}); 

  },[]);


  const addTodo = async () => {
    const todoRef = doc(usersTodosSubCollectionRef, todo.key.toString());

    await setDoc(todoRef, todo).then(() => {
    setTodo({
        text: '',
        key: Date.now()
    });
  });
  };


  const deleteTodo = async (key) => {
    const todoRef = doc(usersTodosSubCollectionRef, key.toString());
    await deleteDoc(todoRef);
};

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={todo.text}
        style={styles.input}
        placeholder="add your todo"
        onChangeText={(text) => setTodo({text: text, key: Date.now()})}
      />
      <Button title="add todo" onPress={addTodo} />
      {todos.map((todo) => (
        <TouchableOpacity key={todo.key} onPress={() => {deleteTodo(todo.key)}}>
          <Text>{todo.text}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 40,
    justifyContent: "flex-start",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
