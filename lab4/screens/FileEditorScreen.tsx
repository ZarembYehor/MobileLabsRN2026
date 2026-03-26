import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator 
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'FileEditor'>;

const FileEditorScreen = ({ route, navigation }: Props) => {
  const { uri } = route.params;
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fileName = uri.split('/').pop() || 'Редактор';

  useEffect(() => {
    navigation.setOptions({ title: fileName });
    readFile();
  }, []);

  const readFile = async () => {
    try {
      const text = await FileSystem.readAsStringAsync(uri);
      setContent(text);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося прочитати файл");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const saveFile = async () => {
    try {
      await FileSystem.writeAsStringAsync(uri, content);
      Alert.alert("Успіх", "Файл збережено", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося зберегти файл");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <TextInput
        style={styles.editor}
        multiline
        value={content}
        onChangeText={setContent}
        placeholder="Почніть писати тут..."
        autoFocus
      />
      <View style={styles.buttonContainer}>
        <Button title="Зберегти зміни" onPress={saveFile} color="#28a745" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editor: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
});

export default FileEditorScreen;