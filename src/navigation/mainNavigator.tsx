import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenA from '../screens/ScreenA';
import ScreenB from '../screens/ScreenB';
import ScreenC from '../screens/ScreenC';
const MainStackNavigator = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen name="ScreenA" component={ScreenA} />
      <MainStackNavigator.Screen name="ScreenB" component={ScreenB} />
      <MainStackNavigator.Screen name="ScreenC" component={ScreenC} />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
