import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Animated
} from 'react-native';

type TipItem = {
  id: string;
  title: string;
  content: React.ReactNode;
  currentRates?: string;
};

const TipsScreen = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tipsData: TipItem[] = [
    {
      id: '1',
      title: 'Taxas de Investimento',
      currentRates: 'CDI: 13,65% a.a. | Selic: 13,75% a.a.',
      content: (
        <>
          <Text style={styles.subtitle}>Principais taxas do mercado:</Text>
          <Text style={styles.topic}>• CDI (Certificado de Depósito Interbancário)</Text>
          <Text style={styles.text}>Taxa usada em empréstimos entre bancos. Referência para muitos investimentos em Renda Fixa.</Text>
          
          <Text style={styles.topic}>• Selic</Text>
          <Text style={styles.text}>Taxa básica de juros da economia, definida pelo Copom. Influencia todas as outras taxas.</Text>
          
          <Text style={styles.topic}>• IPCA</Text>
          <Text style={styles.text}>Índice oficial de inflação. Investimentos atrelados a ele protegem contra a inflação.</Text>
          
          <Text style={styles.topic}>• Taxa Over</Text>
          <Text style={styles.text}>Taxa usada em operações de curtíssimo prazo, geralmente um percentual do CDI.</Text>
        </>
      )
    },
    {
      id: '2',
      title: 'Tesouro Direto',
      currentRates: 'Tesouro Selic 2026: 13,45% a.a.',
      content: (
        <>
          <Text style={styles.subtitle}>O que é:</Text>
          <Text style={styles.text}>Programa do governo federal que permite a compra de títulos públicos por pessoas físicas.</Text>
          
          <Text style={styles.subtitle}>Como funciona:</Text>
          <Text style={styles.text}>Você empresta dinheiro ao governo e recebe juros em troca. Pode resgatar antes do vencimento (com marcação a mercado).</Text>
          
          <Text style={styles.subtitle}>Tipos de títulos:</Text>
          <Text style={styles.topic}>• Tesouro Selic</Text>
          <Text style={styles.text}>Pós-fixado, acompanha a taxa Selic. Baixo risco.</Text>
          
          <Text style={styles.topic}>• Tesouro IPCA+</Text>
          <Text style={styles.text}>Protege contra inflação (IPCA) + taxa fixa. Ideal para longo prazo.</Text>
          
          <Text style={styles.topic}>• Tesouro Prefixado</Text>
          <Text style={styles.text}>Taxa fixa combinada no momento da compra.</Text>
        </>
      )
    },
    {
      id: '3',
      title: 'CDB (Certificado de Depósito Bancário)',
      currentRates: 'CDB 90 dias: 110% do CDI',
      content: (
        <>
          <Text style={styles.subtitle}>O que é:</Text>
          <Text style={styles.text}>Título emitido por bancos para captar recursos. Equivalente a um empréstimo ao banco.</Text>
          
          <Text style={styles.subtitle}>Como funciona:</Text>
          <Text style={styles.text}>Você aplica seu dinheiro e recebe juros conforme a taxa combinada. Garantido pelo FGC até R$ 250 mil por CPF e instituição.</Text>
          
          <Text style={styles.subtitle}>Tipos:</Text>
          <Text style={styles.topic}>• CDB Pós-fixado</Text>
          <Text style={styles.text}>Rende percentual do CDI (ex: 110% do CDI)</Text>
          
          <Text style={styles.topic}>• CDB Prefixado</Text>
          <Text style={styles.text}>Taxa fixa acordada no momento da aplicação</Text>
          
          <Text style={styles.topic}>• CDB Híbrido</Text>
          <Text style={styles.text}>Combinação com índice de inflação (IPCA + taxa fixa)</Text>
        </>
      )
    },
    {
      id: '4',
      title: 'LCI (Letra de Crédito Imobiliário)',
      currentRates: 'LCI 360 dias: 90% do CDI',
      content: (
        <>
          <Text style={styles.subtitle}>O que é:</Text>
          <Text style={styles.text}>Título emitido por bancos lastreado em créditos imobiliários. Isento de IR para PF.</Text>
          
          <Text style={styles.subtitle}>Como funciona:</Text>
          <Text style={styles.text}>Recursos são direcionados para financiamento imobiliário. Prazo mínimo de 90 dias.</Text>
          
          <Text style={styles.subtitle}>Vantagens:</Text>
          <Text style={styles.text}>• Isenção de Imposto de Renda</Text>
          <Text style={styles.text}>• Garantia do FGC</Text>
          <Text style={styles.text}>• Liquidez diária (em alguns casos)</Text>
        </>
      )
    },
    {
      id: '5',
      title: 'LCA (Letra de Crédito do Agronegócio)',
      currentRates: 'LCA 2 anos: IPCA + 5,5% a.a.',
      content: (
        <>
          <Text style={styles.subtitle}>O que é:</Text>
          <Text style={styles.text}>Similar à LCI, mas com lastro em créditos do agronegócio. Também isento de IR.</Text>
          
          <Text style={styles.subtitle}>Como funciona:</Text>
          <Text style={styles.text}>Financia o setor agrícola. Prazos geralmente mais longos que LCIs.</Text>
          
          <Text style={styles.subtitle}>Diferença para LCI:</Text>
          <Text style={styles.text}>• Lastro no agronegócio</Text>
          <Text style={styles.text}>• Maior volatilidade de taxas</Text>
          <Text style={styles.text}>• Prazos tipicamente maiores</Text>
        </>
      )
    },
    {
      id: '6',
      title: 'Perfil de Investimentos',
      content: (
        <>
          <Text style={styles.subtitle}>O que é:</Text>
          <Text style={styles.text}>Classificação que determina seu grau de tolerância a riscos nos investimentos.</Text>
          
          <Text style={styles.subtitle}>Tipos de perfis:</Text>
          <Text style={styles.topic}>• Conservador</Text>
          <Text style={styles.text}>Prefere segurança, mesmo com retornos menores. Ex: Tesouro Direto, CDBs</Text>
          
          <Text style={styles.topic}>• Moderado</Text>
          <Text style={styles.text}>Equilíbrio entre risco e retorno. Ex: Fundos balanceados, LCIs/LCAs</Text>
          
          <Text style={styles.topic}>• Arrojado</Text>
          <Text style={styles.text}>Aceita riscos por retornos maiores. Ex: Ações, criptomoedas, FIIs</Text>
          
          <Text style={styles.subtitle}>Como definir:</Text>
          <Text style={styles.text}>Analise seu objetivo financeiro, prazo e reação a perdas temporárias.</Text>
        </>
      )
    },
    {
        id: '7',
        title: 'Corretoras de Investimento',
        content: (
          <>
            <Text style={styles.subtitle}>O que são:</Text>
            <Text style={styles.text}>Plataformas que intermediam a compra/venda de ativos financeiros e oferecem ferramentas para investidores.</Text>
            <Text style={styles.subtitle}>Corretora para começar:</Text>
            <Text style={styles.topic}>• XP Investimentos</Text>
            <Text style={styles.text}>- Maior corretora independente</Text>
            <Text style={styles.text}>- Amplo catálogo de produtos</Text>
            <Text style={styles.text}>- Plataforma mais complexa</Text>
          </>
        )
      }


  ];

  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Educação Financeira</Text>
      
      <ScrollView style={styles.scrollContainer}>
        {tipsData.map((item) => (
          <View key={item.id} style={styles.tipCard}>
            <TouchableOpacity 
              style={styles.tipHeader}
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.headerTextContainer}>
                <Text style={styles.title}>{item.title}</Text>
                {item.currentRates && (
                  <Text style={styles.rates}>{item.currentRates}</Text>
                )}
              </View>
              <Text style={styles.arrow}>
                {expandedId === item.id ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>
            
            {expandedId === item.id && (
              <View style={styles.content}>
                {item.content}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 35,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 24,
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  tipCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  tipHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  rates: {
    fontSize: 12,
    color: '#27ae60',
    fontStyle: 'italic',
  },
  arrow: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  content: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 12,
    marginBottom: 8,
  },
  topic: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 6,
  },
  highlightBox: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  highlightText: {
    fontSize: 14,
    color: '#1976d2',
    marginBottom: 5,
    fontWeight: '500',
  },
});

export default TipsScreen;