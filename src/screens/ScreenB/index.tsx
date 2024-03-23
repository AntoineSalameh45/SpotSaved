import {View, Text} from 'react-native';
import React from 'react';
import styles from '../../GlobalStyles';
import NavigationButton from '../../components/atoms/navigationButton';

const ScrenB = ({navigation}: any) => {
  return (
    <View style={styles.viewContainer}>
      <Text>ScrenB</Text>
      <View>
        <NavigationButton
          navigation={navigation}
          destination="ScreenA"
          buttonText="Go to Screen A"
        />
        <NavigationButton
          navigation={navigation}
          destination="Camera"
          buttonText="Go to Camera"
        />
      </View>
    </View>
  );
};

export default ScrenB;
