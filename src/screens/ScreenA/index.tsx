import {View, Text} from 'react-native';
import React from 'react';
import NavigationButton from '../../components/atoms/navigationButton';
import styles from '../../GlobalStyles';

const ScreenA = ({navigation}: any) => {
  return (
    <View style={styles.viewContainer}>
      <Text>Screen A</Text>
      <View>
        <NavigationButton
          navigation={navigation}
          destination="ScreenB"
          buttonText="Go to Screen B"
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

export default ScreenA;
