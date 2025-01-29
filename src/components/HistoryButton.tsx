import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';

const { width } = Dimensions.get('window');
const LEFT_POSITION = width * 0.08;

export function HistoryButton({ isActive }: { isActive?: boolean }) {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('History');
  };

  return (
    <TouchableOpacity style={styles.historyButton} onPress={handlePress}>
      <MaterialIcons 
        name="history-edu" 
        size={32} 
        color={isActive ? COLORS.lilacPurple : COLORS.black}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  historyButton: {
    position: 'absolute',
    left: LEFT_POSITION,
    bottom: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 