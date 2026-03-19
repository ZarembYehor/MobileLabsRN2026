import React from 'react';
import { ScrollView } from "react-native";
import styled from 'styled-components/native';
import { useTaskStore } from '../contexts/TaskContext';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const Header = styled.View`
  align-items: center;
  margin-top: 60px;
`;

const ScoreLabel = styled.Text`
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  color: ${props => props.theme.inactive};
`;

const ScoreText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.theme.text};
`;

const GameZone = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Tappable = styled(Animated.View)`
  background-color: rgb(128, 0, 121);
  height: 140px;
  width: 140px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  elevation: 15;
  shadow-offset: 0px 10px;
  shadow-opacity: 0.5;
  shadow-radius: 15px;
  /* Тінь беремо з теми (tabBar як акцент) */
  shadow-color: ${props => props.theme.tabBar};
`;

const BottomSheet = styled.View`
  padding-vertical: 20px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  elevation: 20;
  shadow-color: #000;
  shadow-offset: 0px -5px;
  shadow-opacity: 0.1;
  background-color: ${props => props.theme.card || props.theme.background};
`;

const ListTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
  margin-bottom: 15px;
  color: ${props => props.theme.text};
`;

const TaskCard = styled.View`
  width: 110px;
  padding: 15px;
  border-radius: 20px;
  margin-right: 12px;
  align-items: center;
  border-width: 1px;
  background-color: ${props => props.theme.background};
  border-color: ${props => props.theme.inactive + '33'};
`;

const TaskName = styled.Text`
  font-size: 13px;
  font-weight: 600;
  margin-top: 8px;
  color: ${props => props.theme.text};
`;

const TaskPoints = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-top: 2px;
  color: ${props => props.theme.tabBar};
`;

export default function Home() {
  const { score, addScore, incrementTaps, completeTask } = useTaskStore();
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(incrementTaps)('single');
    runOnJS(addScore)(1);
  });

  const doubleTapGesture = Gesture.Tap().numberOfTaps(2).onEnd(() => {
    runOnJS(incrementTaps)('double');
    runOnJS(addScore)(5);
  });

  const longPressGesture = Gesture.LongPress().minDuration(3000).onStart(() => {
    runOnJS(addScore)(6);
    runOnJS(completeTask)('longPress');
  });

  const panGesture = Gesture.Pan().onUpdate((e) => {
    translateX.value = e.translationX;
    translateY.value = e.translationY;
  }).onEnd(() => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    runOnJS(completeTask)('moveObject'); 
  });

  const rightSwipe = Gesture.Fling().direction(Directions.RIGHT).onEnd(() => {
    runOnJS(completeTask)('rightSwipe');
    runOnJS(addScore)(Math.floor(Math.random() * 11));
  });

  const leftSwipe = Gesture.Fling().direction(Directions.LEFT).onEnd(() => {
    runOnJS(completeTask)('leftSwipe');
    runOnJS(addScore)(Math.floor(Math.random() * 11));
  });

  const resize = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.scale;
  }).onEnd(() => {
    scale.value = withSpring(1);
    runOnJS(completeTask)('changeSize');
  });

  const rotate = Gesture.Rotation().onUpdate((e) => {
    rotation.value = e.rotation;
  }).onEnd(() => {
    rotation.value = withSpring(0);
    runOnJS(completeTask)('changeSize'); 
  });

  const combinedGesture = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTapGesture, tapGesture, longPressGesture), 
    panGesture, rightSwipe, leftSwipe, resize, rotate
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value }, { translateY: translateY.value },
      { scale: scale.value }, { rotate: `${rotation.value}rad` } 
    ],
  }));

  const gestureHints = [
    { name: 'Тап', points: '+1', icon: 'finger-print-outline' },
    { name: 'Дабл-тап', points: '+5', icon: 'pause-outline' },
    { name: 'Утримання', points: '+6', icon: 'caret-down-circle-outline' },
    { name: 'Свайпи', points: '0-10', icon: 'swap-horizontal-outline' },
    { name: 'Зум/Поворот', points: 'Task', icon: 'move-outline' },
  ];

  return (
    <Container>
      <Header>
        <ScoreLabel>TOTAL SCORE</ScoreLabel>
        <ScoreText>{score}</ScoreText>
      </Header>

      <GameZone>
        <GestureDetector gesture={combinedGesture}>
          <Tappable style={animatedStyle}>
            <Ionicons name="game-controller" size={40} color="white" />
          </Tappable>
        </GestureDetector>
      </GameZone>

      <BottomSheet>
        <ListTitle>Можливі жести</ListTitle>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 10, paddingBottom: 20 }}
            >
            {gestureHints.map((item, index) => (
                <TaskCard key={index}>
                <Ionicons name={item.icon as any} size={24} color={'#bb86fc'} />
                <TaskName>{item.name}</TaskName>
                <TaskPoints>{item.points}</TaskPoints>
                </TaskCard>
            ))}
        </ScrollView>
      </BottomSheet>
    </Container>
  );
}