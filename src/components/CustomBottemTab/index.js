import {View, Text} from 'react-native';
import React from 'react';
import fontelloConfig from '../../config.json';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import Colors from '../../Constantes/Colors';
import {getSize, changeColorOpacity} from 'helpers';

const Icon = createIconSetFromFontello(fontelloConfig);
const TabIcon = ({name, text, color, size}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: getSize(58),
        width: '100%',
        backgroundColor: Colors.backgroundBar,
        borderBottomStartRadius: text == 'Accueil' ? getSize(20) : 0,
        borderTopStartRadius: text == 'Accueil' ? getSize(20) : 0,
        borderBottomEndRadius: text == 'Profil' ? getSize(20) : 0,
        borderTopEndRadius: text == 'Profil' ? getSize(20) : 0,
      }}>
      <Icon name={name} size={size} color={color} />
      <Text
        style={{
          fontSize: getSize(11),

          color: color,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default TabIcon;
