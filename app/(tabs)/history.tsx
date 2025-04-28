import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useHistory } from '../../contexts/HistoryContext';
import { FactCheckResult } from '../../components/FactCheckResult';

export default function HistoryScreen() {
  const { history } = useHistory();

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <Text style={styles.emptyText}>No fact-check history yet</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FactCheckResult result={item} />
          )}
          contentContainerStyle={styles.list}
        />
      )}
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
  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
    marginTop: 40,
  },
});