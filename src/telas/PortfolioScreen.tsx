import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';

type AssetType = {
  id: string;
  name: string;
  type: string;
  duration: string;
  rateType: string;
  value: number;
};

const generateId = () => Math.random().toString(36).substring(2, 10);

const PortfolioScreen = () => {
  const [profile, setProfile] = useState<string>('Moderado');
  const [tempProfile, setTempProfile] = useState<string>('');

  const [assets, setAssets] = useState<AssetType[]>([
    { id: '1', name: 'CDB', type: 'Renda Fixa', duration: '2 anos', rateType: 'pré', value: 1000 },
    { id: '2', name: 'LCA', type: 'Renda Fixa', duration: '1 ano', rateType: 'pós', value: 500 },
    { id: '3', name: 'Ação XPTO', type: 'Renda Variável', duration: 'indeterminado', rateType: 'n/a', value: 1500 },
  ]);

  const [newAsset, setNewAsset] = useState<Omit<AssetType, 'id'>>({
    name: '',
    type: 'Renda Fixa',
    duration: '',
    rateType: 'pré',
    value: 0,
  });

  const addAsset = () => {
    if (newAsset.name && newAsset.duration && newAsset.value > 0) {
      const newId = generateId();
      setAssets([...assets, { ...newAsset, id: newId }]);
      setNewAsset({
        name: '',
        type: 'Renda Fixa',
        duration: '',
        rateType: 'pré',
        value: 0,
      });
    }
  };

  const updateProfile = () => {
    if (tempProfile) {
      setProfile(tempProfile);
      setTempProfile('');
    }
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const rendaFixaTotal = assets
    .filter(asset => asset.type.toLowerCase() === 'renda fixa')
    .reduce((sum, asset) => sum + asset.value, 0);

  const rendaFixaPercent = totalValue > 0 ? (rendaFixaTotal / totalValue) * 100 : 0;

  let alinhamento = '';
  if (profile.toLowerCase() === 'conservador' && rendaFixaPercent >= 80) {
    alinhamento = 'Sua carteira está alinhada com seu perfil, pois possui uma grande parte (acima de 80%) em Renda Fixa.';
  } else if (profile.toLowerCase() === 'moderado' && rendaFixaPercent >= 50 && rendaFixaPercent < 80) {
    alinhamento = 'Sua carteira está alinhada com seu perfil, pois possui aproximadamente metade dos investimentos em Renda Fixa.';
  } else if (profile.toLowerCase() === 'agressivo' && rendaFixaPercent < 50) {
    alinhamento = 'Sua carteira está alinhada com seu perfil, pois está majoritariamente composta por ativos de maior risco.';
  } else {
    alinhamento = 'Sua carteira não está alinhada com seu perfil de investidor. Considere revisar seus investimentos.';
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.devBanner}>
          <Text style={styles.devBannerText}>ABA NÃO DISPONÍVEL</Text>
          <Text style={styles.devBannerText}>INTEGRAÇÃO COM IA EM DESENVOLVIMENTO</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seu Perfil de Investidor</Text>
          <Text style={styles.currentProfile}>Atual: {profile}</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Novo perfil (ex: Conservador)"
              value={tempProfile}
              onChangeText={setTempProfile}
            />
            <TouchableOpacity style={styles.saveButton} onPress={updateProfile}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sua Carteira</Text>
          {assets.map(asset => (
            <View key={asset.id} style={styles.assetCard}>
              <Text style={styles.assetName}>
                {asset.name} {asset.duration} ({asset.rateType})
              </Text>
              <Text style={styles.assetType}>{asset.type}</Text>
              <Text style={styles.assetAllocation}>
                Valor: R$ {asset.value.toFixed(2)}
              </Text>
            </View>
          ))}
          <Text style={styles.totalText}>Valor Total: R$ {totalValue.toFixed(2)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adicionar Investimento</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome (ex: CDB, LCA)"
            value={newAsset.name}
            onChangeText={text => setNewAsset({ ...newAsset, name: text })}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Prazo (ex: 2 anos)"
              value={newAsset.duration}
              onChangeText={text => setNewAsset({ ...newAsset, duration: text })}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Valor R$"
              keyboardType="numeric"
              value={newAsset.value.toString()}
              onChangeText={text => setNewAsset({ ...newAsset, value: Number(text) || 0 })}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addAsset}>
            <Text style={styles.addButtonText}>+ Adicionar à Carteira</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Análise da Carteira</Text>
          <Text style={styles.alignmentText}>Renda Fixa: {rendaFixaPercent.toFixed(1)}%</Text>
          <Text style={styles.resultText}>{alinhamento}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingTop: 20,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  devBanner: {
    backgroundColor: '#ff9800',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  devBannerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  currentProfile: {
    fontSize: 16,
    color: '#3498db',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  halfInput: {
    flex: 0.48,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  assetCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  assetType: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  assetAllocation: {
    fontSize: 14,
    color: '#27ae60',
    marginTop: 4,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
    textAlign: 'right',
  },
  addButton: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alignmentText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
});

export default PortfolioScreen;
