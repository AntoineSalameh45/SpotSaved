import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import NavigationButton from '../../components/atoms/navigationButton';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

const ScreenC = ({navigation}: any) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const device = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      setIsActive(true);
    })();
  }, []);
  return (
    <View style={{backgroundColor: "red",}}>
      <Text>Screen C</Text>
      <View style={{flex: 1}}>
        {device != null && hasPermission && (
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              isActive={isActive}
              device={device}
            />
          </>
        )}
      </View>
      <View>
        <NavigationButton
          navigation={navigation}
          destination="ScreenA"
          buttonText="Go to Screen A"
        />
        <NavigationButton
          navigation={navigation}
          destination="ScreenB"
          buttonText="Go to Screen B"
        />
      </View>
    </View>
  );
};

export default ScreenC;
