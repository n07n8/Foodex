import { useNavigationState } from '@react-navigation/native';
import { NavigationBar } from './NavigationBar';

export function NavigationBarWrapper() {
  const currentRoute = useNavigationState(state => 
    state?.routes[state.index]?.name
  );

  return <NavigationBar currentRoute={currentRoute} />;
} 