import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Usuario = {
  id: string;
  email: string;
  senha:string;
};

const STORAGE_KEY = '@usuarios_app';

export default function Users() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEntrar = async () => {
    if (!email.trim() || !senha.trim() ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
       const usuariosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

      if (!usuariosSalvos) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado');
        return;
      }

      const usuarios: Usuario[] = JSON.parse(usuariosSalvos);
      const usuario = usuarios.find(u => u.email === email && u.senha === senha);

      if (usuario) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Menu') }
        ]);
      } else {
        Alert.alert('Erro', 'E-mail ou senha incorretos');
      }

       } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Não foi possível fazer login');
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.titulo}> FIAPCoin</Text>
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input2}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor="#999"
        secureTextEntry
      />

      <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')}>
        <Text style={styles.textoEsqueci}>Esqueci minha senha</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.botao} onPress={handleEntrar}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

       <TouchableOpacity 
        style={styles.botaoSecundario} 
        onPress={() => navigation.navigate('AddUsers')}
      >
        <Text style={styles.textoBotaoSecundario}>Criar nova conta</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0C4DE',
    padding: 20,
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
  input2: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 2,
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
  botaoSecundario: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#0d47a1',
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoBotaoSecundario: {
    color: '#0d47a1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoEsqueci:{
    color: '#0d47a1',
    fontSize: 12,
    marginLeft: 2,
  },
});