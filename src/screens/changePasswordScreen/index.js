import {View, TouchableOpacity, Image, Alert, SafeAreaView} from 'react-native';
import React from 'react';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import StringsFr from '../../Constantes/langue/fr';
import {getSize} from 'helpers';
import styles from './style';
import Input from '../../components/CustomInput';
import Button from '../../components/CustomButton';
import {useState} from 'react';
import HeaderIcon from '../../components/CustomHeader/headerIcon';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, selectUser} from '../../Redux/user';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Colors from '../../Constantes/Colors';

const Icon = createIconSetFromFontello(fontelloConfig);

const ChangePassword = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPssword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const reauthenticate = currentPassword => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };
  const changePassword = (currentPassword, newPassword) => {
    reauthenticate(currentPassword)
      .then(() => {
        var authUser = auth().currentUser;
        authUser
          .updatePassword(newPassword)
          .then(() => {
            console.log('Password updated!');
            firestore()
              .collection('Users')
              .doc(user.token)
              .update({
                password: newPassword,
              })
              .then(() => {
                firestore()
                  .collection('Users')
                  .doc(user.token)
                  .get()
                  .then(res => {
                    console.log('res', res._data);
                    setIsLoading(false);
                    dispatch(
                      setUser({
                        email: res._data.email,
                        password: res._data.password,
                        prenom: res._data.prenom,
                        nom: res._data.nom,
                        userId: res._data.userId,
                        manager: res._data.manager,
                        avatar: res._data.avatar,
                        token: res._data.token,
                      }),
                    );
                  });
                console.log('User updated!');
                Alert.alert('', StringsFr.succesUpdatePassword, [
                  {text: 'OK', onPress: () => navigation.goBack()},
                ]);
              })
              .catch(er => setIsLoading(false));
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  const ChangePasswordAction = () => {
    var PASSWORD_REGEX =
      /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20})$/;
    if (newPassword.length < 6 || PASSWORD_REGEX.test(newPassword) === false) {
      Alert.alert('', StringsFr.paswwordIncorrect, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    if (oldPassword == newPassword) {
      Alert.alert('', 'Vous avez saisi le méme ancien mot de passe ', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else if (user.password == oldPassword) {
      changePassword(oldPassword, newPassword);
    } else {
      Alert.alert('', StringsFr.ancienPassword, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: Colors.backgroundColor, flex: 1}}>
      <HeaderIcon
        style="Edit"
        text={StringsFr.ChangeMdp}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.parent}>
        <Input
          style={'SigIn'}
          placeholder={StringsFr.password}
          secureTextEntry={passwordVisible}
          leftIcon="key"
          leftSizeIcon={getSize(13)}
          onPress={() => setPasswordVisible(!passwordVisible)}
          rightIcon={passwordVisible ? 'eye-off' : 'eye'}
          rightSizeIcon={getSize(13)}
          onchangeText={text => setOldPassword(text)}
        />
        <Input
          style={'SigIn'}
          placeholder={StringsFr.newPassword}
          secureTextEntry={passwordVisible}
          leftIcon="key"
          leftSizeIcon={getSize(13)}
          onPress={() => setPasswordVisible(!passwordVisible)}
          rightIcon={passwordVisible ? 'eye-off' : 'eye'}
          rightSizeIcon={getSize(13)}
          onchangeText={text => setNewPssword(text)}
        />

        <Button
          text={StringsFr.Validate}
          type="PRIMARY"
          onPress={ChangePasswordAction}
          isLoading={isLoading}
          disabled={oldPassword == '' || newPassword == ''}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
