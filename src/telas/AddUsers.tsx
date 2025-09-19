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

    if (!email.includes('@') || !email.endsWith('.com')) {
        Alert.alert('Erro', 'Digite um e-mail válido (deve conter "@" e terminar com ".com")');
        return;
    }

    if (senha.length < 6) {
          Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
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
        { text: 'OK', onPress: () => navigation.navigate('Users') }
      ]);

    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      Alert.alert('Erro', 'Não foi possível salvar o usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FIAP Invest+</Text>
      <Text style={styles.subtitle}>Criar Usuário</Text>
      
      <View style={styles.formContainer}>
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

      <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.navigate('Users')}>
        <Text style={styles.textoBotaoSecundario}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
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
    backgroundColor: 'white',
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
  botaoSecundario: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoBotaoSecundario: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
});