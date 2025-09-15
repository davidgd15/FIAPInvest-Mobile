import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Users from './Users';
import { RootStackParamList } from '../AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Menu() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.sair}>Sair</Text>
      <Text style={styles.title}>Seja bem-vindo(a)!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sair:{
    flex: 1,
    borderColor: '#fff',

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor:'#B0C4DE',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#0d47a1',
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 8,
  },
});