import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { HistoryProvider } from '../contexts/HistoryContext';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  const [clipboardText, setClipboardText] = useState('');

  useEffect(() => {
    const checkClipboard = async () => {
      try {
        const text = await Clipboard.getStringAsync();
        setClipboardText(text);
      } catch (err) {
        console.error('Clipboard error:', err);
      }
    };

    const interval = setInterval(checkClipboard, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  return (
    <HistoryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </HistoryProvider>
  );
}