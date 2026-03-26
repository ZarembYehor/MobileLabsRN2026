import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { formatBytes } from '../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [memory, setMemory] = useState<{ total: number; free: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      try {
        setLoading(true);
        const free = await FileSystem.getFreeDiskStorageAsync();
        const total = await (FileSystem as any).getTotalDiskCapacityAsync?.() || 0;
        setMemory({ total, free });
      } catch (e) {
        console.error('Storage stats error:', e);
        Alert.alert('Помилка', 'Не вдалося отримати дані про пам’ять');
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  const handleOpenManager = () => {
    const docsDir = (FileSystem as any).documentDirectory;
    if (docsDir) {
      navigation.navigate('FileManager', { path: docsDir });
    } else {
      Alert.alert('Помилка', 'Файлова система недоступна на цьому пристрої');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Файловий Менеджер</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginBottom: 20 }} />
      ) : memory ? (
        <View style={styles.card}>
          <Text style={styles.label}>Статистика сховища:</Text>
          <View style={styles.divider} />
          <Text style={styles.text}>Загалом: {formatBytes(memory.total)}</Text>
          <Text style={styles.text}>Вільно: {formatBytes(memory.free)}</Text>
          <Text style={[styles.text, styles.usedText]}>
            Зайнято: {formatBytes(memory.total - memory.free)}
          </Text>
        </View>
      ) : (
        <Text style={styles.errorText}>Дані про пам'ять недоступні</Text>
      )}

      <Button
        title="Відкрити Провідник"
        onPress={handleOpenManager}
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, padding: 20, 
    justifyContent: 'center', 
    backgroundColor: '#f8f9fa' 
  },
  header: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 30, 
    textAlign: 'center', 
    color: '#1a1a1a' 
  },
  card: { 
    padding: 25, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    marginBottom: 40, 
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 10 
  },
  label: { 
    fontSize: 14, 
    color: '#888', 
    textTransform: 'uppercase', 
    letterSpacing: 1, 
    marginBottom: 10 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#eee', 
    marginBottom: 15 
  },
  text: { 
    fontSize: 18, 
    marginBottom: 10, 
    color: '#444' 
  },
  usedText: { 
    fontWeight: 'bold', 
    color: '#007AFF', 
    marginTop: 5 
  },
  errorText: { 
    textAlign: 'center', 
    color: '#d9534f', 
    marginBottom: 20 
  }
});

export default HomeScreen;