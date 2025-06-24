import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useHistory } from '../../contexts/HistoryContext';
import { ApiResponse } from '../../types/api';  // Import the ApiResponse interface

// Remove the local ApiResponse interface since we're importing it

export default function HomeScreen() {
  const [clipboardText, setClipboardText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const { addToHistory } = useHistory();

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://172.20.10.7:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            text: clipboardText
          }
        }),
      });

      const data: ApiResponse = await response.json();
      setResult(data);
      setModalVisible(true);
      addToHistory(data, clipboardText); // Add to history when we get a result
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
          </View>
        ) : (
          <Text style={styles.noContent}>
            No content in clipboard. Copy some text to begin fact-checking.
          </Text>
        )}

        {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Analyzing text...</Text>
            </View>
          </View>
        )}

        {result && !error && (
          <View style={styles.resultContainer}>
            <Text style={[styles.verdictText, 
              result.verdict === "false" ? styles.scamVerdict : styles.notScamVerdict]}>
              {result.verdict}
            </Text>
            
            <Text style={styles.summaryText}>{result.summary}</Text>
            
            <View style={styles.evidenceContainer}>
              <Text style={styles.evidenceTitle}>Evidence:</Text>
              {result.evidence.map((point, index) => (
                <Text key={index} style={styles.evidencePoint}>
                  • {point}
                </Text>
              ))}
            </View>
            
            <Text style={styles.sourceText}>Source: {result.source}</Text>
          </View>
        )}
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              {result && (
                <>
                  <Text style={[styles.verdictText, 
                    result.verdict === "false" ? styles.scamVerdict : styles.notScamVerdict]}>
                    {result.verdict}
                  </Text>
                  
                  <Text style={styles.summaryText}>{result.summary}</Text>
                  
                  <View style={styles.evidenceContainer}>
                    <Text style={styles.evidenceTitle}>Evidence:</Text>
                    {result.evidence.map((point, index) => (
                      <Text key={index} style={styles.evidencePoint}>
                        • {point}
                      </Text>
                    ))}
                  </View>
                  
                  <Text style={styles.sourceText}>Source: {result.source}</Text>
                </>
              )}
            </View>
          </View>
        </Modal>
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
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  verdictText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  scamVerdict: {
    color: '#dc2626',
  },
  notScamVerdict: {
    color: '#059669',
  },
  summaryText: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  evidenceContainer: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  evidenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  evidencePoint: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 6,
    lineHeight: 20,
  },
  sourceText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#64748b',
    fontWeight: '500',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
});