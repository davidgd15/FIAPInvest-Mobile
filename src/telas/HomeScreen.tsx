import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  MainTabs: undefined;
  Users: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      navigation.navigate('Users');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>FIAP Invest+</Text>
        <Text style={styles.subtitle}>Seu futuro financeiro começa aqui</Text>
      </View>

      <View style={styles.resumoContainer}>
        <Text style={styles.resumoTitulo}>Nossas Funcionalidades:</Text>
        
        <View style={styles.resumoItem}>
          <Text style={styles.resumoIcon}>📚</Text>
          <View style={styles.resumoTextoContainer}>
            <Text style={styles.resumoSubtitulo}>Dicas de Investimento</Text>
            <Text style={styles.resumoDescricao}>Aprenda os conceitos básicos e avançados do mundo dos investimentos</Text>
          </View>
        </View>

        <View style={styles.resumoItem}>
          <Text style={styles.resumoIcon}>📊</Text>
          <View style={styles.resumoTextoContainer}>
            <Text style={styles.resumoSubtitulo}>Simulação de Investimentos</Text>
            <Text style={styles.resumoDescricao}>Projeções e cenários para você planejar seus investimentos</Text>
          </View>
        </View>

        <View style={styles.resumoItem}>
          <Text style={styles.resumoIcon}>💼</Text>
          <View style={styles.resumoTextoContainer}>
            <Text style={styles.resumoSubtitulo}>Análise de Carteira</Text>
            <Text style={styles.resumoDescricao}>Otimize e acompanhe o desempenho dos seus ativos</Text>
          </View>
        </View>
      </View>

      <Text style={styles.footer}>Versão 2.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    justifyContent: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 1,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    height: 100,
    borderRadius: 16,
    marginBottom: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  tipsButton: {
    backgroundColor: '#6a11cb',
    borderLeftWidth: 6,
    borderLeftColor: '#8a2be2',
  },
  simulationButton: {
    backgroundColor: '#6a11cb',
    borderLeftWidth: 6,
    borderLeftColor: '#96c93d',
  },
  portfolioButton: {
    backgroundColor: '#6a11cb',
    borderLeftWidth: 6,
    borderLeftColor: '#ff4b2b',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    alignSelf: 'center',
  },
  resumoContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resumoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  resumoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
  },
  resumoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  resumoTextoContainer: {
    flex: 1,
  },
  resumoSubtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  resumoDescricao: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 16,
  },
});

export default HomeScreen;