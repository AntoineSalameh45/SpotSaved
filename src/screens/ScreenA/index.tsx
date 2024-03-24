import {View, Text} from 'react-native';
import React from 'react';
import styles from '../../GlobalStyles';
import CameraIcon from '../../assets/CameraSvg.svg';

const ScreenA = () => {
  return (
    <View style={styles.viewContainer}>
      <Text>Screen A</Text>
      <CameraIcon width={100} height={100} />
    </View>
  );
};

export default ScreenA;
