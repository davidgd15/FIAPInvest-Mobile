// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddUsers from './telas/AddUsers';
import Menu from './telas/Menu';
import Users from './telas/Users';
import EsqueciSenha from './telas/EsqueciSenha';
import TrazerDados from './telas/TrazerDados';

// Defina o tipo Usuario aqui
type Usuario = {
  id: string;
  email: string;
  nome: string;
  senha?: string;
  confirmSenha?: string;
};

export type RootStackParamList = {
  Users: undefined;
  AddUsers: undefined;
  Menu: undefined;
  EsqueciSenha: undefined;
  TrazerDados: { 
    email: string;
  }; // Remova 'usuario?' para simplificar
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Users">
      <Stack.Screen name="Menu" component={Menu} options={{ title: 'Tela Inicial' }} />
      <Stack.Screen name="AddUsers" component={AddUsers} options={{ title: 'Criar Usuário' }} />
      <Stack.Screen name="Users" component={Users} options={{title: 'Cadastro'}} />
      <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{title: 'Esqueci minha senha'}} />
      <Stack.Screen name="TrazerDados" component={TrazerDados} options={{title:"Mudar Senha"}}/>
    </Stack.Navigator>
  );
}