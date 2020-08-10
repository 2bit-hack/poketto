import React from 'react';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './src/screens/MainScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{title: 'poketto', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{title: 'poketto', headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
