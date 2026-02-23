import { News } from "./News";

export type RootStackParamList = {
  Main: undefined; 
  Details: { newsData: News }; 
};