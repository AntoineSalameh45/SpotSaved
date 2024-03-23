/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Linking,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const ScreenC = () => {
  const {requestPermission, hasPermission} = useCameraPermission();
  const [cameraDevice, setCameraDevice] = useState<'back' | 'front'>('back');
  const device = useCameraDevice(cameraDevice);
  const camera = useRef<Camera>(null);

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<null | string>(null);

  const openCamera = () => setIsCameraVisible(true);
  const closeCamera = () => setIsCameraVisible(false);

  const handleCameraPermission = async () => {
    const isAccessGranted = await requestPermission();

    if (!isAccessGranted) {
      Alert.alert('Permission required', 'Open settings to grant permission', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Open settings',
          style: 'default',
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]);
      return;
    }

    // open camera logic
    openCamera();
  };

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    setCapturedImage(`file://${photo!.path}`);
    closeCamera();
  };

  const toggleCameraDevice = () => {
    const newDevice = cameraDevice === 'back' ? 'front' : 'back';
    setCameraDevice(newDevice);
  };

  if (device === null) {
    return (
      <View style={styles.mainView}>
        <Text style={{fontSize: 20, color: 'red'}}>
          Camera feature not supported
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainView}>
      {capturedImage ? (
        <>
          <View
            style={{
              width: 300,
              height: 300,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: capturedImage}}
              style={{width: '100%', height: '100%'}}
            />
          </View>

          <Pressable
            onPress={() => {
              setCapturedImage(null);
            }}
            style={styles.button}>
            <Text style={{fontSize: 20, color: '#fff'}}>Clear image</Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={handleCameraPermission} style={styles.button}>
          <Text style={{fontSize: 20, color: '#fff'}}>
            {hasPermission ? 'Open camera' : 'Request camera access'}
          </Text>
        </Pressable>
      )}

      {isCameraVisible && (
        <>
          <View
            style={{
              position: 'absolute',
              top: 10,
              zIndex: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <Pressable onPress={closeCamera}>
              <Text>X</Text>
            </Pressable>
            <Pressable onPress={toggleCameraDevice}>
              <Text>Switch</Text>
            </Pressable>
          </View>

          <Camera
            photo
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device!}
            isActive={true}
            resizeMode="contain"
          />

          <View
            style={{
              position: 'absolute',
              bottom: 100,
            }}>
            <Pressable onPress={takePhoto} style={styles.captureButton}>
              <Text>.</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: ({pressed}: any) => ({
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: pressed ? '#001833' : '#007aff',
    borderRadius: 8,
    transform: [{scale: pressed ? 1.2 : 1}],
    marginTop: 24,
  }),
  captureButton: {
    backgroundColor: '#ffffffc4',
    borderRadius: 100,
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenC;
