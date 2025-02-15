import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type Props = {
  text: string;
};

export function FloatingOverlay({ text }: Props) {
  if (!text) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
          <Text style={styles.title}>Fact Check Available</Text>
        </View>
        <Text style={styles.text} numberOfLines={2}>
          {text}
        </Text>
        <Link href="/" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>View Full Analysis</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: (width - 320) / 2,
    width: 320,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  text: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});