import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import React from 'react';
import AuthNavigator from './auth';
import {isReadyRef, navigationRef} from './Navigator';

export default function Navigations() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <AuthNavigator />
      </NavigationContainer>
    </View>
  );
}
