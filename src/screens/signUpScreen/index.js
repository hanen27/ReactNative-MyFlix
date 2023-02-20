import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import styles from './style';
import Input from '../../components/CustomInput';
import Button from '../../components/CustomButton';
import Title from '../../components/CustomTitle';
import {useState, useContext} from 'react';
import {getSize} from 'helpers';
import StringsFr from '../../Constantes/langue/fr';
import Colors from '../../Constantes/Colors';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import HeaderIcon from '../../components/CustomHeader/headerIcon';
import firestore from '@react-native-firebase/firestore';
import {BallIndicator, BarIndicator} from 'react-native-indicators';
const Icon = createIconSetFromFontello(fontelloConfig);
import {AuthContext} from '../../store/auth-context';
import {setUser} from '../../Redux/user';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
const SignUp = ({navigation}) => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const validation = () => {
    const strongRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );

    var PASSWORD_REGEX =
      /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20})$/;
    var name_regex = /^[A-Za-z ]+$/;
    if (name_regex.test(nom) == false) {
      console.log('wrong name');
      setIsLoading(false);

      Alert.alert(' ', StringsFr.nameIncorrecte, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return false;
    }
    if (name_regex.test(prenom) == false) {
      console.log('wrong naprenomme');

      setIsLoading(false);

      Alert.alert(' ', StringsFr.prenomeIncorrecte, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return false;
    }

    if (email.length < 2 || strongRegex.test(email) === false) {
      setIsLoading(false);

      Alert.alert(' ', StringsFr.emailIncorrecte, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return false;
    }
    if (password.length < 6 || PASSWORD_REGEX.test(password) === false) {
      setIsLoading(false);

      Alert.alert(' ', StringsFr.paswwordIncorrectSignUp, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return false;
    }
    return true;
  };

  const onSignInPressed = () => {
    setIsLoading(true);
    if (validation()) {
      console.log('email', isValidEmail);
      console.log('password', isValidPassword);

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log('User ' + res['user']['uid']);
          updateFirestore(res['user']['uid']);
        })
        .catch(function (error) {
          setIsLoading(false);
          console.log(error.code);
          if (error.code == 'auth/email-already-in-use') {
            Alert.alert('', StringsFr.emailExistAlready, [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          } else if (error.code == 'auth/network-request-failed') {
            Alert.alert('', 'Veuillez vérifier votre connexion !', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
          }
        });
    }
    const updateFirestore = uidNewUser => {
      //push data into firestore using the uid provided

      firestore()
        .collection('Users')
        .add({
          userId: uidNewUser,
          email: email,
          password: password,
          nom: nom,
          prenom: prenom,
          manager: 0,
          avatar: '',
          token: '',
        })
        .then(res => {
          console.log('yeeeeeeeeeeee', res._documentPath._parts[1]);
          firestore()
            .collection('Users')
            .doc(res._documentPath._parts[1])
            .update({
              token: res._documentPath._parts[1],
            })
            .then(() => {
              console.log('User updated!');
            });
          dispatch(
            setUser({
              email: email,
              password: password,
              prenom: prenom,
              nom: nom,
              userId: uidNewUser,
              manager: 0,
              avatar: '',
              token: res._documentPath._parts[1],
            }),
          );
          setIsLoading(false);

          console.log('User added!');
          authCtx.authenticate(res._documentPath._parts[1]);
        })
        .catch(function (error) {
          setIsLoading(false);

          console.log(error);
        });
    };
  };
  return (
    <SafeAreaView style={styles.parent}>
      <HeaderIcon
        style="Inscription"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Image
        source={require('../../../assets/LogoApp/logoApp.png')}
        style={Style.logo}
        resizeMode="cover"
      />

      <Title text={StringsFr.createYourAccount} />

      <KeyboardAwareScrollView style={{flex: 1}}>
        <Input
          style={'SigIn'}
          placeholder={StringsFr.firstName}
          secureTextEntry={false}
          leftIcon="user"
          value={nom}
          leftSizeIcon={getSize(13)}
          onchangeText={text => {
            setNom(text);
            console.log('tesst', nom);

            if (text.length == 0) {
              setNom('');
              console.log('tessssssssst', nom);
            }
          }}
        />
        <Input
          style={'SigIn'}
          placeholder={StringsFr.lastName}
          secureTextEntry={false}
          leftIcon="user"
          leftSizeIcon={getSize(13)}
          onchangeText={text => {
            setPrenom(text);
          }}
        />
        <Input
          style={'SigIn'}
          placeholder={StringsFr.mail}
          secureTextEntry={false}
          leftIcon="mail"
          leftSizeIcon={getSize(13)}
          keyboardType="email-address"
          onchangeText={text => {
            setEmail(text);
            setIsValidEmail(true);
          }}
        />
        <Input
          style={'SigIn'}
          placeholder={StringsFr.password}
          leftIcon="key"
          leftSizeIcon={getSize(13)}
          rightSizeIcon={getSize(13)}
          onchangeText={text => {
            setPassword(text);
            setIsValidPassword(true);
          }}
        />
        <Button
          onPress={onSignInPressed}
          disabled={
            nom.length == 0 ||
            prenom.length == 0 ||
            email.length == 0 ||
            password.length == 0
          }
          text={StringsFr.signUp}
          isLoading={isLoading}
          type="PRIMARY"
        />
        <View style={Style.containerInscription}>
          <Text style={Style.text}>{StringsFr.youHaveAlreadyAccount}</Text>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            text={StringsFr.signIn}
            type="Inscription"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const Style = StyleSheet.create({
  logo: {
    width: getSize(188),
    height: getSize(60),
    marginTop: getSize(20),
  },
  text: {
    fontWeight: 'bold',
    color: Colors.gray,
    fontSize: getSize(12),
  },
  containerInscription: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SignUp;
