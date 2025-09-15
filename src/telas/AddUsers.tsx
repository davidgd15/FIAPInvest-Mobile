import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


type Usuario = {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  senha:string;
  confirmSenha:string;
};

const STORAGE_KEY = '@usuarios_app';

export default function AddUsers() {
  const navigation = useNavigation<NavigationProp>();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const handleSalvar = async () => {
    if (!nome.trim() || !sobrenome.trim() || !email.trim() || !senha.trim() || !confirmSenha.trim() ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if(senha != confirmSenha){
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const usuariosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      let usuarios: Usuario[] = [];
      
      if (usuariosSalvos) {
        usuarios = JSON.parse(usuariosSalvos);
        const emailExistente = usuarios.find(u => u.email === email);
        
        if (emailExistente) {
          Alert.alert('Erro', 'Este e-mail já está cadastrado');
          return;
        }
      }

      const novoUsuario: Usuario = {
        id: Date.now().toString(),
        nome,
        sobrenome,
        email,
        senha,
        confirmSenha,
      };

      usuarios.push(novoUsuario);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
      
       Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!', [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('Users')
        }
      ]);

    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      Alert.alert('Erro', 'Não foi possível salvar o usuário');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Criar Usuário</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
        placeholderTextColor="#999"
      />
      
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
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor="#999"
        secureTextEntry
      />
    
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmSenha}
        onChangeText={setConfirmSenha}
        placeholderTextColor="#999"
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botaoSecundario} 
        onPress={() => navigation.navigate('Users')}
      >
        <Text style={styles.textoBotaoSecundario}>Já tenho uma conta</Text>
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
});