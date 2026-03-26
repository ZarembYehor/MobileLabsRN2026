import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { formatBytes, formatDate } from '../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'FileInfo'>;

const getFileType = (fileName: string, isDirectory: boolean): string => {
  if (isDirectory) return 'Папка';
  
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'txt': return 'Текстовий файл (.txt)';
    case 'jpg':
    case 'jpeg': return 'Зображення JPEG';
    case 'png': return 'Зображення PNG';
    case 'pdf': return 'PDF документ';
    case 'mp3': return 'Аудіо MP3';
    case 'mp4': return 'Відео MP4';
    case 'json': return 'JSON файл';
    case 'js': return 'JavaScript файл';
    case 'html': return 'HTML документ';
    case 'css': return 'CSS файл';
    default: return `Файл (${extension ? '.' + extension : 'невідомий тип'})`;
  }
};

const FileInfoScreen = ({ route }: Props) => {
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    FileSystem.getInfoAsync(route.params.uri, { size: true } as any).then(setInfo);
  }, [route.params.uri]);

  if (!info) return <ActivityIndicator style={{ flex: 1 }} />;

  const name = route.params.uri.split('/').filter(Boolean).pop() || '';
  const fileType = getFileType(name, info.isDirectory);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Назва файлу:</Text>
        <Text style={styles.value}>{name}</Text>

        <Text style={styles.label}>Тип файлу:</Text>
        <Text style={styles.value}>{fileType}</Text>

        {!info.isDirectory && (
          <>
            <Text style={styles.label}>Розмір:</Text>
            <Text style={styles.value}>{formatBytes(info.size)}</Text>
          </>
        )}

        <Text style={styles.label}>Дата останньої модифікації:</Text>
        <Text style={styles.value}>{formatDate(info.modificationTime)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 12, 
    elevation: 2 
  },
  label: { 
    fontSize: 14, 
    color: '#888', 
    marginTop: 10 
  },
  value: { 
    fontSize: 18, 
    fontWeight: '500', 
    color: '#333' 
  }
});

export default FileInfoScreen;