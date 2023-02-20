import React from 'react';
import {StyleSheet} from 'react-native';
import {getSize, changeColorOpacity} from 'helpers';
import Colors from '../../Constantes/Colors';

export default styles = StyleSheet.create({
  conatiner_SigIn: {
    flexDirection: 'row',
    backgroundColor: changeColorOpacity(Colors.backgroundBar, 20),
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: getSize(300),
    height: getSize(48),
    borderColor: changeColorOpacity(Colors.border, 20),
    borderWidth: getSize(1),
    borderRadius: getSize(15),
    paddingHorizontal: getSize(10),
    marginVertical: getSize(20),
    marginBottom: getSize(7),
    paddingLeft: getSize(15),
  },
  conatiner_TERTIARY: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: getSize(135),
    height: getSize(48),
    borderColor: Colors.border,
    borderWidth: getSize(2),
    borderRadius: getSize(20),
    paddingHorizontal: getSize(10),
    marginleft: getSize(20),
    marginRight: getSize(10),
    marginBottom: getSize(7),
  },
  iconRight: {
    flex: 1,
    alignItems: 'center',
  },
  iconLeft: {
    flex: 1,
  },
  input: {
    flex: 14,
    color: Colors.white,
  },
  input_TERTIARY: {
    flex: 7,
  },
  input_ADD: {
    color: Colors.white,
  },
  input_ADDSmall: {
    color: Colors.white,
  },
  conatiner_ADD: {
    backgroundColor: changeColorOpacity(Colors.backgroundBar, 20),
    width: getSize(300),
    height: getSize(55),
    borderColor: changeColorOpacity(Colors.border, 20),
    borderWidth: getSize(1),
    borderRadius: getSize(15),
    paddingHorizontal: getSize(10),
  },
  conatiner_ADDSmall: {
    backgroundColor: changeColorOpacity(Colors.backgroundBar, 20),
    width: getSize(270),
    height: getSize(55),
    borderColor: changeColorOpacity(Colors.border, 20),
    borderWidth: getSize(1),
    borderRadius: getSize(15),
    paddingHorizontal: getSize(10),
    marginBottom: getSize(10),
  },
  conatiner_ADDSponsors: {
    backgroundColor: changeColorOpacity(Colors.backgroundBar, 20),
    width: getSize(218),
    height: getSize(55),
    borderColor: changeColorOpacity(Colors.border, 20),
    borderWidth: getSize(1),
    borderRadius: getSize(15),
    paddingHorizontal: getSize(10),
    marginBottom: getSize(10),
  },
});
