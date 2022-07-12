import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/main/HomeScreen';
import AddProductScreen from '../screens/main/AddProductScreen';
import EditScreen from '../screens/main/EditScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name="AddProductScreen"
        component={AddProductScreen}
      />

      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name="EditScreen"
        component={EditScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
