import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { Navigator } = createMaterialTopTabNavigator();
export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/image.png')}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.title}>FirstMobileApp</Text>
      </View>

      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: themeColors.tint,
          tabBarInactiveTintColor: '#999',
          tabBarIndicatorStyle: { backgroundColor: themeColors.tint }, 
          tabBarStyle: { 
            backgroundColor: 'black',
            elevation: 0, 
            shadowOpacity: 0 
          },
          tabBarLabelStyle: { 
            fontSize: 12, 
            fontWeight: '600', 
            textTransform: 'none' 
          },
          tabBarShowIcon: true,
        }}
      >
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: 'Головна',
            tabBarIcon: ({ color }) => <IconSymbol size={20} name="house.fill" color={color} />,
          }}
        />
        <MaterialTopTabs.Screen
          name="gallery"
          options={{
            title: 'Галерея',
            tabBarIcon: ({ color }) => <IconSymbol size={20} name="photo.fill" color={color} />,
          }}
        />
        <MaterialTopTabs.Screen
          name="profile"
          options={{
            title: 'Профіль',
            tabBarIcon: ({ color }) => <IconSymbol size={20} name="account.box" color={color} />,
          }}
        />
      </MaterialTopTabs>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Зарембицький Єгор Юрійович ІПЗ-22-2</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logo: { 
    width: 120, height: 50 
  },
  title: { 
    fontSize: 18, fontWeight: '600', color: 'white' 
  },
  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#111', 
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
});