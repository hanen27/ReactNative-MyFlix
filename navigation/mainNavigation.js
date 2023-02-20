import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setUser} from '../src/Redux/user';
import SignUp from '../src/screens/signUpScreen';
import firestore from '@react-native-firebase/firestore';
import {useContext, useState} from 'react';
import {AuthContext} from '../src/store/auth-context';
import BottomTab from './BottomTab';
import MyStack from './navigationSign';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import {useDispatch, useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  async function fetchToken() {
    try {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        firestore()
          .collection('Users')
          .doc(storedToken)
          .get()
          .then(res => {
            dispatch(
              setUser({
                email: res._data.email,
                password: res._data.password,
                prenom: res._data.prenom,
                nom: res._data.nom,
                userId: res._data.userId,
                manager: res._data.manager,
                avatar: res._data.avatar,
                token: res._data.token,
              }),
            );
            console.log('manager', res._data.manager);
            if (res._data.manager == 2) {
              authCtx.DevnirManager(2);
            }
            authCtx.authenticate(storedToken);
            setTimeout(() => SplashScreen.hide(), 2000);
          });
      } else {
        setTimeout(() => SplashScreen.hide(), 2000);
      }
    } catch (e) {
      SplashScreen.hide();
    }
  }
  useEffect(() => {
    fetchToken();
  }, []);
  return <>{authCtx.isAuthenticated ? <BottomTab /> : <MyStack />}</>;
};
export default MainStack;
