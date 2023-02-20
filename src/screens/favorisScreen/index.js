import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  ScrollView,SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import StringsFr from '../../Constantes/langue/fr';
import {getSize, changeColorOpacity} from 'helpers';
import styles from './style';
import Input from '../../components/CustomInput';
import Button from '../../components/CustomButton';
import {useState} from 'react';
import HeaderIcon from '../../components/CustomHeader/headerIcon';
import Colors from '../../Constantes/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {Rating, AirbnbRating} from 'react-native-ratings';
import Footer from '../../components/CustomFooter';
import List from '../../components/CustomList';
import {useEffect} from 'react';
import font from '../../../resources/font';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../Redux/user';
import {setEvent, setFavoriteEvent, setSavedEvent} from '../../Redux/event';

const Icon = createIconSetFromFontello(fontelloConfig);

const FavorisScreen = ({navigation}) => {
  const user = useSelector(selectUser);
  const favoriteEvent = useSelector(state => state.event.favoriteEvent);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('favoriteEvent', favoriteEvent);
  });
  const deleteEvent = event => {
    firestore()
      .collection('Users')
      .doc(user?.token)
      .collection('Favoris')
      .where('idEvent', '==', event.id)
      .get()
      .then(res => {
        firestore()
          .collection('Users')
          .doc(user?.token)
          .collection('Favoris')
          .doc(res._docs[0]._data.id)
          .delete()
          .then(() => {
            dispatch(
              setFavoriteEvent(favoriteEvent.filter(ev => ev.id != event.id)),
            );
            setfavoris(!favoris);
          });
      });
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
        nom={'heart'}
        color={Colors.priamry}
        onPressFavoris={() => {
          // setDATA(DATA.filter(element => element.id !== item.id));
          console.log('item', item);
          deleteEvent(item);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.parent}>
      <HeaderIcon style="Edit" text={StringsFr.Favoris} withoutBack />
      {favoriteEvent.length == 0 ? (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: getSize(50),
            }}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: font.MontserratMedium,
                color: Colors.softOrange,
              }}>
              {StringsFr.NoFavoris}
            </Text>
          </View>
        </>
      ) : (
        <>
          <FlatList
            data={favoriteEvent}
            renderItem={item => renderItem(item)}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingTop: getSize(10)}}
            ListFooterComponent={({section, index}) => (
              <View style={{height: getSize(80), width: '100%'}}></View>
            )}
          />
        </>
      )}

      <Footer />
    </SafeAreaView>
  );
};

export default FavorisScreen;
