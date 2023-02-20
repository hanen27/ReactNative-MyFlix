import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../src/screens/signInScreen';
import SignUp from '../src/screens/signUpScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SignIn}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Connexion" component={SignIn} />
        <Stack.Screen name="Inscription" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
