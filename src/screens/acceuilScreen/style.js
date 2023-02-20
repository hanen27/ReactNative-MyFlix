import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getSize, changeColorOpacity} from 'helpers';
import Colors from '../../Constantes/Colors';
import Font from '../../../resources/font';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  sectionHeader: {
    fontSize: getSize(18),
    color: Colors.white,
    paddingHorizontal: getSize(20),
    paddingVertical: getSize(5),
    fontFamily: Font.MontserratBold,
  },
  item: {
    flexDirection: 'column',
    flex: 1,
    marginStart: getSize(10),
    marginVertical: getSize(10),
  },
  itemEvent: {
    marginStart: getSize(10),
    marginVertical: getSize(10),
    flexDirection: 'column',
    borderRadius: getSize(5),
    borderColor: '#355263',
    borderWidth: getSize(1),
  },
  itemViewEvent: {
    flex: 1,
    /*     paddingBottom: getSize(10),
     */
    justifyContent: 'center',
  },
  itemPhoto: {
    width: getSize(150),
    height: getSize(150),
    borderRadius: getSize(5),
    borderWidth: getSize(2),
    borderColor: '#355263',
  },
  photoUser: {
    width: getSize(50),
    height: getSize(50),
    borderRadius: getSize(25),
    borderWidth: getSize(2),
    borderColor: '#355263',
  },
  afficheImage: {
    width: getSize(30),
    height: getSize(30),
    borderRadius: getSize(15),
    borderWidth: getSize(2),
    borderColor: changeColorOpacity(Colors.gray, 30),
  },
  playImage: {
    width: getSize(30),
    height: getSize(30),
    position: 'absolute',
    left: getSize(10),
    bottom: getSize(10),
    backgroundColor: changeColorOpacity(Colors.gray, 55),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  itemPhotoEvent: {
    flex: 1,
    height: getSize(330),
    justifyContent: 'flex-end',
    borderRadius: getSize(5),
  },
  itemButton: {
    color: 'white',
    fontFamily: Font.MontserratBold,
  },
  itemTouchableEvent: {
    backgroundColor: '#e6621a',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: getSize(15),
    width: getSize(50),
    borderRadius: getSize(25),
    marginHorizontal: getSize(20),
  },

  itemPhotoHeader: {
    width: getSize(50),
    height: getSize(50),
    borderRadius: getSize(25),
    borderWidth: getSize(2),
  },
  itemText: {
    color: Colors.white,
    marginStart: getSize(20),
    marginStart: getSize(20),

    fontSize: getSize(20),
    fontFamily: Font.MontserratMedium,
  },
  itemText2: {
    color: Colors.white,
    fontSize: getSize(26),
    fontFamily: Font.MontserratMedium,
    marginStart: getSize(20),

    alignSelf: 'flex-start',
  },
  itemTextVoir: {
    color: Colors.white,
    fontSize: getSize(20),
    fontFamily: Font.MontserratMedium,
  },
  containerText: {
    marginEnd: getSize(20),
    marginBottom: getSize(20),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerIconText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: getSize(10),
    marginBottom: getSize(10),
  },
  Date: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextUnderPhoto: {
    color: Colors.white,
    paddingLeft: getSize(7),
    fontSize: getSize(14),
    marginBottom: getSize(3),
    fontFamily: Font.MontserratMedium,
  },
  icon: {
    paddingLeft: getSize(7),
    marginBottom: getSize(3),
  },
  containerSecondaireIconText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 2,
  },
  containerGlobaleIconText: {
    flexDirection: 'row',
  },
});
