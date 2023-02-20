import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {View, Image,Platform} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {NavigationContainer} from '@react-navigation/native';
import AcceuilScreen from '../src/screens/acceuilScreen';
import FavorisScreen from '../src/screens/favorisScreen';
import Profil from '../src/screens/profilScreen';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../src/config.json';
import SearchScreen from '../src/screens/searchScreen';
import Colors from '../src/Constantes/Colors';
import {getSize, changeColorOpacity} from 'helpers';
import font from '../resources/font';
import TabIcon from '../src/components/CustomBottemTab';
import ProfilStack from './navigationProfil';
import StringsFr from '../src/Constantes/langue/fr';
import AccueilStack from './navigationAccueil';
import SearchStack from './navigationSearch';
import FavorisStack from './navigationFavoris';
import AddEvent from '../src/screens/addEvent';
import {AuthContext} from '../src/store/auth-context';
import {useContext, useEffect} from 'react';

const Tab = createBottomTabNavigator();

const Icon = createIconSetFromFontello(fontelloConfig);

const BottomTab = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'AccueilStack'}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          options={({route}) => ({
            tabBarStyle: returnStyleTabBarScreen(route),
            tabBarIcon: ({focused}) => (
              <TabIcon
                text={StringsFr.Home}
                name={focused ? 'home' : 'home-outline'}
                color={focused ? Colors.priamry : Colors.white}
                size={18}
              />
            ),
          })}
          name="AccueilStack"
          component={AccueilStack}
        />
        <Tab.Screen
          options={({route}) => ({
            tabBarStyle: returnStyleTabBarScreen(route),
            tabBarIcon: ({focused}) => (
              <TabIcon
                text={StringsFr.Favoris}
                name={focused ? 'heart' : 'heart-empty'}
                color={focused ? Colors.priamry : Colors.white}
                size={22}
              />
            ),
          })}
          name={StringsFr.Favoris}
          component={FavorisStack}
        />
        {authCtx.isManager && (
          <Tab.Screen
            initialRouteName={'add'}
            options={({route}) => ({
              tabBarStyle: returnStyleTabBarScreen(route),
              tabBarIcon: ({focused}) => {
                if (Platform.OS=='ios') {
                  return( <View style={{alignItems:'center'}}>
                  <Image
                    source={require('../assets/LogoApp/MicrosoftTeams-image.png')}
                    style={{
                      top: getSize(-4),
                      // right:0,
                      // left:0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      height: getSize(58),

                      // width:'100%',
                      // height: 58,
                      position:'absolute',
                      // backgroundColor: 'red',
                      // borderRadius: 35,
                    }}
                    resizeMode={'contain'}
                  />
                  <View
                    style={{
                      width: getSize(48),
                      height: getSize(48),
                      backgroundColor: Colors.priamry,
                      // position: 'absolute',
                      borderRadius: getSize(24),
                      bottom: getSize(25),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name={'plus-1'} size={25} color={Colors.white} />
                  </View>
                </View>)
                }else{
                  return(
                    <>
                  <Image
                    source={require('../assets/LogoApp/MicrosoftTeams-image.png')}
                    style={{
                      // top: -25,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      height: 58,
                      backgroundColor: 'transparent',
                      // borderRadius: 35,
                    }}
                    resizeMode={'contain'}
                  />
                  <View
                    style={{
                      width: getSize(48),
                      height: getSize(48),
                      backgroundColor: Colors.priamry,
                      position: 'absolute',
                      borderRadius: getSize(24),
                      bottom: getSize(25),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon name={'plus-1'} size={25} color={Colors.white} />
                  </View>
                </>
                  )
                }
              }
                
            })}
            name={'add'}
            component={AddEvent}
          />
        )}
        <Tab.Screen
          options={({route}) => ({
            tabBarStyle: returnStyleTabBarScreen(route),
            tabBarIcon: ({focused}) => (
              <TabIcon
                text={StringsFr.search}
                name="search"
                size={20}
                color={focused ? Colors.priamry : Colors.white}
              />
            ),
          })}
          name="SearchStack"
          component={SearchStack}
        />
        <Tab.Screen
          options={({route}) => ({
            tabBarStyle: returnStyleTabBarScreen(route),
            tabBarIcon: ({focused}) => (
              <TabIcon
                text={StringsFr.Profile}
                size={18}
                name={focused ? 'user-3' : 'user-outline'}
                color={focused ? Colors.priamry : Colors.white}
              />
            ),
          })}
          name="ProfilStack"
          component={ProfilStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName === 'ChangePassword' ||
    routeName === 'Modifier' ||
    routeName === 'Details' ||
    routeName === 'ListEvent' ||
    routeName === 'Commentaire' ||
    routeName === 'Search' ||
    routeName === 'ShowAll' ||
    routeName === 'Saved' ||
    route.name === 'add'
  ) {
    return 'none';
  }
  return 'flex';
};

const returnStyleTabBarScreen = route => {
  return {
    display: getTabBarVisibility(route),
    backgroundColor: 'transparent',
    height: getSize(58),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: getSize(16),
    right: getSize(12),
    left: getSize(12),
    borderRadius: getSize(25),
    borderTopWidth: 0,
    elevation: 0,
  };
};
export default BottomTab;
