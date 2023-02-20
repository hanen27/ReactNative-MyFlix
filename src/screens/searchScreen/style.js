import {View, StyleSheet} from 'react-native';
import Colors from '../../Constantes/Colors';
import {getSize} from 'helpers';
import font from '../../../resources/font';
import {changeColorOpacity} from 'helpers';

export default styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  ContainerInput: {
    flexDirection: 'row',
    backgroundColor: Colors.softBlue,
    alignItems: 'center',
    alignSelf: 'center',
    padding: getSize(15),
    borderRadius: getSize(10),
    marginVertical: getSize(20),
    marginHorizontal: getSize(18),
    flex: 1,
    height: getSize(50),
  },
  Title: {
    marginHorizontal: getSize(25),
    marginVertical: getSize(15),
    fontFamily: font.MontserratBold,
    fontSize: getSize(22),
    color: Colors.white,
  },
  showmoreText: {
    marginHorizontal: getSize(15),
    marginVertical: getSize(15),
    fontFamily: font.MontserratMedium,
    fontSize: getSize(12),
    color: Colors.priamry,
    textDecorationLine: 'underline',
  },
  titleText: {
    fontFamily: font.MontserratBold,
    fontSize: getSize(14),
    color: Colors.white,
  },
  icon: {
    justifyContent: 'center',
    height: getSize(50),
  },
  Input: {
    flex: 1,
    color: Colors.white,
    fontFamily: font.MontserratRegular,
  },
  titleText: {
    color: Colors.white,
    fontSize: getSize(12),
    marginBottom: getSize(5),
    fontFamily: font.MontserratMedium,
  },
  dateText: {
    color: changeColorOpacity(Colors.white, 60),
    fontSize: getSize(11),
    fontFamily: font.MontserratMedium,
  },
  locationText: {
    color: changeColorOpacity(Colors.white, 60),
    fontSize: getSize(11),
    fontFamily: font.MontserratMedium,
  },
});
