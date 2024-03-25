import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './RootStackParamList';
import ScreenA from '../screens/ScreenA';
import ScreenB from '../screens/ScreenB';
import CameraScreen from '../screens/Camera';
import MyTabBar from '../components/organisms/CustomTabBar';
import AlbumGallery from '../screens/AlbumGallery';

const MainStackNavigator = createBottomTabNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator tabBar={props => <MyTabBar {...props} />}>
      <MainStackNavigator.Screen
        name="Home"
        component={ScreenA}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Camera"
        component={CameraScreen}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Api"
        component={ScreenB}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Gallery"
        component={AlbumGallery}
        options={{headerShown: false}}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
