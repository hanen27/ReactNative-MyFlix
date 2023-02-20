import {View, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../Constantes/Colors';
import {getSize, changeColorOpacity} from 'helpers';
import Font from '../../../resources/font';

export default styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  titleText: {
    color: Colors.white,
    fontSize: getSize(16),
    marginBottom: getSize(5),
    fontFamily: Font.MontserratMedium,
  },
  dateText: {
    color: Colors.borderItem,
    fontSize: getSize(14),
    marginBottom: getSize(4),
    fontFamily: Font.MontserratMedium,
  },
  locationText: {
    color: Colors.borderItem,
    fontSize: getSize(14),
    marginBottom: getSize(4),
    fontFamily: Font.MontserratMedium,
  },
});
