import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { NavigationBar } from '../components/NavigationBar';
import { FlipButton } from '../components/FlipButton';
import { ScannerOverlay } from '../components/ScannerOverlay';
import { BottomSheet } from '@rneui/themed';

// Normalized overlay dimensions (0-1)
const NORMALIZED_RECT_WIDTH = 0.8; // 80% of screen width
const NORMALIZED_RECT_HEIGHT = 0.4; // 40% of screen height
const NORMALIZED_OVERLAY_X = (1 - NORMALIZED_RECT_WIDTH) / 2;
const NORMALIZED_OVERLAY_Y = 0.25; // 25% from top

// Add boundary tolerance for floating point precision
const BOUNDARY_TOLERANCE = Number.EPSILON * 10;

export function CameraScreen() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const scanTimeout = useRef<NodeJS.Timeout | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [scannedData, setScannedData] = useState<{type: string, data: string} | null>(null);

  // Update scan area to be centered vertically
  const SCAN_AREA_PIXELS = {
    minX: (screenWidth - NORMALIZED_RECT_WIDTH * screenWidth) / 2,
    maxX: (screenWidth + NORMALIZED_RECT_WIDTH * screenWidth) / 2,
    minY: (screenHeight - NORMALIZED_RECT_WIDTH * screenWidth) / 2 - 50,
    maxY: (screenHeight + NORMALIZED_RECT_WIDTH * screenWidth) / 2 - 50
  };

  useEffect(() => {
    return () => {
      if (scanTimeout.current) {
        clearTimeout(scanTimeout.current);
      }
    };
  }, []);

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

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    try {
      console.log('Barcode detected - starting processing');
      if (scanTimeout.current) return;

      const { type, data, bounds } = scanningResult;
      
      // Get barcode center coordinates in pixels
      const centerXPixel = bounds.origin.x + bounds.size.width/2;
      const centerYPixel = bounds.origin.y + bounds.size.height/2;

      // Log position before any checks
      console.log('Barcode Position:', {
        type,
        data,
        bounds: {
          origin: {
            x: bounds.origin.x,
            y: bounds.origin.y
          },
          size: {
            width: bounds.size.width,
            height: bounds.size.height
          }
        },
        center: { centerXPixel, centerYPixel }
      });

      console.log('Raw bounds:', JSON.stringify(bounds, null, 2));
      console.log('Calculated center:', { centerXPixel, centerYPixel });

      // Check if center is within scan area
      const isInArea = (
        centerXPixel >= SCAN_AREA_PIXELS.minX &&
        centerXPixel <= SCAN_AREA_PIXELS.maxX &&
        centerYPixel >= SCAN_AREA_PIXELS.minY &&
        centerYPixel <= SCAN_AREA_PIXELS.maxY
      );

      console.log('Scan Check:', {
        centerXPixel,
        centerYPixel,
        inArea: isInArea,
        data,
        scanArea: SCAN_AREA_PIXELS,
        tolerance: BOUNDARY_TOLERANCE
      });

      if (!isInArea) return;

      console.log('Valid barcode - showing bottom sheet');
      setScannedData({
        type: scanningResult.type,
        data: scanningResult.data
      });
      setIsBottomSheetVisible(true);

    } catch (error) {
      console.error('Scanning error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'upc_a', 'code128', 'code39', 'codabar', 'ean8', 'itf14']
        }}
      >
        {/* Scan Area Overlay */}
        <ScannerOverlay />
        <FlipButton onPress={toggleCameraFacing} />
        <NavigationBar />
      </CameraView>
      
      <BottomSheet
        isVisible={isBottomSheetVisible}
        containerStyle={{ backgroundColor: 'white' }}
        onBackdropPress={() => {
          setIsBottomSheetVisible(false);
          if (scanTimeout.current) clearTimeout(scanTimeout.current);
          scanTimeout.current = null;
        }}
      >
        <View style={sheetStyles.container}>
          <Text style={sheetStyles.title}>Scanned Barcode</Text>
          <Text style={sheetStyles.label}>Type:</Text>
          <Text style={sheetStyles.value}>{scannedData?.type}</Text>
          <Text style={sheetStyles.label}>Data:</Text>
          <Text style={sheetStyles.value}>{scannedData?.data}</Text>
          
          <TouchableOpacity
            style={sheetStyles.closeButton}
            onPress={() => {
              setIsBottomSheetVisible(false);
              if (scanTimeout.current) clearTimeout(scanTimeout.current);
              scanTimeout.current = null;
            }}
          >
            <Text style={sheetStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

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
  scanOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(255,0,0,0.2)',
  },
  debugText: {
    position: 'absolute',
    color: 'white',
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
    left: 4,
    top: 4
  }
});

const sheetStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#666',
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
    color: '#444',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 