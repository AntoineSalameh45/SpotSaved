import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './RootStackParamList';
import Home from '../screens/Home';
import CameraScreen from '../screens/Camera';
import MyTabBar from '../components/organisms/CustomTabBar';
import AlbumGallery from '../screens/AlbumGallery';
import PhotoList from '../screens/ApiScreen2';

const MainStackNavigator = createBottomTabNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator tabBar={props => <MyTabBar {...props} />}>
      <MainStackNavigator.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Camera"
        component={CameraScreen}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Gallery"
        component={AlbumGallery}
        options={{headerShown: false}}
      />
      <MainStackNavigator.Screen
        name="Mock Gallery"
        component={PhotoList}
        options={{headerShown: false}}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
