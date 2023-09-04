import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//firebase
import { db } from "./firebase";
import { collection, setDoc, deleteDoc, onSnapshot, doc} from "firebase/firestore";

//import todo screen
import TodoScreen from "./screens/TodoScreen";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      alert("Welcome back: ", email);

      
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("User registered successfully");

      const uid = response.user.uid;
      const usersCollectionRef = collection(db, "users"); //create collection named users in database
      const usersDocsRef = doc(usersCollectionRef, uid); //create document named uid in users collection
      const usersTodosSubCollectionRef = collection(usersDocsRef, "todos");
      //delete this line
      const todoRef = doc(usersTodosSubCollectionRef, "todo's key"); 

      await setDoc(usersDocsRef, {
        email,
        uid,
      });
      await setDoc(todoRef, {
        text: "test",
        key: Date.now(),
      });

    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="email"
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        value={password}
        style={styles.input}
        placeholder="password"
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "white" }]}
        onPress={register}
      >
        <Text style={[styles.buttonText, { color: "pink" }]}>Register</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const HomeScreen = ({ navigation }) => {

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title = "Todo List" onPress={() => navigation.navigate('todo')}/>
      <Button title = "sign out" onPress={() => auth.signOut()}/>
    </View>
  );
};

const ContentScreen = () => {
  return (
    <View>
      <Text>content Screen</Text>
    </View>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!user ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
        )}
        <Stack.Screen
          name="todo"
          component={TodoScreen}
          options={{ title: "todo" }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
