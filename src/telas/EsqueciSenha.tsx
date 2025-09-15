// EsqueciSenha.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// REMOVA esta duplicação - já está definido no AppNavigator
// export type RootStackParamList = {
//   EsqueciSenha: undefined;
//   TrazerDados: { 
//     email: string;
//     usuario: Usuario;
//   };
//   AddUsers: undefined;
// };

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
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const usuariosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (usuariosSalvos) {
        const usuarios: Usuario[] = JSON.parse(usuariosSalvos);
        const usuarioEncontrado = usuarios.find(u => u.email === email);
        
        if (usuarioEncontrado) {
          navigation.navigate('TrazerDados', { 
            email: email // Apenas o email é necessário
          });
        } else {
          Alert.alert('Erro', 'E-mail não encontrado');
          navigation.navigate('AddUsers');
        }
      } else {
        Alert.alert('Erro', 'Nenhum usuário cadastrado');
        navigation.navigate('AddUsers');
      }
    } catch (error) {
      console.error('Erro ao trazer os dados', error);
      Alert.alert('Erro', 'Não foi possível verificar o usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Esqueceu sua senha?</Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#B0C4DE',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d47a1',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  botao: {
    backgroundColor: '#0d47a1',
    borderRadius: 8,
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