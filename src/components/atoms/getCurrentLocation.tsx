'use strict';

import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default function GetCurrentLocation() {
  const [position, setPosition] = useState<string | null>(null);
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos: {coords: {latitude: any; longitude: any}}) => {
        const {latitude, longitude} = pos.coords;
        setPosition(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      (error: any) =>
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  return (
    <View>
      <Text>
        <Text style={styles.title}>Current position: </Text>
        {position}
      </Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});
