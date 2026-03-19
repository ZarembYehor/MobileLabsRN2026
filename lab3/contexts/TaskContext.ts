import { create } from 'zustand';

interface TasksState {
  score: number;
  singleTaps: number;
  doubleTaps: number;
  longPress: boolean;
  moveObject: boolean;
  rightSwipe: boolean;
  leftSwipe: boolean;
  changeSize: boolean;
  rotation: boolean;
  
  addScore: (points: number) => void;
  incrementTaps: (type: 'single' | 'double') => void;
  completeTask: (taskName: keyof Omit<TasksState, 'score' | 'singleTaps' | 'doubleTaps' | 'addScore' | 'incrementTaps' | 'completeTask' | 'reset'>) => void;
  reset: () => void;
}

export const useTaskStore = create<TasksState>((set) => ({
  score: 0,
  singleTaps: 0,
  doubleTaps: 0,
  longPress: false,
  moveObject: false,
  rightSwipe: false,
  leftSwipe: false,
  changeSize: false,
  rotation: false,

  addScore: (points) => set((state) => ({ score: state.score + points })),
  
  incrementTaps: (type) => set((state) => ({
    singleTaps: type === 'single' ? state.singleTaps + 1 : state.singleTaps,
    doubleTaps: type === 'double' ? state.doubleTaps + 1 : state.doubleTaps,
  })),

  completeTask: (taskName) => set(() => ({ [taskName]: true })),

  reset: () => set({
    score: 0,
    singleTaps: 0,
    doubleTaps: 0,
    longPress: false,
    moveObject: false,
    rightSwipe: false,
    leftSwipe: false,
    changeSize: false
  }),
}));