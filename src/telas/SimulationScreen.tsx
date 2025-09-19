import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Alert } from 'react-native';

type RateType = 'pós' | 'pré' | 'IPCA';
type InvestmentType = 'CDB' | 'LCI' | 'LCA' | 'Tesouro Direto' | 'Fundos DI' | 'Debêntures';

const SimulationScreen = () => {
  const [investmentType, setInvestmentType] = useState<InvestmentType>('CDB');
  const [rateType, setRateType] = useState<RateType>('pós');
  const [indexType, setIndexType] = useState<string>('CDI');
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('12');
  const [rate, setRate] = useState('100');
  const [result, setResult] = useState<number | null>(null);

  const investmentTypes: InvestmentType[] = [
    'CDB', 'LCI', 'LCA', 'Tesouro Direto', 'Fundos DI', 'Debêntures'
  ];

  const handleRateChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9.]/g, '');
    setRate(cleanedText);
  };

  const calculateInvestment = () => {
    const principal = parseFloat(amount) || 0;
    const time = parseInt(term) || 0;
    const percentage = parseFloat(rate) || 0;

    if (principal <= 0 || time <= 0) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos com valores válidos');
        return;
    }
    
    if (principal <= 0 || time <= 0) return;

    let earnings = 0;
    const monthlyRate = time / 12;

    if (rateType === 'pós') {
      // Supondo CDI em 13.65% a.a. ou Selic
      const baseRate = indexType === 'CDI' ? 13.65 : 13.75;
      earnings = principal * Math.pow(1 + (baseRate * (percentage/100))/100, monthlyRate);
    } else if (rateType === 'pré') {
      earnings = principal * Math.pow(1 + percentage/100, monthlyRate);
    } else { // IPCA
      const ipcaRate = 5; // Supondo IPCA em 5%
      earnings = principal * Math.pow(1 + (ipcaRate + percentage)/100, monthlyRate);
    }
    
    setResult(earnings - principal);
  };

  const renderRateInput = () => {
    switch (rateType) {
      case 'pós':
        return (
          <>
            <Text style={styles.label}>Percentual do Indexador</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={indexType}
                onValueChange={(itemValue) => setIndexType(itemValue)}>
                <Picker.Item label="CDI" value="CDI" />
                <Picker.Item label="Selic" value="Selic" />
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={rate}
                onChangeText={handleRateChange}
                placeholder={`Ex: 100 (do ${indexType})`}
                keyboardType="numeric"
              />
              <Text style={styles.percentSymbol}>%</Text>
              <Text style={styles.rateInfo}>do {indexType}</Text>
            </View>
          </>
        );
      
      case 'pré':
        return (
          <>
            <Text style={styles.label}>Taxa Anual Pré-fixada</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={rate}
                onChangeText={handleRateChange}
                placeholder="Ex: 12.5"
                keyboardType="numeric"
              />
              <Text style={styles.percentSymbol}>%</Text>
              <Text style={styles.rateInfo}>a.a.</Text>
            </View>
          </>
        );

      case 'IPCA':
        return (
          <>
            <Text style={styles.label}>Taxa IPCA+</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={rate}
                onChangeText={handleRateChange}
                placeholder="Ex: 5.5"
                keyboardType="numeric"
              />
              <Text style={styles.percentSymbol}>%</Text>
              <Text style={styles.rateInfo}>+ IPCA</Text>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Simulação de Investimentos</Text>
      
      {/* Card de seleção */}
      <View style={styles.card}>
        <Text style={styles.label}>Tipo de Investimento</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={investmentType}
            onValueChange={(itemValue) => setInvestmentType(itemValue as InvestmentType)}>
            {investmentTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Tipo de Taxa</Text>
        <View style={styles.rateTypeContainer}>
          <TouchableOpacity
            style={[styles.rateTypeButton, rateType === 'pós' && styles.activeButton]}
            onPress={() => setRateType('pós')}>
            <Text style={rateType === 'pós' ? styles.activeButtonText : styles.buttonText}>Pós-fixada</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.rateTypeButton, rateType === 'pré' && styles.activeButton]}
            onPress={() => setRateType('pré')}>
            <Text style={rateType === 'pré' ? styles.activeButtonText : styles.buttonText}>Pré-fixada</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.rateTypeButton, rateType === 'IPCA' && styles.activeButton]}
            onPress={() => setRateType('IPCA')}>
            <Text style={rateType === 'IPCA' ? styles.activeButtonText : styles.buttonText}>IPCA+</Text>
          </TouchableOpacity>
        </View>

        {renderRateInput()}
      </View>

      {/* Card de valor e prazo */}
      <View style={styles.card}>
        <Text style={styles.label}>Valor Investido (R$)</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.currencySymbol}>R$</Text>
          <TextInput
            style={[styles.input, styles.amountInput]}
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
            placeholder="Ex: 5000"
          />
        </View>

        <Text style={styles.label}>Prazo (meses)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={term}
          onChangeText={(text) => setTerm(text.replace(/[^0-9]/g, ''))}
          placeholder="Ex: 12"
        />
      </View>

      {/* Botão de calcular */}
      <TouchableOpacity 
        style={styles.calculateButton}
        onPress={calculateInvestment}>
        <Text style={styles.calculateButtonText}>Simular Investimento</Text>
      </TouchableOpacity>

      {/* Resultado */}
      {result !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Projeção de Rendimento</Text>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Valor Investido:</Text>
            <Text style={styles.resultValue}>R$ {parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Rendimento:</Text>
            <Text style={[styles.resultValue, {color: '#2ecc71'}]}>
              + R$ {result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total Bruto:</Text>
            <Text style={styles.resultValue}>
              R$ {(parseFloat(amount) + result).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
          </View>
          
          <Text style={styles.disclaimer}>
            * Valores aproximados. Não consideram taxas nem impostos.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingTop: 20,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
    fontWeight: '500',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    backgroundColor: '#fff',
  },
  rateTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rateTypeButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  amountInput: {
    flex: 1,
    marginLeft: 8,
  },
  percentSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
    marginLeft: 8,
    marginRight: 8,
  },
  rateInfo: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  calculateButton: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  disclaimer: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default SimulationScreen;