import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type FactCheck = {
  id: string;
  claim: string;
  verdict: 'true' | 'false' | 'partially-true';
  explanation: string;
  source: string;
  date: string;
};

export function FactCheckResult({ result }: { result: FactCheck }) {
  const getVerdictColor = (verdict: FactCheck['verdict']) => {
    switch (verdict) {
      case 'true':
        return '#22c55e';
      case 'false':
        return '#ef4444';
      case 'partially-true':
        return '#f59e0b';
      default:
        return '#64748b';
    }
  };

  const getVerdictIcon = (verdict: FactCheck['verdict']) => {
    switch (verdict) {
      case 'true':
        return 'checkmark-circle';
      case 'false':
        return 'close-circle';
      case 'partially-true':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.verdictBadge, { backgroundColor: getVerdictColor(result.verdict) }]}>
        <Ionicons 
          name={getVerdictIcon(result.verdict)} 
          size={24} 
          color="#fff" 
        />
        <Text style={styles.verdictText}>
          {result.verdict.charAt(0).toUpperCase() + result.verdict.slice(1).replace('-', ' ')}
        </Text>
      </View>

      <Text style={styles.claim}>{result.claim}</Text>
      <Text style={styles.explanation}>{result.explanation}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.source}>Source: {result.source}</Text>
        <Text style={styles.date}>{result.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  verdictText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  claim: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 16,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  source: {
    fontSize: 14,
    color: '#64748b',
  },
  date: {
    fontSize: 14,
    color: '#94a3b8',
  },
});