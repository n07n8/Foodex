import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationBar } from '../components/NavigationBar';
import { FlipButton } from '../components/FlipButton';
import { ScannerOverlay } from '../components/ScannerOverlay';

export function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

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

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert(
      'Barcode Scanned',
      `Type: ${type}\nData: ${data}`,
      [{ text: 'OK', onPress: () => setScanned(false) }]
    );
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'qr'],
        }}
      >
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