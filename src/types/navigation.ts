import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Camera: undefined;
  Profile: undefined;
  Dashboard: undefined;
  History: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 