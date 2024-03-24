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
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import styles from '../../GlobalStyles';
import camStyles from './styles';

const CameraScreen = ({navigation}: any) => {
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

  const saveImage = async () => {
    await CameraRoll.saveAsset(capturedImage!, {type: 'photo'}).then(() => {
      Alert.alert('Success', 'Photo saved successfully', [
        {style: 'cancel', text: 'cancel'},
        {
          text: 'See Photos',
          onPress: () => {
            navigation.navigate('Gallery');
          },
        },
      ]);
    });
  };

  if (device === null) {
    return (
      <View style={camStyles.mainView}>
        <Text style={{fontSize: 20, color: 'red'}}>
          Camera feature not supported
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={camStyles.mainView}>
      {capturedImage ? (
        <>
          <View style={camStyles.capturedImageContainer}>
            <Image
              source={{uri: capturedImage}}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>

          <Pressable
            onPress={() => {
              setCapturedImage(null);
            }}
            style={camStyles.button}>
            <Text style={{fontSize: 20, color: '#fff'}}>Clear image</Text>
          </Pressable>
          <Pressable onPress={saveImage} style={camStyles.button}>
            <Text style={{fontSize: 20, color: '#fff'}}>
              Save to camera roll
            </Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={handleCameraPermission} style={camStyles.button}>
          <Text style={{fontSize: 20, color: '#fff'}}>
            {hasPermission ? 'Open camera' : 'Request camera access'}
          </Text>
        </Pressable>
      )}

      {isCameraVisible && (
        <>
          <View style={styles.cameraButtons}>
            <Pressable onPress={closeCamera}>
              <Text style={camStyles.otherButtons}>X</Text>
            </Pressable>
            <Pressable onPress={toggleCameraDevice}>
              <Text style={camStyles.otherButtons}>Switch</Text>
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
            <Pressable onPress={takePhoto}>
              <View style={camStyles.captureButton} />
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
export default CameraScreen;
