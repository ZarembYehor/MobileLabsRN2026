import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

import HomeScreen from '../screens/HomeScreen';
import FileManagerScreen from '../screens/FileManagerScreen';
import FileEditorScreen from '../screens/FileEditorScreen';
import FileInfoScreen from '../screens/FileInfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Мій Диспетчер' }} />
    <Stack.Screen name="FileManager" component={FileManagerScreen} options={{ title: 'Файли' }} />
    <Stack.Screen name="FileEditor" component={FileEditorScreen} options={{ title: 'Редагування' }} />
    <Stack.Screen name="FileInfo" component={FileInfoScreen} options={{ title: 'Властивості' }} />
  </Stack.Navigator>
);