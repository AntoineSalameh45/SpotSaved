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
import CamFlip from '../../assets/CameraFlipSvg.svg';
import Close from '../../assets/CloseSvg.svg';
import CameraSvg from '../../assets/CameraSvg.svg';
import SaveSvg from '../../assets/SaveSvg.svg';
import Discard from '../../assets/DiscardSvg.svg';

const CameraScreen = ({navigation}: any) => {
  const {requestPermission} = useCameraPermission();
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
        {
          style: 'cancel',
          text: 'cancel',
          onPress: () => {
            setCapturedImage(null);
            openCamera();
          },
        },
        {
          text: 'See Photos',
          onPress: () => {
            navigation.navigate('Gallery');
            setCapturedImage(null);
            openCamera();
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
          <View style={camStyles.capturedButtonsContainer}>
            <Pressable
              onPress={() => {
                setCapturedImage(null);
                openCamera();
              }}>
              <Discard width={30} height={30} />
            </Pressable>
            <Pressable onPress={saveImage}>
              <SaveSvg width={30} height={30} />
            </Pressable>
          </View>
        </>
      ) : (
        <Pressable
          onPress={handleCameraPermission}
          style={camStyles.openCameraButton}>
          <CameraSvg width={40} height={40} />
        </Pressable>
      )}

      {isCameraVisible && (
        <>
          <View style={styles.cameraButtons}>
            <Pressable onPress={closeCamera}>
              <Close width={30} height={30} />
            </Pressable>
            <Pressable onPress={toggleCameraDevice}>
              <CamFlip width={30} height={30} />
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
