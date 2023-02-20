import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,SafeAreaView
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import Colors from '../../Constantes/Colors';
import {setCategories, setThemes} from '../../Redux/event';

import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import {useEffect} from 'react';
import {useRef} from 'react';
import {getSize, changeColorOpacity} from 'helpers';
import StringsFr from '../../Constantes/langue/fr';
import {useSelector, useDispatch} from 'react-redux';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {NavigationContainer} from '@react-navigation/native';
import List from '../../components/CustomList';
const Icon = createIconSetFromFontello(fontelloConfig);

const SearchDeatils = ({navigation}) => {
  const [text, setText] = useState(null);
  const [data, setData] = useState([]);

  const event = useSelector(state => state.event.event);
  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  useEffect(() => {
    text != ''
      ? setData(
          event.filter(
            ev => ev?.title?.toUpperCase()?.includes(text?.toUpperCase()) || ev?.description?.toUpperCase().includes(text?.toUpperCase()),
          ),
        )
      : setData([]);
    console.log('text===', text);
  }, [text]);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          height: getSize(100),
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: getSize(15),
          marginBottom: getSize(15),
        }}>
        <View
          style={{
            flex: 1.5,
            padding: getSize(10),
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: item.uriImage}}
            style={[
              {
                flex: 1,
                borderRadius: getSize(10),
              },
            ]}
            resizeMode={'cover'}
          />
        </View>
        <View
          style={{
            flex: 4,
            paddingHorizontal: getSize(10),
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: getSize(4),
              alignItems: 'center',
            }}>
            <Icon
              style={{paddingRight: getSize(5)}}
              name="calendar"
              size={12}
              color={changeColorOpacity(Colors.white, 70)}
            />
            <Text style={[styles.dateText]}>
              {addZero(new Date(item.date).getDate()) +
                '/' +
                addZero(new Date(item.date).getMonth()) +
                '/' +
                addZero(new Date(item.date).getFullYear()) +
                ' à ' +
                addZero(new Date(item.date).getHours()) +
                ':' +
                addZero(new Date(item.date).getMinutes())}
            </Text>
          </View>
          <Text style={[styles.titleText]}>{item.title}</Text>
          <View style={{flexDirection: 'row', marginBottom: getSize(4)}}>
            <Icon
              style={{paddingRight: getSize(5)}}
              name="location"
              size={12}
              color={changeColorOpacity(Colors.white, 70)}
            />
            <Text style={[styles.locationText]}>{item.lieu}</Text>
          </View>
          <Rating
            readonly={true}
            ratingColor={'#eabc04'}
            tintColor={Colors.backgroundColor}
            imageSize={15}
            startingValue={item.ratings}
            style={{
              backgroundColor: 'red',
              alignSelf: 'flex-start',
              marginTop: getSize(5),
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details', {
              item: item,
            })
          }
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon
            name={'right-open-big'}
            size={getSize(25)}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.parent}>
      <View style={[{flexDirection: 'row'}]}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.softBlue,
            alignItems: 'center',
            justifyContent: 'center',
            padding: getSize(15),
            borderRadius: getSize(10),
            marginVertical: getSize(20),
            marginHorizontal: getSize(15),
            width: getSize(275),
            height: getSize(50),
          }}>
          <View style={styles.icon}>
            <Icon
              name="search-1"
              size={25}
              color={changeColorOpacity(Colors.white, 60)}
            />
          </View>
          <TextInput
            placeholder={StringsFr.search}
            placeholderTextColor={Colors.softOrange}
            style={[
              styles.Input,
              {height: getSize(50), paddingHorizontal: getSize(15)},
            ]}
            onChangeText={text => setText(text)}
            //   ref={inputElement}
            autoFocus
          />
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginVertical: getSize(20),
            paddingVertical: getSize(15),
            height: getSize(50),
            width: getSize(65),
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{color: Colors.white, fontSize: getSize(16)}}>
            {StringsFr.cancel}
          </Text>
        </TouchableOpacity>
      </View>
      {text ? (
        <FlatList
          data={data}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id}
          contentContainerStyle={[{paddingTop: getSize(10)}]}
          ListEmptyComponent={() => (
            <Text
              style={{
                textAlign: 'center',
                paddingTop: getSize(15),
                color: changeColorOpacity(Colors.white, 70),
              }}>
              {StringsFr.NoResultat}
            </Text>
          )}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default SearchDeatils;
