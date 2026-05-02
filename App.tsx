import * as React from 'react';
import { useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import TodoScreen from "./screens/TodoScreen";
import { Id } from "./convex/_generated/dataModel";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function App() {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  // 1. Define the stack based on Auth State
  // This uses the Static Configuration object pattern
  const RootStack = createNativeStackNavigator({
    screenOptions: { headerShown: false },
    screens: userId 
      ? {
          // Authenticated Route
          Todo: {
            screen: (props: any) => <TodoScreen {...props} userId={userId} />,
          },
        }
      : {
          // Unauthenticated Routes
          Login: {
            screen: (props: any) => (
              <LoginScreen {...props} onLogin={(id: Id<"users">) => setUserId(id)} />
            ),
          },
          Signup: SignupScreen,
        },
  });

  // 2. Create the Navigation component from the Stack
  const Navigation = createStaticNavigation(RootStack);

  return (
    <ConvexProvider client={convex}>
      <Navigation />
    </ConvexProvider>
  );
}