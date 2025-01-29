import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const RIGHT_POSITION = width * 0.25; // Adjust this multiplier to fine-tune position

export function DashboardButton({ isActive }: { isActive?: boolean }) {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <TouchableOpacity style={styles.dashboardButton} onPress={handlePress}>
      <MaterialIcons 
        name="grid-view" 
        size={32} 
        color={isActive ? COLORS.lilacPurple : COLORS.black}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dashboardButton: {
    position: 'absolute',
    right: RIGHT_POSITION,
    bottom: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 