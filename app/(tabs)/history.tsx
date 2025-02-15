import { View, Text, StyleSheet, FlatList } from 'react-native';
import { staticFactChecks } from '../../data/staticData';
import { FactCheckResult } from '../../components/FactCheckResult';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={staticFactChecks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FactCheckResult result={item} />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  list: {
    padding: 16,
  },
});