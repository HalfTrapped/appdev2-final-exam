import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const SignupScreen = () => {
  // 1. Initialize Navigation
  const navigation = useNavigation();

  // 2. Setup State for Convex (Matches your new Schema)
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState(""); // Email field in UI maps to username in your schema
  const [password, setPassword] = useState("");

  // 3. Convex Mutation Hook
  const registerUser = useMutation(api.users.register);

  const handleSignup = async () => {
    if (!fullname || !username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await registerUser({ fullname, username, password });
      Alert.alert("Success", "Account created! Please log in.");
      navigation.navigate("Login" as never); // Navigate back to login
    } catch (error) {
      console.error(error);
      Alert.alert("Signup Failed", "That username might already be taken.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./../assets/signup.webp")}
          style={styles.illustration}
        />
      </View>

      <View style={styles.formContainer}>
        {/* Full Name Input - Added for your Exam Requirement */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="John Doe" 
          value={fullname}
          onChangeText={setFullname}
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput 
          style={styles.input} 
          placeholder="john@gmail.com" 
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="********"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-google" size={30} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-apple" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Ionicons name="logo-facebook" size={30} color="#4267B2" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          {/* FIX: Added navigation.navigate here */}
          <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
            <Text style={styles.linkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ... (Your styles remain exactly the same)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7D7AFF",
    paddingTop: 40,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "60%",
    height: "70%",
  },
  formContainer: {
    flex: 3,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 30,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#FFCC00",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  socialIcon: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  linkText: {
    color: "#FFCC00",
    fontWeight: "bold",
  },
});

export default SignupScreen;