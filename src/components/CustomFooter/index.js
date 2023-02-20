import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Constantes/Colors';
import {changeColorOpacity, getSize} from 'helpers';

const Footer = () => {
  return (
    <LinearGradient
      colors={[
        changeColorOpacity(Colors.backgroundColor, 0),
        changeColorOpacity(Colors.backgroundColor, 86),
        changeColorOpacity(Colors.backgroundColor, 100),
      ]}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: getSize(90),
      }}
    />
  );
};

export default Footer;
