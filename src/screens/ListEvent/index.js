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

const ListEvent = ({navigation, route}) => {
  const event = useSelector(state => state.event.event);
  const [data, setData] = useState(null);
  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  useEffect(() => {
    route.params.item.data
      ? setData(route.params.item.data)
      : route.params.item?.key?.includes('cat_')
      ? setData(event.filter(ev => ev.categorie == route.params.item.key))
      : route.params.item?.key?.includes('th') &&
        setData(event.filter(ev => ev.theme == route.params.item.key));
  }, []);
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
        lieu={item.lieu}
        nom={'right-open-big'}
        color={Colors.white}
        ratings={item.ratings}
      />
    );
  };
  console.log('route.params', route.params);
  return (
    <SafeAreaView style={styles.parent}>
      <HeaderIcon
        style="Edit"
        text={route.params.item.name}
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

export default ListEvent;
