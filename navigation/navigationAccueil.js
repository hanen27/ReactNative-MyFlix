import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profil from '../src/screens/profilScreen';
import EditProfil from '../src/screens/editProfil';
import Commentaire from '../src/screens/Commentaire';
import AcceuilScreen from '../src/screens/acceuilScreen';
import DetailsScreen from '../src/screens/DetailsCapsule';
import ListEvent from '../src/screens/ListEvent';
import ProfilStack from './navigationProfil';

const Stack = createNativeStackNavigator();

const AccueilStack = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName={AcceuilScreen}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Accueil" component={AcceuilScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Commentaire" component={Commentaire} />
      <Stack.Screen name="ListEvent" component={ListEvent} />
    </Stack.Navigator>
  );
};
export default AccueilStack;
