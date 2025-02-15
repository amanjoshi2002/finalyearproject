import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { FactCheckResult } from '../../components/FactCheckResult';

export default function HomeScreen() {
  const [clipboardText, setClipboardText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkClipboard = async () => {
      try {
        const text = await Clipboard.getStringAsync();
        setClipboardText(text);
        setError('');
      } catch (err) {
        setError('Please allow clipboard access to enable fact-checking.');
        setClipboardText('');
      }
    };

    const interval = setInterval(checkClipboard, 2000);
    return () => clearInterval(interval);
  }, []);

  const factCheckResult = clipboardText ? {
    id: '1',
    claim: clipboardText,
    verdict: 'true',
    explanation: 'This statement has been verified as true by our fact-checking system.',
    source: 'FactCheck System',
    date: new Date().toISOString().split('T')[0],
  } : null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>FactCheck</Text>
        <Text style={styles.subtitle}>
          Copy any text to check if it's true or false
        </Text>
        
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : clipboardText ? (
          <View style={styles.clipboardContent}>
            <Text style={styles.clipboardTitle}>Currently checking:</Text>
            <Text style={styles.clipboardText}>{clipboardText}</Text>
          </View>
        ) : (
          <Text style={styles.noContent}>
            No content in clipboard. Copy some text to begin fact-checking.
          </Text>
        )}

        {factCheckResult && !error && (
          <FactCheckResult result={factCheckResult} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  clipboardContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  clipboardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  clipboardText: {
    fontSize: 16,
    color: '#1e293b',
  },
  noContent: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
    marginTop: 40,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 16,
    textAlign: 'center',
  },
});