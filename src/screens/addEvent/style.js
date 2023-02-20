import {View, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../Constantes/Colors';
import {getSize, changeColorOpacity} from 'helpers';
import Font from 'fonts/font';
import font from '../../../resources/font';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';

export default styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  viewTextInput: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  text: {
    color: Colors.white,
    fontFamily: font.MontserratRegular,
    fontSize: getSize(16),
  },
  icon: {
    position: 'absolute',

    top: getSize(0),
    right: getSize(8),
  },
  textInput: {
    color: changeColorOpacity(Colors.white, 60),
    fontFamily: font.MontserratRegular,
    paddingStart: getSize(15),
    paddingVertical: getSize(10),
    fontSize: getSize(15),
  },
  button: {
    alignContent: 'center',
    justifyContent: 'center',
    width: getSize(50),
    height: getSize(50),
    backgroundColor: changeColorOpacity(Colors.priamry, 70),

    alignItems: 'center',

    margin: getSize(15),

    borderRadius: getSize(25),
  },
  button_disabled: {
    alignContent: 'center',
    justifyContent: 'center',
    width: getSize(50),
    height: getSize(50),
    backgroundColor: changeColorOpacity(Colors.gray, 70),

    alignItems: 'center',

    margin: getSize(15),

    borderRadius: getSize(25),
  },
  formOne: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Picker: {
    backgroundColor: changeColorOpacity(Colors.backgroundBar, 20),
    justifyContent: 'center',
    width: getSize(300),
    height: getSize(55),
    borderColor: changeColorOpacity(Colors.border, 20),
    borderWidth: getSize(1),
    borderRadius: getSize(15),
    paddingHorizontal: getSize(10),
  },
  container: {
    flex: 1,
    marginTop: getSize(18),
  },
  item: {
    padding: getSize(10),
    marginHorizontal: getSize(10),
  },
  titleItem: {
    fontSize: getSize(15),
    fontFamily: font.MontserratMedium,
    color: changeColorOpacity(Colors.white, 80),
    paddingVertical: getSize(5),
  },
  title: {
    fontSize: getSize(20),
    fontFamily: font.MontserratBold,
    textAlign: 'center',
    color: changeColorOpacity(Colors.white, 70),
  },
  optionsWrapper: {
    paddingHorizontal: getSize(20),
    paddingVertical: getSize(10),
  },

  textAffiche: {
    fontFamily: font.MontserratRegular,
    color: changeColorOpacity(Colors.gray, 80),
    fontSize: getSize(18),
    paddingLeft: getSize(19),
  },
  pickerOption: {
    flexDirection: 'row',
    paddingTop: getSize(20),
    alignItems: 'center',
  },
  avatar: {
    width: getSize(50),
    height: getSize(50),
    borderColor: changeColorOpacity(Colors.border, 20),
    borderWidth: getSize(1),
    borderRadius: getSize(25),
  },
  containerImageInput: {
    flexDirection: 'row',
  },
  avatarSponsor: {
    width: getSize(40),
    height: getSize(40),
    borderColor: changeColorOpacity(Colors.border, 20),
    borderWidth: getSize(1),
    borderRadius: getSize(25),
    margin: getSize(10),
  },
  Import: {
    justifyContent: 'center',
    alignItems: 'center',
    width: getSize(330),
    height: getSize(150),
    borderStyle: 'dashed',
    borderWidth: getSize(2),
    borderColor: changeColorOpacity(Colors.white, 50),
    borderRadius: getSize(10),
    flexDirection: 'row',
    marginVertical: getSize(10),
  },
  textViedoAffiche: {
    color: changeColorOpacity(Colors.white, 60),
    fontFamily: font.MontserratRegular,
    paddingStart: getSize(15),
    fontSize: getSize(15),
  },
});
