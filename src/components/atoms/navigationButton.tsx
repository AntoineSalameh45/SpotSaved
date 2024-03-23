import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface NavigationButtonProps {
  navigation: any;
  destination: string;
  buttonText: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  navigation,
  destination,
  buttonText,
}) => {
  const handlePress = () => {
    navigation.navigate(destination);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default NavigationButton;
