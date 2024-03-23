import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ScreenA from '../screens/ScreenA';
import ScreenB from '../screens/ScreenB';
import ScreenC from '../screens/ScreenC';

const MainStackNavigator = createMaterialBottomTabNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator>
      <MainStackNavigator.Screen name="Home" component={ScreenA} />
      <MainStackNavigator.Screen name="Camera" component={ScreenC} />
      <MainStackNavigator.Screen name="Gallery" component={ScreenB} />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
