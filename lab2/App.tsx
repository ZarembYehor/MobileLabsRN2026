import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { 
  createDrawerNavigator, 
  DrawerContentComponentProps, 
  DrawerContentScrollView, 
  DrawerItemList 
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Main from './screens/main';
import Details from './screens/details';
import Contacts from './screens/contacts';
import { RootStackParamList } from './types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.infoBlock}>
        <Image 
          source={require("./assets/11.jpg")}
          style={styles.avatar}
        />
        <Text style={styles.nameText}>Зарембицький Єгор Юрійович</Text>
        <Text style={styles.groupText}>ІПЗ-22-2</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={Main} 
        options={({ navigation }) => ({ 
          title: 'Головна',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
              style={{ paddingRight: 15 }}
            >
              <Text style={{ fontSize: 24, color: '#1a1a1a' }}>☰</Text>
            </TouchableOpacity>
          )
        })} 
      />
      <Stack.Screen 
        name="Details" 
        component={Details} 
        options={({ route, navigation }) => ({ 
          title: route.params?.newsData?.title || 'Деталі',
          headerTitleStyle: { fontSize: 16 },
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
            >
              <Text style={{ fontSize: 24, color: '#1a1a1a' }}>☰</Text>
            </TouchableOpacity>
          )
        })} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen 
          name="Home" 
          component={NewsStack} 
          options={{ 
            title: 'Головна',
            headerShown: false 
          }} 
        />
        <Drawer.Screen
          name='Contacts'
          component={Contacts}
          options={{ title: 'Контакти' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  infoBlock: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  groupText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});