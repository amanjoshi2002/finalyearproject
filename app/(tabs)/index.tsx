import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator } from 'react-native';
import * as Clipboard from 'expo-clipboard';

interface ApiResponse {
  verdict: string; // Adjusted to match the expected API response structure
  explanation?: string; // Optional explanation from the API
}

export default function HomeScreen() {
  const [clipboardText, setClipboardText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null); // Updated state type

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

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('https://a018-34-82-5-125.ngrok-free.app/debate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statement: clipboardText }),
      });

      const data: ApiResponse = await response.json(); // Ensure the response is typed
      setResult(data);
    } catch (err) {
      setError('Error sending request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <Button title="Submit" onPress={handleSubmit} />
            {loading && <ActivityIndicator size="small" color="#0000ff" />}
          </View>
        ) : (
          <Text style={styles.noContent}>
            No content in clipboard. Copy some text to begin fact-checking.
          </Text>
        )}

        {result && !error && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Verdict: {result.verdict}</Text>
            
          </View>
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
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
  },
  resultText: {
    fontSize: 16,
    color: '#00796b',
  },
  explanationText: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
});