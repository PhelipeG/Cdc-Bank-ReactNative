import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList, TabParamList } from './src/@types/navigation';
import { AuthProvider } from './src/contexts/authContext';
import { ClientsProvider } from './src/contexts/clientContext';
import { useAuth } from './src/hooks/useAuth';
import EditClientScreen from './src/screens/edit-client-screen';
import HomeScreen from './src/screens/home-screen';
import LoginScreen from './src/screens/login-screen';
import RegisterClientScreen from './src/screens/register-screen';
import TransferScreen from './src/screens/transfer-screen';
import { theme } from './src/theme/theme';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          position: 'absolute',
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
        tabBarLabelStyle: {
          color: theme.colors.textLight,
          fontSize: theme.fontSize.sm,
          marginBottom: 4,
        },
        tabBarActiveTintColor: theme.colors.textLight,
        tabBarInactiveTintColor: theme.colors.secondary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Clients"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="people" size={24} color={color} />,
          tabBarLabel: 'Clientes',
        }}
      />
      <Tab.Screen
        name="RegisterClients"
        component={RegisterClientScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="person-add" size={24} color={color} />,
          tabBarLabel: 'Registrar Cliente',
        }}
      />
      <Tab.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="swap-horiz" size={24} color={color} />,
          tabBarLabel: 'Transferir',
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
          <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
          <Stack.Screen
            name="EditClient"
            component={EditClientScreen}
            options={{ headerShown: false, presentation: 'modal' }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ClientsProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ClientsProvider>
    </AuthProvider>
  );
}
