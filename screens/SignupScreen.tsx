import { useState } from "react";
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
// 1. Import Convex hooks and your API
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function SignupScreen() {
  // 2. Add State with Types
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 3. Define the Convex Mutation hook
  const registerUser = useMutation(api.users.register);

  const handleSignup = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const result = await registerUser({ username, password });
      
      // Based on your users.ts logic
      if (typeof result === "object" && result.success === false) {
        Alert.alert("Signup Failed", result.message);
      } else {
        Alert.alert("Success", "Account created!");
        // Navigate to Login or Home here
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong during signup");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/signup.webp")}
          style={styles.image}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="John Doe" 
          value={username}
          onChangeText={setUsername} // 4. Bind state
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="********"  
          secureTextEntry  
          value={password}
          onChangeText={setPassword} // 4. Bind state
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Rest of your UI... */}
        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ... your styles stay exactly the same