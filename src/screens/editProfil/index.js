import {View, TouchableOpacity, Image, Text, Alert,SafeAreaView} from 'react-native';
import React from 'react';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import StringsFr from '../../Constantes/langue/fr';
import {getSize, changeColorOpacity} from 'helpers';
import styles from './style';
import firestore from '@react-native-firebase/firestore';

import Input from '../../components/CustomInput';
import Button from '../../components/CustomButton';
import {useState} from 'react';
import HeaderIcon from '../../components/CustomHeader/headerIcon';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../Redux/user';
import {useRef} from 'react';
import Colors from '../../Constantes/Colors';
import storage from '@react-native-firebase/storage';
import {setUser} from '../../Redux/user';

const Icon = createIconSetFromFontello(fontelloConfig);
const EditProfil = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [filePath, setFilePath] = useState('');
  const [nom, setNom] = useState(null);
  const [prenom, setPrenom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refRBSheet = useRef();

  const uploadImage = async (uri, name, firebasePath) => {
    const imageRef = storage().ref(`${firebasePath}/${name}`);
    console.log('imageRef', imageRef);

    await imageRef.putFile(uri).catch(error => {
      console.log('error', error);
    });

    const url = await imageRef.getDownloadURL().catch(error => {
      console.log('error', error);
    });
    return url;
  };
  const updateFirestoreProfil = async () => {
    if (
      filePath == '' &&
      (!nom || nom == user.nom) &&
      (prenom == user.prenom || !prenom)
    ) {
      console.log(
        'filePath',
        filePath == '' &&
          (!nom || nom == user.nom) &&
          (prenom == user.prenom || !prenom),
      );
      Alert.alert('', StringsFr.NoUpdate, [{text: 'OK', onPress: () => {}}]);
      return;
    }

    setIsLoading(true);
    let uploadedUrl = '';
    if (filePath) {
      let filename = filePath.substring(filePath.lastIndexOf('/') + 1);
      uploadedUrl = await uploadImage(filePath, filename, 'UserAvatar');
    }
    console.log('res', uploadedUrl);
    console.log('filePath', filePath);

    firestore()
      .collection('Users')
      .doc(user.token)
      .update({
        nom: nom ? nom : user.nom,
        prenom: prenom ? prenom : user.prenom,
        avatar: uploadedUrl != '' ? uploadedUrl : user.avatar,
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
            Alert.alert('', StringsFr.succesUpdate, [
              {text: 'OK', onPress: () => navigation.goBack()},
            ]);
            console.log('User updated!');
          })
          .catch(e => {
            console.log('User updated error!', e);
          });
      })
      .catch(er => setIsLoading(false));
  };

  const options = [
    {
      name: 'Take from camera',
      icon: (
        <Icon
          color={changeColorOpacity(Colors.priamry, 60)}
          size={21}
          name="camera"
        />
      ),
      onPress: () => {
        ImagePicker.openCamera({
          width: getSize(300),
          height: getSize(400),
          cropping: true,
        }).then(image => {
          if (refRBSheet.current) {
            refRBSheet.current.close();
          }
          setFilePath(image.path);
        });
      },
    },
    {
      name: 'Choose from Gallery',
      icon: (
        <Icon
          name="picture"
          color={changeColorOpacity(Colors.priamry, 60)}
          size={21}
        />
      ),
      onPress: () => {
        ImagePicker.openPicker({
          width: getSize(300),
          height: getSize(400),

          cropping: true,
        }).then(image => {
          if (refRBSheet.current) {
            refRBSheet.current.close();
          }
          setFilePath(image.path);
        });
      },
    },
  ];

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:Colors.backgroundColor}}>
      <HeaderIcon
        style="Edit"
        text={StringsFr.EditProfil}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.parent}>
        <View style={styles.conatiner}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (refRBSheet.current) {
                  refRBSheet.current.open();
                }
              }}
              style={styles.containerImageIcon}>
              <Image
                style={styles.avatar}
                source={
                  filePath
                    ? {uri: filePath}
                    : user.avatar
                    ? {uri: user.avatar}
                    : require('../../../assets/LogoApp/avatar.png')
                }
                resizeMode="cover"
              />
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
                  },
                }}>
                <View style={styles.optionsWrapper}>
                  {options.map(({name, onPress, icon}) => (
                    <TouchableOpacity
                      onPress={onPress}
                      style={styles.pickerOption}
                      key={name}>
                      {icon}
                      <Text style={styles.text}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </RBSheet>
              <View style={styles.containerIcon}>
                <Icon
                  name="plus-circled"
                  size={getSize(25)}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Input
              style={'SigIn'}
              placeholder={StringsFr.firstName}
              secureTextEntry={false}
              leftIcon="user"
              leftSizeIcon={getSize(13)}
              value={nom && nom}
              defaultValue={user?.nom}
              onchangeText={text => setNom(text)}
            />
            <Input
              style={'SigIn'}
              placeholder={StringsFr.lastName}
              secureTextEntry={false}
              leftIcon="user"
              leftSizeIcon={getSize(13)}
              value={prenom && prenom}
              defaultValue={user?.prenom}
              onchangeText={text => setPrenom(text)}
            />
          </View>
          <Button
            text={StringsFr.Validate}
            type="PRIMARY"
            onPress={updateFirestoreProfil}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfil;
