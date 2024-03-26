import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/mainNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableLatestRenderer} from 'react-native-maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

enableLatestRenderer();

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
