import {View, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../Constantes/Colors';
import {getSize} from 'helpers';
import Font from 'fonts/font';

export default styles = StyleSheet.create({
  parent: {
    // flex: 1,
    // backgroundColor: Colors.backgroundColor,

    alignItems: 'center',
  },
  conatiner: {
    flex: 1,
  },
  avatar: {
    width: getSize(100),
    height: getSize(100),
  },
  containerImageIcon: {
    margin: getSize(5),
    width: getSize(100),
    height: getSize(100),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: getSize(20),
  },
  containerIcon: {
    position: 'absolute',
    backgroundColor: Colors.backgroundColor,
    bottom: getSize(2),
    right: getSize(8),
    borderRadius: getSize(25),
    width: getSize(20),
    height: getSize(21),
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: getSize(0.1),
  },
});
