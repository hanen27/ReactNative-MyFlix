import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import React from 'react';
import Input from '../../components/CustomInput';
import {getSize, changeColorOpacity} from 'helpers';
import styles from './style';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import Colors from '../../Constantes/Colors';
import {useState, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import font from '../../../resources/font';
const Icon = createIconSetFromFontello(fontelloConfig);
const FormTwo = ({
  moderateur,
  setModerateur,
  setOrateur,
  orateur,
  moderateurNom,
  setModerateurNom,
  orateurNom,
  setOrateurNom,
  setListSponsors,
  listSponsors,
}) => {
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const refRBSheet3 = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
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
  const options1 = [
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
        }).then(async image => {
          if (refRBSheet1.current) {
            refRBSheet1.current.close();
          }
          console.log('image', image);
          let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
          const uploadedUrl = await uploadImage(
            image.path,
            filename,
            'Moderateur',
          );
          console.log('moderateur', uploadedUrl);
          setModerateur(uploadedUrl);
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
        }).then(async image => {
          console.log('hhhhhhhh', image);

          if (refRBSheet1.current) {
            refRBSheet1.current.close();
          }
          console.log('image', image);
          let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
          const uploadedUrl = await uploadImage(
            image.path,
            filename,
            'Moderateur',
          );
          console.log('moderateur', uploadedUrl);
          setModerateur(uploadedUrl);
        });
      },
    },
  ];

  const options2 = [
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
        }).then(async image => {
          if (refRBSheet2.current) {
            refRBSheet2.current.close();
          }
          console.log('image', image);
          let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
          const uploadedUrl = await uploadImage(
            image.path,
            filename,
            'Orateur',
          );
          console.log('Orateur', uploadedUrl);
          setOrateur(uploadedUrl);
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
        }).then(async image => {
          if (refRBSheet2.current) {
            refRBSheet2.current.close();
          }
          console.log('image', image);
          let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
          const uploadedUrl = await uploadImage(
            image.path,
            filename,
            'Orateur',
          );
          console.log('Orateur', uploadedUrl);
          setOrateur(uploadedUrl);
        });
      },
    },
  ];

  const options3 = [
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
        }).then(async image => {
          console.log('hhhhhhhh', image);

          if (refRBSheet3.current) {
            refRBSheet3.current.close();
          }
          console.log('image', image);
          let filename = image.path.substring(image.path.lastIndexOf('/') + 1);
          const uploadedUrl = await uploadImage(
            image.path,
            filename,
            'Sponsor',
          );
          console.log('Orateur', uploadedUrl);
          setImage(uploadedUrl);
        });
      },
    },
  ];

  return (
    <View style={styles.formOne}>
      <View style={styles.viewTextInput}>
        <Text style={styles.textInput}>{StringsFr.Moderateur}</Text>
        <View style={styles.containerImageInput}>
          <TouchableOpacity
            style={{paddingHorizontal: getSize(10)}}
            onPress={() => {
              if (refRBSheet1.current) {
                refRBSheet1.current.open();
              }
            }}>
            <Image
              style={styles.avatar}
              source={
                moderateur
                  ? {uri: moderateur}
                  : require('../../../assets/LogoApp/avatar.png')
              }
            />

            {moderateur ? (
              <></>
            ) : (
              <Icon
                name="plus-circled"
                size={getSize(15)}
                color={Colors.gray}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
          <Input
            style={'ADDSmall'}
            onchangeText={text => setModerateurNom(text)}
            value={moderateurNom}
            placeholder={'Nom de modérateur'}
          />
        </View>
        <RBSheet
          ref={refRBSheet1}
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
            {options1.map(({name, onPress, icon}) => (
              <TouchableOpacity
                onPress={onPress}
                style={styles.pickerOption}
                key={name}>
                {icon}
                <Text style={styles.textAffiche}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </RBSheet>
      </View>
      <View style={styles.viewTextInput}>
        <Text style={styles.textInput}>{StringsFr.Orateur}</Text>
        <View style={styles.containerImageInput}>
          <TouchableOpacity
            style={{paddingHorizontal: getSize(10)}}
            onPress={() => {
              if (refRBSheet2.current) {
                refRBSheet2.current.open();
              }
            }}>
            <Image
              style={styles.avatar}
              source={
                orateur
                  ? {uri: orateur}
                  : require('../../../assets/LogoApp/avatar.png')
              }
            />
            {orateur ? (
              <></>
            ) : (
              <Icon
                name="plus-circled"
                size={getSize(15)}
                color={Colors.gray}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
          <Input
            style={'ADDSmall'}
            onchangeText={text => setOrateurNom(text)}
            value={orateurNom}
            placeholder={'Nom de orateur'}
          />
        </View>
        <RBSheet
          ref={refRBSheet2}
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
            {options2.map(({name, onPress, icon}) => (
              <TouchableOpacity
                onPress={onPress}
                style={styles.pickerOption}
                key={name}>
                {icon}
                <Text style={styles.textAffiche}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </RBSheet>
      </View>

      <View style={styles.viewTextInput}>
        <Text style={styles.textInput}>{StringsFr.sponsors}</Text>
        <View style={styles.containerImageInput}>
          <TouchableOpacity
            style={{
              paddingHorizontal: getSize(10),
            }}
            onPress={() => {
              if (refRBSheet3.current) {
                refRBSheet3.current.open();
              }
            }}>
            <Image
              style={styles.avatar}
              resizeMode="cover"
              source={
                image
                  ? {uri: image}
                  : require('../../../assets/LogoApp/avatar.png')
              }
            />
            {image ? (
              <></>
            ) : (
              <Icon
                name="plus-circled"
                size={getSize(15)}
                color={Colors.gray}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>

          <Input
            onchangeText={text => {
              setText(text);
            }}
            style={'ADDSponsors'}
            value={text}
            placeholder={'Nom de sponsor'}
          />
          <TouchableOpacity
            onPress={() => {
              if (image.length == 0 || text.length == 0) {
                Alert.alert('', 'vous devez ajouter un sponsor.', [
                  {text: 'OK', onPress: () => {}},
                ]);
              } else {
                setListSponsors([...listSponsors, {uri: image, titre: text}]),
                  setText(''),
                  setImage('');
              }
            }}
            style={{
              alignSelf: 'center',
              marginBottom: getSize(10),

              width: getSize(40),
              height: getSize(40),
              borderColor: changeColorOpacity(Colors.border, 20),
              borderWidth: getSize(1),
              borderRadius: getSize(15),
              marginStart: getSize(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="plus-1"
              size={30}
              color={changeColorOpacity(Colors.white, 65)}
            />
          </TouchableOpacity>
        </View>
        {listSponsors.map(item => {
          console.log('item', item.uri);
          return (
            <View
              style={[
                styles.containerImageInput,
                {alignItems: 'center', paddingStart: getSize(65)},
              ]}>
              <Image
                resizeMode="cover"
                style={styles.avatarSponsor}
                source={{uri: item.uri}}
              />

              <Text
                style={{
                  color: changeColorOpacity(Colors.white, 60),
                  fontFamily: font.MontserratRegular,
                  fontSize: getSize(15),
                }}>
                {item.titre}
              </Text>
            </View>
          );
        })}
        <RBSheet
          ref={refRBSheet3}
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
            {options3.map(({name, onPress, icon}) => (
              <TouchableOpacity
                onPress={onPress}
                style={styles.pickerOption}
                key={name}>
                {icon}
                <Text style={styles.textAffiche}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </RBSheet>
      </View>
    </View>
  );
};

export default FormTwo;
