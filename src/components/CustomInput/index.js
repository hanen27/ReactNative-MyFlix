import {View, TextInput, Pressable} from 'react-native';
import React from 'react';
import CustomIcon from '../CustomBottemTab';
import styles from './style';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import {useState} from 'react';
import Colors from '../../Constantes/Colors';
import {getSize, changeColorOpacity} from 'helpers';

const Icon = createIconSetFromFontello(fontelloConfig);
const Input = ({
  placeholder,
  leftIcon,
  leftSizeIcon,
  rightSizeIcon,
  type,
  keyboardType,
  style,
  onPressIn,
  onchangeText,
  value,
  defaultValue,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(!!rightSizeIcon);

  return (
    <View style={styles[`conatiner_${style}`]}>
      <Icon
        name={leftIcon}
        size={leftSizeIcon}
        style={styles.iconLeft}
        color={Colors.white}
      />
      <TextInput
        style={[styles.input, styles[`input_${style}`]]}
        placeholder={placeholder}
        defaultValue={defaultValue}
        secureTextEntry={passwordVisible}
        selectionColor={Colors.priamry}
        onPressIn={onPressIn}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType}
        onChangeText={onchangeText}
        value={value}
        placeholderTextColor={changeColorOpacity(Colors.white, 65)}
      />
      {rightSizeIcon && (
        <Pressable
          hitSlop={{
            top: getSize(12),
            bottom: getSize(12),
            left: getSize(12),
            right: getSize(12),
          }}
          style={styles.iconRight}
          onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            color={Colors.white}
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={rightSizeIcon}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Input;
