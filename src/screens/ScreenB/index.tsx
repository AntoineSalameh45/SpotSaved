import {View, Text} from 'react-native';
import React from 'react';
import NavigationButton from '../../components/atoms/navigationButton';

const ScreenB = ({navigation}: any) => {
  return (
    <View>
      <Text>Screen B</Text>
      <View>
        <NavigationButton
          navigation={navigation}
          destination="ScreenA"
          buttonText="Go to Screen A"
        />
        <NavigationButton
          navigation={navigation}
          destination="ScreenC"
          buttonText="Go to Screen C"
        />
      </View>
    </View>
  );
};

export default ScreenB;
