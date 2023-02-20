import {View, Image, TouchableOpacity, Text, Alert, Switch,SafeAreaView} from 'react-native';
import React from 'react';
import styles from './style';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import Button from '../../components/CustomButton';
import {getSize, changeColorOpacity} from 'helpers';
import StringsFr from '../../Constantes/langue/fr';
import Colors from '../../Constantes/Colors';
import {useContext} from 'react';
import {AuthContext} from '../../store/auth-context';
import {logout} from '../../Redux/user';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, setUser} from '../../Redux/user';
import firestore from '@react-native-firebase/firestore';
import {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

const Icon = createIconSetFromFontello(fontelloConfig);

const Profil = ({navigation}) => {
  const authCtx = useContext(AuthContext);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const favoriteEvent = useSelector(state => state.event);
  console.log(favoriteEvent);
  const demanderPromotion = () => {
    Alert.alert('Devnir un manger', StringsFr.MsgManager, [
      {
        text: 'yes',
        onPress: () => {
          firestore()
            .collection('Users')
            .doc(user.token)
            .update({
              manager: 1,
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
            })
            .catch(er =>
              Alert.alert('Alert de validation ', 'te', [
                {text: 'OK', onPress: () => {}},
              ]),
            );
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ]);
    console.log('gggggggg', authCtx.isManager);
  };

  const signoutHandler = () => {
    authCtx.logout();
    auth()
      .signOut()

      .then(() => {
        dispatch(logout());
      });
  };

  const Settings = [
    {
      name: isEnabled1 ? StringsFr.Light : StringsFr.dark,
      icon: (
        <View
          style={{
            height: getSize(40),
            backgroundColor: changeColorOpacity(Colors.gray, 10),
            width: getSize(40),
            borderRadius: getSize(20),
            alignItems: 'center',
            justifyContent: 'center',
            
          }}>
          <Icon
            color={changeColorOpacity(Colors.priamry, 90)}
            size={23}
            name="moon-inv"
          />
        </View>
      ),
      onPress: () => {
        if (refRBSheet.current) {
          refRBSheet.current.close();
        }
      },
      click: (
        <View style={{flex:1}}>
          <Switch
            trackColor={{
              false: changeColorOpacity(Colors.priamry, 30),
              true: changeColorOpacity(Colors.priamry, 30),
            }}
            thumbColor={isEnabled2 ? Colors.priamry : Colors.priamry}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled1}
          />
        </View>
      ),
    },
    {
      name: isEnabled2 ? StringsFr.en : StringsFr.fr,
      icon: (
        <View
          style={{
            height: getSize(40),
            backgroundColor: changeColorOpacity(Colors.white, 10),
            width: getSize(40),
            borderRadius: getSize(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            name="language"
            color={changeColorOpacity(Colors.priamry, 90)}
            size={23}
          />
        </View>
      ),
      onPress: () => {
        if (refRBSheet.current) {
          refRBSheet.current.close();
        }
      },
      click: (
        <View style={{flex: 1}}>
          <Switch
            trackColor={{
              false: changeColorOpacity(Colors.priamry, 30),
              true: changeColorOpacity(Colors.priamry, 30),
            }}
            thumbColor={isEnabled2 ? Colors.priamry : Colors.priamry}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
        </View>
      ),
    },
  ];
  return (
    <SafeAreaView style={styles.parent}>
      <View
        style={{
          height: getSize(50),
          alignItems: 'flex-end',
          justifyContent: 'center',
          width: getSize(375),
        }}>
        <TouchableOpacity
          style={{
            width: getSize(50),
            height: getSize(50),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          hitSlop={{
            top: getSize(25),
            bottom: getSize(25),
            left: getSize(25),
            right: getSize(25),
          }}
          onPress={() => {
            navigation.navigate('Modifier');
          }}>
          <Icon name="pencil" color={Colors.white} size={getSize(23)} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: getSize(40),
        }}>
        <View style={styles.containerImage}>
          <Image
            style={styles.avatar}
            source={
              user?.avatar
                ? {uri: user?.avatar}
                : require('../../../assets/LogoApp/avatar.png')
            }
            resizeMode="cover"
          />
        </View>
        {/*  */}
        <View style={styles.conatinerText}>
          <Text style={styles.Text}>
            {user?.nom} {user?.prenom}
          </Text>
          <Text style={styles.Text}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.containerTouchable}>
        <TouchableOpacity
          style={styles.containerFavoris}
          onPress={() => navigation.navigate('Saved')}>
          <Text style={styles.TextFavoris}>{StringsFr.AllSaved}</Text>
          <Icon
            name="right-open-big"
            size={getSize(25)}
            style={styles.IconFavoris}
            color={Colors.white}
          />
        </TouchableOpacity>
        {user?.manager == 2 ? (
          <TouchableOpacity
            style={styles.containerManger}
            onPress={() => navigation.navigate('MyEvent')}>
            <Text style={styles.TextManager}>{StringsFr.MyEvent} </Text>
            <Icon
              name="right-open-big"
              size={getSize(25)}
              style={styles.IconFavoris}
              color={Colors.white}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.containerManger}
            onPress={demanderPromotion}>
            <Text style={styles.TextManager}>{StringsFr.Manger} </Text>
            <Icon
              name="right-open-big"
              size={getSize(25)}
              style={styles.IconFavoris}
              color={Colors.white}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.conatinerParam}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}>
          <Text style={styles.TextParam}>{StringsFr.ChangeMdp}</Text>
          <Icon
            name="right-open-big"
            size={getSize(25)}
            style={styles.IconFavoris}
            color={Colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerFavoris}
          onPress={() => {
            if (refRBSheet.current) {
              refRBSheet.current.open();
            }
          }}>
          <RBSheet
            ref={refRBSheet}
            height={getSize(185)}
            openDuration={250}
            dragFromTopOnly
            closeOnDragDown
            customStyles={{
              container: {
                borderTopRightRadius: getSize(20),
                borderTopLeftRadius: getSize(20),
                backgroundColor: Colors.backgroundBar,
              },
            }}>
            <View style={styles.optionsWrapper}>
              {Settings.map(({name, onPress, icon, click}) => (
                <>
                  <TouchableOpacity
                    onPress={onPress}
                    style={styles.pickerOption}
                    key={name}>
                    {icon}
                    <Text style={styles.textSettings}>{name}</Text>
                    {click}
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: changeColorOpacity(Colors.gray, 20),
                      height: getSize(0.6),
                      marginVertical: getSize(5),
                      marginHorizontal: getSize(20),
                    }}
                  />
                </>
              ))}
            </View>
          </RBSheet>
          <Text style={styles.TextFavoris}> {StringsFr.Settings} </Text>
          <Icon
            name="right-open-big"
            size={getSize(25)}
            style={styles.IconFavoris}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => {
          Alert.alert('', StringsFr.MsgSignOut, [{text: StringsFr.cancel, onPress: () => {}},
            {text: 'OK', onPress: () => signoutHandler()},
          ]);
        }}
        text={StringsFr.signOut}
        type="Profil"
      />
    </SafeAreaView>
  );
};
export default Profil;
