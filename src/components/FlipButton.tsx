import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraType } from 'expo-camera';

type FlipButtonProps = {
  onPress: () => void;
};

export function FlipButton({ onPress }: FlipButtonProps) {
  return (
    <TouchableOpacity style={styles.flipButton} onPress={onPress}>
      <MaterialIcons name="flip-camera-ios" size={36} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
}); 