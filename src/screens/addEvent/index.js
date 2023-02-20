import {View, TouchableOpacity, ScrollView, Alert,SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {getSize, changeColorOpacity} from 'helpers';
import styles from './style';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import Colors from '../../Constantes/Colors';
import HeaderIcon from '../../components/CustomHeader/headerIcon';
import {useState, useRef} from 'react';
import FormTwo from './formTwo';
import FormThree from './formThree';
import StringsFr from '../../Constantes/langue/fr';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FormOne from './formOne';
const Icon = createIconSetFromFontello(fontelloConfig);
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../Redux/user';
import {setEvent} from '../../Redux/event';

const AddEvent = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [selected, setSelected] = useState([1]);
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [lieu, setLieu] = useState('');
  const [categorie, setCategorie] = useState('');
  const [theme, setTheme] = useState('');
  const [moderateur, setModerateur] = useState('');
  const [moderateurNom, setModerateurNom] = useState('');
  const [orateur, setOrateur] = useState('');
  const [orateurNom, setOrateurNom] = useState('');
  const [affiche, setAffiche] = useState('');
  const [video, setVideo] = useState('');
  const [listSponsors, setListSponsors] = useState([]);
  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  const Submit = () => {
    console.log('fffffffff');
    firestore()
      .collection('Events')
      .add({
        categorie: categorie.key,
        date: date.getTime(),
        description: description,
        id: '',
        nbreRate: 0,
        ratings: 0,
        shown: true,
        id_user: user.token,
        theme: theme.key,
        title: titre,
        lieu: lieu,
        uriImage: affiche,
        uriVideo: video,
        orateurNom: orateurNom,
        imageOrateur: orateur,
        moderateurNom: moderateurNom,
        imageModerateur: moderateur,
        type: '',
      })
      .then(res => {
        console.log('yeeeeeeeeeeee', res._documentPath._parts[1]);
        listSponsors.map(sp => {
          firestore()
            .collection('Events')
            .doc(res._documentPath._parts[1])
            .collection('Sponsors')
            .add({
              nameSponsor: sp.titre,
              imageSponsor: sp.uri,
            })
            .then(res => {
              console.log('added sponsor', res);
            });
        });
        firestore()
          .collection('Events')
          .doc(res._documentPath._parts[1])
          .update({
            id: res._documentPath._parts[1],
          })
          .then(res => {
            console.log('event updated!', res);
          });

        Alert.alert('', StringsFr.pleaseAddForm, [
          {
            text: 'OK',
            onPress: () => {
              firestore()
                .collection('Events')
                .get()
                .then(res => {
                  let data = [];
                  res.docs.map(item => {
                    data.push(item._data);
                    console.log('shown ===', item._data);
                  });
                  console.log('datttta', data);
                  dispatch(setEvent(data));
                });
              navigation.goBack();
            },
          },
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const HeaderSteps = () => {
    console.log('date', video);
    return (
      <View
        style={{
          height: getSize(50),

          backgroundColor: 'Colors.backgroundColor',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            backgroundColor: selected.includes(1)
              ? changeColorOpacity(Colors.priamry, 90)
              : changeColorOpacity(Colors.white, 50),
            flex: 1,
            height: getSize(5),
            marginLeft: getSize(30),
            marginRight: getSize(5),
            borderRadius: getSize(20),
          }}></View>

        <View
          style={{
            backgroundColor: selected.includes(2)
              ? changeColorOpacity(Colors.priamry, 90)
              : changeColorOpacity(Colors.white, 50),
            flex: 1,
            height: getSize(5),
            marginRight: getSize(5),
            borderRadius: getSize(20),
          }}></View>
        <View
          style={{
            backgroundColor: selected.includes(3)
              ? changeColorOpacity(Colors.priamry, 90)
              : changeColorOpacity(Colors.white, 50),
            flex: 1,
            height: getSize(5),
            marginRight: getSize(30),
            borderRadius: getSize(20),
          }}></View>
      </View>
    );
  };
  const treatCondition = () => {
    if (moderateurNom.length == 0 || moderateur.length == 0) {
      return true;
    } else {
      if (orateur.length != 0 || orateurNom.length != 0) {
        console.log('testsst');
        if (orateur.length == 0 || orateurNom.length == 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:Colors.backgroundColor}}>
      <HeaderIcon
        style="Edit"
        text={'Ajouter Événement'}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.parent}>
        <HeaderSteps />
        <KeyboardAwareScrollView style={{flex: 1}}>
          {selected.length == 1 && (
            <FormOne
              setTitre={val => setTitre(val)}
              titre={titre}
              setDescription={val => setDescription(val)}
              description={description}
              setDate={val => setDate(val)}
              date={date}
              setLieu={val => setLieu(val)}
              lieu={lieu}
              setCategorie={val => setCategorie(val)}
              categorie={categorie}
              setTheme={val => setTheme(val)}
              theme={theme}
            />
          )}
          {selected.length == 2 && (
            <FormTwo
              setModerateur={val => setModerateur(val)}
              moderateur={moderateur}
              setOrateur={val => setOrateur(val)}
              orateur={orateur}
              moderateurNom={moderateurNom}
              setModerateurNom={val => setModerateurNom(val)}
              orateurNom={orateurNom}
              setOrateurNom={val => setOrateurNom(val)}
              listSponsors={listSponsors}
              setListSponsors={val => setListSponsors(val)}
            />
          )}
          {selected.length == 3 && (
            <FormThree
              showVideo={new Date(date.getTime()) < new Date()}
              setVideo={val => setVideo(val)}
              video={video}
              affiche={affiche}
              setAffiche={val => setAffiche(val)}
            />
          )}
          <View
            style={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              paddingHorizontal: getSize(20),
            }}>
            <TouchableOpacity
              // disabled={
              //   titre.length == 0 ||
              //   description.length == 0 ||
              //   Date.toString().length == 0 ||
              //   lieu.length == 0 ||
              //   categorie.length == 0 ||
              //   theme.length == 0
              // }
              style={styles.button}
              hitSlop={{
                top: getSize(12),
                bottom: getSize(12),
                left: getSize(12),
                right: getSize(12),
              }}
              onPress={() => {
                if (
                  titre.length == 0 ||
                  description.length == 0 ||
                  Date.toString().length == 0 ||
                  lieu.length == 0 ||
                  categorie.length == 0 ||
                  theme.length == 0
                ) {
                  Alert.alert('', StringsFr.pleaseAddForm, [
                    {text: 'OK', onPress: () => {}},
                  ]);
                } else {
                  selected.length == 3
                    ? Submit()
                    : selected.includes(2)
                    ? treatCondition()
                      ? Alert.alert('', StringsFr.pleaseAddForm, [
                          {text: 'OK', onPress: () => {}},
                        ])
                      : setSelected([...selected, 3])
                    : setSelected([...selected, 2]);
                }
              }}>
              <Icon
                name={selected.length == 3 ? 'ok' : 'right-open-big'}
                size={getSize(20)}
                color="white"
              />
            </TouchableOpacity>
            {console.log(selected.length == 1)}
            {selected.length == 1 ? (
              <></>
            ) : (
              <TouchableOpacity
                style={styles.button}
                hitSlop={{
                  top: getSize(12),
                  bottom: getSize(12),
                  left: getSize(12),
                  right: getSize(12),
                }}
                onPress={() => {
                  selected.includes(3)
                    ? setSelected([...selected.slice(0, 2)])
                    : setSelected([...selected.slice(0, 1)]);
                }}>
                <Icon name="left-open-big" size={getSize(20)} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddEvent;
