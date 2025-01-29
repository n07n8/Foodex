import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const RIGHT_POSITION = width * 0.08; // Smaller value to be closer to the edge

export function ProfileButton({ isActive }: { isActive?: boolean }) {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity style={styles.profileButton} onPress={handlePress}>
      <MaterialIcons 
        name="person" 
        size={32} 
        color={isActive ? COLORS.lilacPurple : COLORS.black} 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    position: 'absolute',
    right: RIGHT_POSITION,
    bottom: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 