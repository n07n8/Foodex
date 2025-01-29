import { View, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCANNER_WIDTH = SCREEN_WIDTH * 0.85;
const SCANNER_HEIGHT = SCANNER_WIDTH * 0.6;
const SCANNER_OFFSET = 40;

export function ScannerOverlay() {
  return (
    <View style={styles.container}>
      {/* Top blur */}
      <BlurView intensity={20} tint="dark" style={styles.topBlur} />
      
      <View style={styles.middleSection}>
        {/* Left blur */}
        <BlurView intensity={20} tint="dark" style={styles.sideBlur} />
        
        {/* Scanner rectangle */}
        <View style={styles.scanner} />
        
        {/* Right blur */}
        <BlurView intensity={20} tint="dark" style={styles.sideBlur} />
      </View>
      
      {/* Bottom blur */}
      <BlurView intensity={20} tint="dark" style={styles.bottomBlur} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBlur: {
    height: (SCREEN_HEIGHT - SCANNER_HEIGHT) / 2 - SCANNER_OFFSET,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  middleSection: {
    flexDirection: 'row',
    height: SCANNER_HEIGHT,
  },
  sideBlur: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomBlur: {
    height: (SCREEN_HEIGHT - SCANNER_HEIGHT) / 2 + SCANNER_OFFSET,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  scanner: {
    width: SCANNER_WIDTH,
    height: SCANNER_HEIGHT,
    borderColor: 'white',
    borderWidth: 2,
  },
}); 