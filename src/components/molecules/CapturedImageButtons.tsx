import React from 'react';
import {View, Pressable} from 'react-native';
import CameraSvg from '../../assets/CameraSvg.svg';
import SaveSvg from '../../assets/SaveSvg.svg';
import ShareSvg from '../../assets/ShareSvg.svg';
import camStyles from '../../screens/Camera/styles';

interface iCapturedImageButtonsProps {
  onOpenCamera: () => void;
  onShareToApi: () => void;
  onSaveImage: () => void;
}

const CapturedImageButtons: React.FC<iCapturedImageButtonsProps> = ({
  onOpenCamera,
  onShareToApi,
  onSaveImage,
}) => {
  return (
    <View style={camStyles.capturedButtonsContainer}>
      <Pressable onPress={onOpenCamera}>
        <CameraSvg width={30} height={30} />
      </Pressable>
      <Pressable onPress={onShareToApi}>
        <ShareSvg width={30} height={30} />
      </Pressable>
      <Pressable onPress={onSaveImage}>
        <SaveSvg width={30} height={30} />
      </Pressable>
    </View>
  );
};

export default CapturedImageButtons;
