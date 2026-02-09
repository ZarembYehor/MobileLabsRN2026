import { StyleSheet, View, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import News from '../components/news';

export default function HomeScreen() {
  const cellArray = Array(10).fill(null).map((_, i) => ({ id: i.toString() }));

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={cellArray}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ThemedText style={styles.text}>Новини</ThemedText>}
        renderItem={() => <News />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    backgroundColor: '#000', 
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center'
  },
  listContent: {
    paddingBottom: 20,
  }
});