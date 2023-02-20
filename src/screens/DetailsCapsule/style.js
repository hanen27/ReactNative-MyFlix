import {StyleSheet} from 'react-native';
import {getSize, changeColorOpacity} from 'helpers';
import Colors from '../../Constantes/Colors';
import font from '../../../resources/font';

export default styles = StyleSheet.create({
  containerViedo: {
    height: getSize(380),
  },
  containerUnder: {
    backgroundColor: Colors.backgroundColor,
  },
  Transparent: {backgroundColor: Colors.backgroundColor},

  containerOne: {
    flexDirection: 'row',
    paddingVertical: getSize(20),
    paddingHorizontal: getSize(15),
  },
  days: {
    color: Colors.gray,
    fontFamily: font.MontserratMedium,
    paddingHorizontal: getSize(10),
  },
  playImage: {
    width: getSize(60),
    height: getSize(60),
    borderRadius: getSize(30),
    borderWidth: getSize(2),
    borderColor: Colors.softOrange,
  },
  itemIcon: {
    width: getSize(40),
    height: getSize(40),
  },
  textIcon: {
    fontFamily: font.MontserratRegular,
    fontSize: getSize(11),
    marginTop: getSize(5),
    color: Colors.white,
    textAlign: 'center',
  },
  Title: {
    fontFamily: font.MontserratBold,
    fontSize: getSize(22),

    marginHorizontal: getSize(10),
    color: Colors.white,
    flex: 1,
  },
  icon: {
    width: getSize(30),
  },
  containerIconText: {
    flexDirection: 'row',
    backgroundColor: '#424e51',
    borderRadius: getSize(5),
    height: getSize(25),
    width: getSize(40),
    alignItems: 'center',
    marginRight: getSize(10),
    alignSelf: 'flex-start',
    marginTop: getSize(5),

    padding: getSize(3),
  },
  Orateurs: {
    color: changeColorOpacity(Colors.white, 50),
    fontSize: getSize(12),
    fontFamily: font.MontserratMedium,
    textAlign: 'center',
    marginTop: getSize(1),
    paddingBottom: getSize(8),
  },
  OrateursComment: {
    color: Colors.white,
    fontSize: getSize(12),
    fontFamily: font.MontserratMedium,
    marginTop: getSize(5),
  },
  dateComment: {
    color: changeColorOpacity(Colors.gray, 50),
    fontSize: getSize(11),
    fontFamily: font.MontserratMedium,
    marginTop: getSize(2),
  },
  textComment: {
    color: changeColorOpacity(Colors.gray, 80),
    fontSize: getSize(11),
    fontFamily: font.MontserratMedium,
    marginTop: getSize(5),
  },
  startText: {
    color: changeColorOpacity(Colors.white, 60),
    fontSize: getSize(12),
    fontFamily: font.MontserratMedium,
    textAlign: 'center',
    color: Colors.white,
    marginStart: getSize(3),
  },
  descriptionText: {
    color: changeColorOpacity(Colors.white, 60),
    fontSize: getSize(13),
    fontFamily: font.MontserratMedium,
    marginHorizontal: getSize(10),
    marginVertical: getSize(10),
  },
  dateText: {
    color: changeColorOpacity(Colors.white, 70),
    fontSize: getSize(13),
    fontFamily: font.MontserratMedium,
    marginHorizontal: getSize(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    height: getSize(180),
    width: getSize(300),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: getSize(20),
  },

  textStyle: {
    color: Colors.white,
    fontFamily: font.MontserratBold,
    fontSize: getSize(18),

    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontFamily: font.MontserratBold,
    color: Colors.gray,
    fontSize: getSize(20),
    paddingBottom: getSize(20),
  },
});
