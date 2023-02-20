import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Profil from '../src/screens/profilScreen';
import EditProfil from '../src/screens/editProfil';
import ChangePassword from '../src/screens/changePasswordScreen';
import FavorisScreen from '../src/screens/favorisScreen';
import FavorisStack from './navigationFavoris';
import SavedScreen from '../src/screens/SavedScreen/saved';
import SignIn from '../src/screens/signInScreen';
import MyEvent from '../src/screens/myEvent';

const Stack = createNativeStackNavigator();

const ProfilStack = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName={Profil}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="profil" component={Profil} />
      <Stack.Screen name="Modifier" component={EditProfil} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Saved" component={SavedScreen} />
      <Stack.Screen name="MyEvent" component={MyEvent} />
    </Stack.Navigator>
  );
};
export default ProfilStack;
