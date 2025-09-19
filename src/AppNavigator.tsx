import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddUsers from './telas/AddUsers';
import Users from './telas/Users';
import EsqueciSenha from './telas/EsqueciSenha';
import TrazerDados from './telas/TrazerDados';
import HomeScreen from './telas/HomeScreen';
import TipsScreen from './telas/TipsScreen'; 
import SimulationScreen from './telas/SimulationScreen'; 
import PortfolioScreen from './telas/PortfolioScreen'; 
import { StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type RootStackParamList = {
  Users: undefined;
  AddUsers: undefined;
  EsqueciSenha: undefined;
  TrazerDados: { email: string };
  MainTabs: undefined;
  Auth: undefined;
  AuthCheck: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1a1a2e' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        headerStyle: { backgroundColor: '#1a1a2e' },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'FIAP Invest+',
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />),
          headerShown: false
        }}
      />

      <Tab.Screen name="TipsTab" component={TipsScreen} options={{title: 'Dicas', 
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />),
            headerShown: false
        }}
      />
      <Tab.Screen 
        name="SimulationTab" component={SimulationScreen} options={{title: 'Simulação',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" size={size} color={color} />),
            headerShown: false
        }}
      />
      <Tab.Screen  name="PortfolioTab" component={PortfolioScreen} options={{title: 'Carteira',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />),
            headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack.Navigator initialRouteName="Users">
        <Stack.Screen name="Users" component={Users} options={{headerShown: false}} />
        <Stack.Screen name="AddUsers" component={AddUsers} options={{headerShown: false}} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{title: 'Esqueci minha senha'}} />
        <Stack.Screen name="TrazerDados" component={TrazerDados} options={{headerShown: false}}/>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown: false}}/>
      </Stack.Navigator>
    </>
  );
}