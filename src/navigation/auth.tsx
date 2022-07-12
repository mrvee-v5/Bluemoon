import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppContext} from '../context/app-context/App.context';
import HomeStack from './main';
import LoginScreen from '../screens/auth/LoginScreen';
const Stack = createNativeStackNavigator();

const Auth = () => {
  const {currentUser} = useContext(AppContext);
  console.log('CURRENT USER ===', currentUser);
  return (
    <Stack.Navigator
      initialRouteName={currentUser ? 'HomeScreen' : 'LoginScreen'}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HomeScreen"
        component={HomeStack}
      />
    </Stack.Navigator>
  );
};

export default Auth;
