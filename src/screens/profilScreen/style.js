import {View, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../Constantes/Colors';
import {getSize, changeColorOpacity} from 'helpers';
import Font from 'fonts/font';
import font from '../../../resources/font';

export default styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,

    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.softOrange,
    borderColor: Colors.border,
    borderWidth: getSize(2),
    borderRadius: getSize(15),
    width: getSize(300),
    height: getSize(330),
    alignItems: 'center',
  },
  avatar: {
    width: getSize(100),
    height: getSize(100),
    borderRadius: getSize(50),
    borderColor: Colors.borderAvatar,
    borderWidth: getSize(2),
  },
  pickerOption: {
    flexDirection: 'row',
    paddingVertical: getSize(10),
    alignItems: 'center',
    backgroundColor: changeColorOpacity(Colors.backgroundBar),
  },
  textSettings: {
    fontFamily: font.MontserratBold,
    color: changeColorOpacity(Colors.white, 70),
    fontSize: getSize(18),
    paddingLeft: getSize(19),
    flex:3
  },

  optionsWrapper: {
    
    paddingHorizontal: getSize(20),
    paddingVertical: getSize(10),
  },
  containerImage: {
    margin: getSize(5),
    width: getSize(100),
    height: getSize(100),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: getSize(55),
  },
  Text: {
    fontFamily: Font.MontserratBold,
    color: Colors.white,
    marginBottom: getSize(10),
    fontSize: getSize(14),
  },
  conatinerText: {
    bottom: getSize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTouchable: {
    width: getSize(300),
  },
  containerFavoris: {
    flexDirection: 'row',
    borderBottomWidth: getSize(0.3),
    borderTopWidth: getSize(0.3),
    borderColor: Colors.gray,
    marginBottom: getSize(15),
    alignItems: 'center',
  },
  containerManger: {
    flexDirection: 'row',
    borderColor: Colors.gray,
    marginBottom: getSize(15),
    alignItems: 'center',
  },
  conatinerParam: {
    flexDirection: 'row',
    borderTopWidth: getSize(0.3),
    borderColor: Colors.gray,
    marginBottom: getSize(3),
    alignItems: 'center',
  },
  TextManager: {
    flex: 13,
    fontFamily: Font.MontserratBold,
    fontSize: getSize(15),
    color: Colors.white,
  },
  TextFavoris: {
    flex: 13,
    fontFamily: Font.MontserratBold,
    fontSize: getSize(15),
    color: Colors.white,
    paddingVertical: getSize(20),
  },
  TextParam: {
    flex: 13,
    fontFamily: Font.MontserratBold,
    fontSize: getSize(15),
    color: Colors.white,
    paddingVertical: getSize(20),
  },
  IconFavoris: {
    flex: 1,
  },
});
