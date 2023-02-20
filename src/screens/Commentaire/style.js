import {View, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../Constantes/Colors';
import {getSize, changeColorOpacity} from 'helpers';
import font from 'fonts/font';

export default styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.backgroundColor,
    // flex:1,
  },
  conatiner: {
    bottom: getSize(50),
  },
  OrateursComment: {
    color: Colors.white,
    fontSize: getSize(12),
    fontFamily: font.MontserratMedium,
    marginStart: getSize(5),
    marginTop: getSize(5),
  },
  dateComment: {
    color: changeColorOpacity(Colors.white, 50),
    fontSize: getSize(11),
    fontFamily: font.MontserratMedium,
    marginTop: getSize(2),
    marginStart: getSize(5),
  },
  textComment: {
    color: changeColorOpacity(Colors.white, 70),
    fontSize: getSize(11),
    fontFamily: font.MontserratMedium,
    marginTop: getSize(5),
    marginStart: getSize(10),
    marginTop: getSize(5),
  },
  containerIcon: {
    position: 'absolute',
    backgroundColor: Colors.white,
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
