import { StyleSheet, Platform, View, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { ProfileButton } from './ProfileButton';
import { DashboardButton } from './DashboardButton';
import { HistoryButton } from './HistoryButton';
import { SearchButton } from './SearchButton';

const { width } = Dimensions.get('window');

type Props = {
  currentRoute?: string;
};

export function NavigationBar({ currentRoute }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <BlurView 
          intensity={20} 
          tint="light" 
          style={styles.navigationBar}
        />
      </View>
      <HistoryButton isActive={currentRoute === 'History'} />
      <SearchButton isActive={currentRoute === 'Search'} />
      <DashboardButton isActive={currentRoute === 'Dashboard'} />
      <ProfileButton isActive={currentRoute === 'Profile'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  navigationBar: {
    height: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    overflow: 'hidden',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 50 : 30,
    alignItems: 'center',
    zIndex: 2,
  },
}); 