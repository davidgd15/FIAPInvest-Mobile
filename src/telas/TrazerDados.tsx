import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../AppNavigator';

type Usuario = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  confirmSenha: string;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TrazerDados'>;
type TrazerDadosRouteProp = RouteProp<RootStackParamList, 'TrazerDados'>;

const STORAGE_KEY = '@usuarios_app';

export default function TrazerDados() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TrazerDadosRouteProp>();
  
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const email = route.params?.email;

  useEffect(() => {
    if (email) {
      carregarUsuarioPorEmail(email);
    }
  }, [email]);

  const carregarUsuarioPorEmail = async (emailParaBuscar: string) => {
    try {
      const usuariosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      if (usuariosSalvos) {
        const todosUsuarios: Usuario[] = JSON.parse(usuariosSalvos);
        const usuarioEncontrado = todosUsuarios.find(u => u.email === emailParaBuscar);
        
        if (usuarioEncontrado) {
          setUsuario(usuarioEncontrado);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  const handleConfirmar = async () => {
    if (!usuario) return;
    
    if (senha !== confirmSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const usuariosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
      if (usuariosSalvos) {
        const todosUsuarios: Usuario[] = JSON.parse(usuariosSalvos);
        
        const usuariosAtualizados = todosUsuarios.map(u => 
          u.email === email ? { ...u, senha: senha, confirmSenha: senha } : u
        );

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(usuariosAtualizados));
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        navigation.navigate('Users');
      }
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      Alert.alert('Erro', 'Não foi possível alterar a senha');
    }
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Alterar Senha</Text>
        
        <View style={styles.card}>
          <View style={styles.infoUsuario}>
            <Text style={styles.nome}>Olá {usuario.nome}!</Text>
            <Text style={styles.textSenha}>Crie uma nova senha</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nova senha"
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
          </View>
        </View>

        <TouchableOpacity style={styles.botao} onPress={handleConfirmar}>
          <Text style={styles.textoBotao}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#B0C4DE',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    minHeight: '100%', // Garante que ocupe toda a altura
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d47a1',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  infoUsuario: {
    flex: 1,
  },
  nome: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333', // Cor do texto digitado
  },
  textSenha: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  botao: {
    backgroundColor: '#0d47a1',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});