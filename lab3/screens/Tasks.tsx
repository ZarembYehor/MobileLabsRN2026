import React from 'react';
import styled from 'styled-components/native';
import { useTaskStore } from '../contexts/TaskContext';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const Header = styled.View`
  padding: 25px;
  padding-top: 50px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${props => props.theme.text};
`;

const Subtitle = styled.Text`
  font-size: 14px;
  margin-top: 5px;
  color: ${props => props.theme.inactive};
`;

const List = styled.View`
  padding: 0 20px 30px;
`;

const Card = styled.View<{ isDone: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${props => props.isDone ? '#4CAF50' : props.theme.inactive + '33'};
  background-color: ${props => 
    props.theme.card || (props.theme.background === '#ffffff' ? '#f9f9f9' : '#1e1e1e')
  };
`;

const IconContainer = styled.View<{ isDone: boolean }>`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  background-color: ${props => props.isDone ? '#4CAF5022' : props.theme.inactive + '11'};
`;

const Info = styled.View`
  flex: 1;
`;

const Label = styled.Text<{ isDone: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.theme.text};
  opacity: ${props => props.isDone ? 0.6 : 1};
`;

const Progress = styled.Text`
  font-size: 12px;
  margin-top: 2px;
  color: ${props => props.theme.inactive};
`;

export default function Tasks() {
  const s = useTaskStore(); 

  const myQuests = [
    { label: 'Зробити 10 кліків', progress: `${Math.min(s.singleTaps, 10)}/10`, isDone: s.singleTaps >= 10, icon: 'finger-print-outline' },
    { label: 'Зробити 5 подвійних кліків', progress: `${Math.min(s.doubleTaps, 5)}/5`, isDone: s.doubleTaps >= 5, icon: 'flame-outline' },
    { label: 'Утримувати об’єкт 3 секунди', progress: s.longPress ? '1/1' : '0/1', isDone: s.longPress, icon: 'caret-down-circle-outline' },
    { label: 'Перетягнути об’єкт', progress: s.moveObject ? '1/1' : '0/1', isDone: s.moveObject, icon: 'move-outline' },
    { label: 'Зробити свайп вправо', progress: s.rightSwipe ? '1/1' : '0/1', isDone: s.rightSwipe, icon: 'arrow-forward-outline' },
    { label: 'Зробити свайп вліво', progress: s.leftSwipe ? '1/1' : '0/1', isDone: s.leftSwipe, icon: 'arrow-back-outline' },
    { label: 'Змінити розмір об’єкта', progress: s.changeSize ? '1/1' : '0/1', isDone: s.changeSize, icon: 'resize-outline' },
    { label: 'Отримати 100 очок', progress: `${Math.min(s.score, 100)}/100`, isDone: s.score >= 100, icon: 'trophy-outline' },
    { label: 'Повернути об’єкт (Власне)', progress: s.changeSize ? '1/1' : '0/1', isDone: s.changeSize, icon: 'refresh-outline' },
  ];

  return (
    <Container>
      <Header>
        <Title>Quest Log</Title>
        <Subtitle>Виконай усі завдання, щоб стати про!</Subtitle>
      </Header>

      <List>
        {myQuests.map((quest, index) => (
          <Card key={index} isDone={quest.isDone}>
            <IconContainer isDone={quest.isDone}>
              <Ionicons 
                name={quest.icon as any} 
                size={22} 
                color={quest.isDone ? '#4CAF50' : s.score > 0 ? '#ff6347' : '#888'} 
              />
            </IconContainer>

            <Info>
              <Label isDone={quest.isDone}>{quest.label}</Label>
              <Progress>{quest.progress}</Progress>
            </Info>

            {quest.isDone && (
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            )}
          </Card>
        ))}
      </List>
    </Container>
  );
}