import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "./src/hooks/useAuth";
import LoginScreen from "./src/screens/login-screen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/home-screen";
import { AuthProvider } from "./src/contexts/authContext";
import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "./src/theme/theme";
import RegisterClientScreen from "./src/screens/register-screen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          left: 20,
          right: 20,
          bottom: 20,
          borderRadius: 20,
          shadowRadius: 8,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          margin: 20,
        },
        tabBarLabelStyle:{
          fontSize: theme.fontSize.sm,
          marginBottom: 4,
        },
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Clientes"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Registrar Cliente"
        component={RegisterClientScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="ClientForm"
            component={ClientFormScreen}
            options={{ title: 'Novo/Editar Cliente' }}
          /> */}
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
