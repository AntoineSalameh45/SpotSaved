import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CameraSvg from '../../assets/CameraSvg.svg';
import SaveSvg from '../../assets/SaveSvg.svg';
import ShareSvg from '../../assets/ShareSvg.svg';
import InfoSvg from '../../assets/InfoSvg.svg';

const CameraButtonsHint = () => {
  return (
    <View style={hintStyle.hintContainer}>
      <InfoSvg height={30} width={30} style={hintStyle.infoSvg} />
      <View style={hintStyle.hintRow}>
        <SaveSvg height={20} width={20} />
        <Text style={hintStyle.hintText}>Save the photo locally</Text>
      </View>
      <View style={hintStyle.hintRow}>
        <ShareSvg height={20} width={20} />
        <Text style={hintStyle.hintText}>Save the photo to the api</Text>
      </View>
      <View style={hintStyle.hintRow}>
        <CameraSvg height={20} width={20} />
        <Text style={hintStyle.hintText}>Go back to camera</Text>
      </View>
    </View>
  );
};

export default CameraButtonsHint;

const hintStyle = StyleSheet.create({
  hintContainer: {
    marginTop: 50,
    marginLeft: 20,
    alignSelf: 'center',
    backgroundColor: '#0C3B2E',
    width: '60%',
    padding: 10,
    borderRadius: 10,
  },
  hintText: {marginLeft: 10, color: '#fff'},
  hintRow: {flexDirection: 'row'},
  infoSvg: {alignSelf: 'center', marginBottom: 10},
});
