import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SectionList,
  ActivityIndicator,
  Dimensions,SafeAreaView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';

import styles from './style';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import Colors from '../../Constantes/Colors';
import HeaderIcon from '../../components/CustomHeader/headerIcon';
import {getSize, changeColorOpacity} from 'helpers';
import LinearGradient from 'react-native-linear-gradient';
import StringsFr from '../../Constantes/langue/fr';
import Footer from '../../components/CustomFooter';

const Icon = createIconSetFromFontello(fontelloConfig);

const SearchScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const Categories = useSelector(state => state.event.categories);
  const Themes = useSelector(state => state.event.themes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    treatData(Categories, Themes);
    console.log('catgory', Categories);
    console.log('Themes', Themes);
  }, []);

  const treatData = (cat, theme) => {
    setData([
      {
        id: 0,
        data: [''],
      },
      {
        id: 1,
        title: 'Catégories',
        data: [
          {
            data: cat,
          },
        ],
      },
      {
        id: 2,
        title: 'Thèmes',
        data: [
          {
            data: theme,
          },
        ],
      },
    ]);
    setLoading(false);
  };
  const renderItemFlatlist = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ListEvent', {
            item: item,
          })
        }
        style={{
          width: getSize(163),
          height: getSize(120),
          backgroundColor: Colors.backgroundBar,
          marginEnd: getSize(15),
          marginBottom: getSize(15),
          borderRadius: getSize(10),
          justifyContent: 'flex-end',
        }}>
        <Image
          source={{
            uri: item.imageUri,
          }}
          style={{
            width: getSize(163),
            height: getSize(120),
            borderRadius: getSize(10),
          }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={[
            changeColorOpacity(Colors.black, 0),
            changeColorOpacity(Colors.black, 50),
            changeColorOpacity(Colors.black, 100),
          ]}
          style={{
            height: getSize(45),
            position: 'absolute',
            width: getSize(163),

            justifyContent: 'center',
            paddingStart: getSize(10),
            borderRadius: getSize(10),
          }}>
          <Text style={[styles.titleText]}>{item.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, section, index}) => {
    if (section.id == 0) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={styles.ContainerInput}>
          <Text style={styles.Input}>{StringsFr.search}</Text>
          <View style={styles.icon}>
            <Icon
              name="search-1"
              size={28}
              color={changeColorOpacity(Colors.white, 60)}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <FlatList
          numColumns={2}
          keyExtractor={item => item.key}
          data={item.data.length > 4 ? [...item.data.slice(0, 4)] : item.data}
          renderItem={renderItemFlatlist}
          style={{marginHorizontal: getSize(18)}}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('ShowAll', {
                  show: item.data,
                  title: section.title,
                });
              }}>
              <Text style={[styles.showmoreText]}>
                {section.id == 1
                  ? StringsFr.VoirCategories
                  : StringsFr.VoirThemes}
              </Text>
            </TouchableOpacity>
          )}
        />
      );
    }
  };
  return (
    <SafeAreaView style={styles.parent}>
      <HeaderIcon
        style="Edit"
        text={StringsFr.search}
        onPress={() => {
          navigation.goBack();
        }}
        withoutBack
      />
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({section}) =>
          section.id != 0 && <Text style={[styles.Title]}>{section.title}</Text>
        }
        numColumns={2}
        ListFooterComponent={({section, index}) => (
          <View style={{height: getSize(80), width: '100%'}}></View>
        )}
      />

      <Footer />
      {loading && (
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

export default SearchScreen;
