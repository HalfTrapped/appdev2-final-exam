import { ConvexProvider, ConvexReactClient } from "convex/react";
import TodoScreen from "./screens/TodoScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Id } from "./convex/_generated/dataModel";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function App() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null)

  return (
    <ConvexProvider client={convex}>
      {userId ? (
        <TodoScreen userId={userId} />
      ) : (
        <LoginScreen onLogin={(id: Id<"users">) => setUserId(id)} />
      )}
    </ConvexProvider>
  );
}

//Initial Commit
