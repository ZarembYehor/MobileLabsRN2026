import React from 'react';
import { Switch } from "react-native";
import styled from 'styled-components/native';
import { useTheme } from '../contexts/ThemeContext';

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${props => props.theme.background};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 15px;
  /* Додаємо невелику тінь та фон картки */
  background-color: ${props => props.theme.card || (props.theme.isDark ? '#1e1e1e' : '#f9f9f9')};
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
`;

const SettingText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

export default function Settings() {
  const { isDark, theme, toggleTheme } = useTheme();

  return (
    <Container>
      <Row>
        <SettingText>Темна тема</SettingText>
        <Switch 
          value={isDark} 
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: theme.tabBar + '88' }}
          thumbColor={isDark ? theme.tabBar : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </Row>
    </Container>
  );
}