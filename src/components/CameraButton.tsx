import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { COLORS } from '../constants/colors';

export function CameraButton() {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('Camera');
  };

  return (
    <TouchableOpacity style={styles.captureButton} onPress={handlePress}>
      <MaterialIcons name="camera-alt" size={28} color={COLORS.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    bottom: -10,
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: COLORS.lilacPurple,
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Android shadow
    elevation: 8,
  },
}); 