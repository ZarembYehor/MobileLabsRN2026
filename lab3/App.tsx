import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Tasks from './screens/Tasks';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider as StyledProvider } from 'styled-components/native';

export type RootTabParamList = {
  Home: undefined;
  Tasks: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function AppNavigation() {
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StyledProvider theme={theme}>
        
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerStyle: { backgroundColor: theme.background },
              headerTitleStyle: { color: theme.text },
              tabBarStyle: { 
                backgroundColor: theme.background, 
                borderTopColor: theme.inactive 
              },
              tabBarActiveTintColor: theme.tabBar,
              tabBarInactiveTintColor: theme.inactive,
              tabBarIcon: ({ color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap = 'home';

                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'Settings') iconName = 'settings';
                else if (route.name === 'Tasks') iconName = 'albums-outline';

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Tasks' component={Tasks} />
            <Tab.Screen name='Settings' component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>

      </StyledProvider>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}