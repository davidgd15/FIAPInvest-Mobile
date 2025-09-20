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
      console.error('Ops! ao carregar usuário:', error);
    }
  };

  const handleConfirmar = async () => {
    if (!usuario) return;
    
    if (senha !== confirmSenha) {
      Alert.alert('Ops!', 'As senhas não coincidem');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Ops!', 'A senha deve ter pelo menos 6 caracteres');
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
      console.error('Ops! ao atualizar senha:', error);
      Alert.alert('Ops!', 'Não foi possível alterar a senha');
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
        <Text style={styles.title}>Alterar Senha</Text>
        <Text style={styles.subtitle}>Crie uma nova senha</Text>
        
        <View style={styles.formContainer}>
        <View style={styles.card}>
          <View style={styles.infoUsuario}>
            <Text style={styles.nome}>Olá, {usuario.nome}!</Text>
            
            
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor:'#1a1a2e',
  },
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    marginBottom: 25,
  },
  infoUsuario: {
    flex: 1,
  },
  nome: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 15,
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
    borderColor: '#999',
    borderWidth: 1,
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  botao: {
    backgroundColor: '#3498db',
    borderRadius: 12,
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