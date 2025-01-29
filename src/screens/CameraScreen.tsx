import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { NavigationBar } from '../components/NavigationBar';
import { FlipButton } from '../components/FlipButton';
import { ScannerOverlay } from '../components/ScannerOverlay';

export function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera - please enable in settings</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <ScannerOverlay />
        <FlipButton onPress={toggleCameraFacing} />
        <NavigationBar />
      </CameraView>
      <Text style={styles.scanText}>Scan a Barcode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scanText: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    fontSize: 32,
    color: 'white',
    fontStyle: 'italic', // Fallback if cursive font not available
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  camera: {
    flex: 1,
  },
}); 