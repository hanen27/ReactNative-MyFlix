import {View, Image, StyleSheet, Text, Alert} from 'react-native';
import styles from './style';
import Input from '../../components/CustomInput';
import Button from '../../components/CustomButton';
import Title from '../../components/CustomTitle';
import {BarIndicator} from 'react-native-indicators';
import {getSize} from 'helpers';
import StringsFr from '../../Constantes/langue/fr';
import Colors from '../../Constantes/Colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {setUser} from '../../Redux/user';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState, useContext} from 'react';
import {AuthContext} from '../../store/auth-context';
import {LanguageContext} from '../../Constantes/langue/LocalisationContext';
const SignIn = ({navigation}) => {
  const {t} = useContext(LanguageContext);

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const authCtx = useContext(AuthContext);
  const alert = message => {
    Alert.alert('', message, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };
  const signin = () => {
    setIsLoading(true);
    console.log(email, password);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('redux', res['user']);
        const userid = res['user']['uid'];
        firestore()
          .collection('Users')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              if (documentSnapshot.data()['userId'] == userid) {
                dispatch(
                  setUser({
                    email: documentSnapshot.data()['email'],
                    password: documentSnapshot.data()['password'],
                    prenom: documentSnapshot.data()['prenom'],
                    nom: documentSnapshot.data()['nom'],
                    userId: documentSnapshot.data()['userId'],
                    manager: documentSnapshot.data()['manager'],
                    avatar: documentSnapshot.data()['avatar'],
                    token: documentSnapshot.data()['token'],
                  }),
                );
                if (documentSnapshot.data()['manager'] == 2) {
                  authCtx.DevnirManager('manager');
                }
                authCtx.authenticate(documentSnapshot.data()['token']);
                setIsLoading(false);
              }
            });
          });
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error.code);
        if (error.code == 'auth/wrong-password') {
          alert(StringsFr.paswwordIncorrect);
        } else if (error.code == 'auth/invalid-email') {
          alert(StringsFr.emailIncorrecte);
        } else if (error.code == 'auth/network-request-failed') {
          alert('Veuillez vérifier votre connexion!');
        }
      });
  };

  return (
    <View style={styles.parent}>
      <Image
        source={require('../../../assets/LogoApp/logoApp.png')}
        style={Style.logo}
        resizeMode="cover"
      />
      <Title text={StringsFr.identifyYourself} />
      <Input
        style={'SigIn'}
        placeholder={StringsFr.mail}
        secureTextEntry={false}
        leftIcon="mail"
        leftSizeIcon={getSize(13)}
        onchangeText={text => {
          setEmail(text);
        }}
      />
      <Input
        style={'SigIn'}
        placeholder={StringsFr.password}
        secureTextEntry={passwordVisible}
        leftIcon="key"
        leftSizeIcon={getSize(13)}
        onPress={() => setPasswordVisible(!passwordVisible)}
        rightIcon={passwordVisible ? 'eye-off' : 'eye'}
        rightSizeIcon={getSize(13)}
        onchangeText={text => {
          setPassword(text);
        }}
      />

      <Button
        onPress={() => {}}
        text={StringsFr.forgetPassword}
        type="TERTIARY"
      />
      <Button
        onPress={signin}
        background={Colors.priamry}
        text={StringsFr.signIn}
        isLoading={isLoading}
        type="PRIMARY"
        disabled={email.length == 0 || password.length == 0}
      />
      <View style={Style.containerInscription}>
        <Text style={Style.text}>{StringsFr.dontHaveAccount}</Text>
        <Button
          onPress={() => {
            navigation.navigate('Inscription');
          }}
          text={StringsFr.sigupHere}
          type="Inscription"
        />
      </View>
    </View>
  );
};
const Style = StyleSheet.create({
  logo: {
    width: getSize(250),
    height: getSize(80),
  },
  text: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: getSize(13),
  },
  containerInscription: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SignIn;
