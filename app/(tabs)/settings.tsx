import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [overlayEnabled, setOverlayEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        
        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Ionicons name="layers-outline" size={24} color="#64748b" />
            <Text style={styles.settingText}>Enable Overlay Display</Text>
          </View>
          <Switch
            value={overlayEnabled}
            onValueChange={setOverlayEnabled}
            trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
            thumbColor={overlayEnabled ? '#2563eb' : '#f1f5f9'}
          />
        </View>

        <View style={styles.setting}>
          <View style={styles.settingInfo}>
            <Ionicons name="notifications-outline" size={24} color="#64748b" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#cbd5e1', true: '#93c5fd' }}
            thumbColor={notificationsEnabled ? '#2563eb' : '#f1f5f9'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Pressable style={styles.setting}>
          <View style={styles.settingInfo}>
            <Ionicons name="information-circle-outline" size={24} color="#64748b" />
            <Text style={styles.settingText}>Version 1.0.0</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#334155',
  },
});