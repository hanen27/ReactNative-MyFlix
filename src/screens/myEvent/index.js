import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,SafeAreaView
} from 'react-native';
import React from 'react';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import StringsFr from '../../Constantes/langue/fr';
import {getSize, changeColorOpacity} from 'helpers';
import styles from './style';

import HeaderIcon from '../../components/CustomHeader/headerIcon';
import Colors from '../../Constantes/Colors';

import List from '../../components/CustomList';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import font from '../../../resources/font';
import Footer from '../../components/CustomFooter';
import firestore from '@react-native-firebase/firestore';
import {setEvent, setFavoriteEvent, setSavedEvent} from '../../Redux/event';

const MyEvent = ({navigation, route}) => {
  const event = useSelector(state => state.event.event);
  const [data, setData] = useState(null);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    getEvent();
  }, []);
  const getFavoriteEvent = allEvent => {
    firestore()
      .collection('Users')
      .doc(user.token)
      .collection('Favoris')
      .get()
      .then(res => {
        let data = [];
        res._docs.map(ev => {
          data.push(...allEvent.filter(item => item.id == ev._data.idEvent));
        });
        dispatch(setFavoriteEvent(data));
      });
  };
  const getSavedEvent = allEvent => {
    firestore()
      .collection('Users')
      .doc(user.token)
      .collection('Saved')
      .get()
      .then(res => {
        let data = [];
        res._docs.map(ev => {
          data.push(...allEvent.filter(item => item.id == ev._data.idEvent));
        });
        dispatch(setSavedEvent(data));
      });
  };
  const getData = () => {
    firestore()
      .collection('Events')
      .get()
      .then(res => {
        console.log('getData========================');
        let data = [];
        res.docs.map(item => {
          data.push(item._data);
        });
        dispatch(setEvent(data));
        console.log('getData========jkgfkj================');

        // getFavoriteEvent(data);
        // getSavedEvent(data);
      })
      .catch(() => {});
  };
  const getEvent = () => {
    firestore()
      .collection('Events')

      .where('id_user', '==', user.token)
      .get()
      .then(res => {
        let ev = [];
        res._docs.map(item => {
          ev.push(item._data);
        });
        setData(ev);
      })
      .catch(e => {
        console.log('User updated error!', e);
      });
  };
  const hideEvent = (id, shown) => {
    console.log('id', id);
    firestore()
      .collection('Events')
      .doc(id)
      .update({
        shown: !shown,
      })
      .then(() => {
        getEvent();
        getData();
      })
      .catch(e => {
        console.log('error', e);
      })
      .catch(er => console.log('errr', er));
  };
  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  const renderItem = ({item, index}) => {
    return (
      <List
        onPress={() =>
          navigation.navigate('Details', {
            item: item,
          })
        }
        source={item.uriImage}
        title={item.title}
        date={
          addZero(new Date(item.date).getDate()) +
          '/' +
          addZero(new Date(item.date).getMonth()) +
          '/' +
          addZero(new Date(item.date).getFullYear()) +
          ' à ' +
          addZero(new Date(item.date).getHours()) +
          ':' +
          addZero(new Date(item.date).getMinutes())
        }
        ratings={item.ratings}
        lieu={item.lieu}
        nom={item.shown ? 'eye' : 'eye-off'}
        color={changeColorOpacity(Colors.white, 60)}
        onPressFavoris={() => hideEvent(item.id, item.shown)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.parent}>
      <HeaderIcon
        style="Edit"
        text={StringsFr.MyEvent}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {data ? (
        <FlatList
          data={data}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingTop: getSize(10)}}
          ListFooterComponent={({section, index}) => (
            <View style={{height: getSize(80), width: '100%'}}></View>
          )}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: Dimensions.get('window').height - getSize(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: font.MontserratMedium,
                    color: Colors.softOrange,
                  }}>
                  {StringsFr.NoEvent}
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            position: 'absolute',
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: changeColorOpacity(Colors.gray, 20),
          }}>
          <ActivityIndicator size="large" color={Colors.priamry} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyEvent;
