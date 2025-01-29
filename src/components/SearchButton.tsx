import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');
const LEFT_POSITION = width * 0.25;

export function SearchButton({ isActive }: { isActive?: boolean }) {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('Search');
  };

  return (
    <TouchableOpacity style={styles.searchButton} onPress={handlePress}>
      <MaterialIcons 
        name="search" 
        size={32} 
        color={isActive ? COLORS.lilacPurple : COLORS.black}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchButton: {
    position: 'absolute',
    left: LEFT_POSITION,
    bottom: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 