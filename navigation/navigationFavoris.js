import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DetailsScreen from '../src/screens/DetailsCapsule';
import FavorisScreen from '../src/screens/favorisScreen';

const Stack = createNativeStackNavigator();

const FavorisStack = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName={'Favoris'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Favoris" component={FavorisScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};
export default FavorisStack;
