import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from 'react-native';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Каталог товарів',
          headerShown: false,
          headerRight: () => <LogoutButton /> 
        }} 
      />
    </Stack>
  );
}



function LogoutButton() {
  const { logout } = useAuth();
  return <Button title="Вийти" onPress={logout} color="red" />;
}