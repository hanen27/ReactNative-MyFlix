import {View, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../Constantes/Colors';
import {getSize, changeColorOpacity} from 'helpers';
import font from '../../../resources/font';

export default styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  conatiner: {
    flex: 1,
    paddingTop: getSize(55),
  },
  pickerOption: {
    flexDirection: 'row',
    paddingTop: getSize(20),
    alignItems: 'center',
  },

  optionsWrapper: {
    paddingHorizontal: getSize(20),
    paddingVertical: getSize(10),
  },

  text: {
    fontFamily: font.MontserratRegular,
    color: changeColorOpacity(Colors.gray, 80),
    fontSize: getSize(18),
    paddingLeft: getSize(19),
  },
  avatar: {
    width: getSize(100),
    height: getSize(100),
    borderRadius: getSize(50),
    borderColor: '#9B9B9B',
    borderWidth: getSize(2),
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
