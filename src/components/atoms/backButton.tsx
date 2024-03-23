import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from '../../styles';

interface BackButtonProps {
  navigation: any;
}

const BackButton: React.FC<BackButtonProps> = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Text style={styles.buttonText}>Go Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
