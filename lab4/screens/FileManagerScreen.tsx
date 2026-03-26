import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'FileManager'>;

interface FileItem {
  name: string;
  isDirectory: boolean;
  uri: string;
}

const FileManagerScreen = ({ route, navigation }: Props) => {
  const { path } = route.params;
  const [items, setItems] = useState<FileItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [isFolder, setIsFolder] = useState(true);

  const normalizedPath = path.endsWith('/') ? path : path + '/';
  const displayPath = normalizedPath.replace(FileSystem.documentDirectory || '', '') || '/';

  const loadItems = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(normalizedPath);
      const details = await Promise.all(
        files.map(async (f) => {
          const fullPath = normalizedPath + f;
          const info = await FileSystem.getInfoAsync(fullPath);
          return {
            name: f,
            isDirectory: info.isDirectory,
            uri: fullPath + (info.isDirectory ? '/' : '')
          };
        })
      );
      setItems(details.sort((a, b) => Number(b.isDirectory) - Number(a.isDirectory)));
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося завантажити вміст");
    }
  };

  useEffect(() => { loadItems(); }, [normalizedPath]);

  const handleCreate = async () => {
    if (!name.trim()) return;
    const newUri = normalizedPath + name.trim() + (isFolder ? '/' : '.txt');
    try {
      if (isFolder) {
        await FileSystem.makeDirectoryAsync(newUri);
      } else {
        await FileSystem.writeAsStringAsync(newUri, initialContent);
      }
      setName('');
      setInitialContent('');
      setModalVisible(false);
      loadItems();
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося створити об'єкт");
    }
  };

  const confirmDelete = (item: FileItem) => {
    Alert.alert("Видалення", `Видалити ${item.name}?`, [
      { text: "Скасувати" },
      { text: "Так", style: 'destructive', onPress: async () => {
          await FileSystem.deleteAsync(item.uri);
          loadItems();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.breadcrumb}>Шлях: {displayPath}</Text>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity 
              style={{ flex: 1 }}
              onPress={() => item.isDirectory ? 
                navigation.push('FileManager', { path: item.uri }) : 
                navigation.navigate('FileEditor', { uri: item.uri })
              }
              onLongPress={() => navigation.navigate('FileInfo', { uri: item.uri })}
            >
              <Text style={item.isDirectory ? styles.folder : styles.file}>
                {item.isDirectory ? '📁' : '📄'} {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmDelete(item)}>
              <Text style={{ fontSize: 20 }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.actions}>
        <Button title="+ Папка" onPress={() => { setIsFolder(true); setModalVisible(true); }} />
        <Button title="+ Файл (.txt)" onPress={() => { setIsFolder(false); setModalVisible(true); }} />
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalBody}>
            <ScrollView>
              <Text style={styles.modalTitle}>Створити {isFolder ? 'папку' : 'файл'}</Text>
              
              <TextInput 
                placeholder="Назва" 
                style={styles.input} 
                value={name} 
                onChangeText={setName} 
                autoFocus
              />
              
              {!isFolder && (
                <TextInput 
                  placeholder="Початковий вміст (необов'язково)" 
                  style={[styles.input, styles.multiline]} 
                  value={initialContent} 
                  onChangeText={setInitialContent}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              )}
              
              <View style={{ gap: 10, marginTop: 10 }}>
                <Button title="ОК" onPress={handleCreate} />
                <Button title="Скасувати" color="red" onPress={() => {
                  setName('');
                  setInitialContent('');
                  setModalVisible(false);
                }} />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  breadcrumb: { 
    padding: 10, 
    backgroundColor: '#eee', 
    fontSize: 12, 
    color: '#555' 
  },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderColor: '#f0f0f0' 
  },
  folder: { 
    color: '#007AFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  file: { 
    color: '#333', 
    fontSize: 16 
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    padding: 20, 
    borderTopWidth: 1, 
    borderColor: '#eee' 
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    padding: 20 
  },
  modalBody: { 
    backgroundColor: 'white', 
    padding: 25, 
    borderRadius: 15, 
    maxHeight: '80%' 
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 15 
  },
  input: { 
    borderBottomWidth: 1, 
    borderColor: '#ccc', 
    marginBottom: 20, 
    padding: 8 
  },
  multiline: { 
    borderWidth: 1, 
    borderRadius: 8, 
    minHeight: 80, 
    textAlignVertical: 'top' 
  }
});

export default FileManagerScreen;