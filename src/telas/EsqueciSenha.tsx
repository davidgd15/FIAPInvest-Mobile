import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Usuario = {
  id: string;
  email: string;
  nome: string;
  senha?: string;
  confirmSenha?: string;
};

export default function EsqueciSenha() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');

  const STORAGE_KEY = '@usuarios_app';

  const handleVerificar = async () => {
    if (!email.trim()) {
      Alert.alert('Ops!', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const usuariosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (usuariosSalvos) {
        const usuarios: Usuario[] = JSON.parse(usuariosSalvos);
        const usuarioEncontrado = usuarios.find(u => u.email === email);
        
        if (usuarioEncontrado) {
          navigation.navigate('TrazerDados', { 
            email: email
          });
        } else {
          Alert.alert('Ops!', 'E-mail não encontrado');
          navigation.navigate('AddUsers');
        }
      } else {
        Alert.alert('Ops!', 'Nenhum usuário cadastrado');
        navigation.navigate('AddUsers');
      }
    } catch (error) {
      console.error('Ops! ao trazer os dados', error);
      Alert.alert('Ops!', 'Não foi possível verificar o usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu sua senha?</Text>
      <Text style={styles.subtitle}>Altere sua senha</Text>

    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.botao} onPress={handleVerificar}>
        <Text style={styles.textoBotao}>Verificar</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    padding: 20,
  },
title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});