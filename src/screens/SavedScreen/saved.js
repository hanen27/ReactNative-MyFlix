import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  ScrollView,
  FlatList,SafeAreaView
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
import {setEvent, setFavoriteEvent, setSavedEvent} from '../../Redux/event';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {selectUser} from '../../Redux/user';

const Icon = createIconSetFromFontello(fontelloConfig);

const SavedScreen = ({navigation}) => {
  const savedEvent = useSelector(state => state.event.savedEvent);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const deleteEvent = event => {
    firestore()
      .collection('Users')
      .doc(user?.token)
      .collection('Saved')
      .where('idEvent', '==', event.id)
      .get()
      .then(res => {
        console.log('save deleted', res._docs[0]._data.id);
        firestore()
          .collection('Users')
          .doc(user?.token)
          .collection('Saved')
          .doc(res._docs[0]._data.id)
          .delete()

          .then(() => {
            dispatch(setSavedEvent(savedEvent.filter(ev => ev.id != event.id)));
            console.log('Saved deleted');
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
    console.log(item.date);

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
        nom={'floppy-1'}
        color={Colors.priamry}
        onPressFavoris={() => {
          deleteEvent(item);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.parent}>
      <HeaderIcon
        style="Edit"
        text="Mes enregistrements "
        onPress={() => {
          navigation.goBack();
        }}
      />
      {savedEvent.length == 0 ? (
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
              {StringsFr.NoSaved}
            </Text>
          </View>
        </>
      ) : (
        <FlatList
          data={savedEvent}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingTop: getSize(10)}}
          ListFooterComponent={({section, index}) => (
            <View style={{height: getSize(80), width: '100%'}}></View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SavedScreen;
