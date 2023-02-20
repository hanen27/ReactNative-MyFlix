import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../src/screens/searchScreen';
import SearchDeatils from '../src/screens/searchScreen/Search';
import ListEvent from '../src/screens/ListEvent';
import ShowAll from '../src/screens/searchScreen/ShowAll';
import DetailsScreen from '../src/screens/DetailsCapsule';

const Stack = createNativeStackNavigator();

const SearchStack = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName={SearchScreen}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Recherche" component={SearchScreen} />
      <Stack.Screen name="Search" component={SearchDeatils} />
      <Stack.Screen name="ListEvent" component={ListEvent} />
      <Stack.Screen name="ShowAll" component={ShowAll} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};
export default SearchStack;
