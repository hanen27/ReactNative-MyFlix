import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SectionList,SafeAreaView
} from 'react-native';
import React from 'react';
import styles from './style';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import Colors from '../../Constantes/Colors';
import HeaderIcon from '../../components/CustomHeader/headerIcon';
import {getSize, changeColorOpacity} from 'helpers';
import LinearGradient from 'react-native-linear-gradient';
import StringsFr from '../../Constantes/langue/fr';
import Footer from '../../components/CustomFooter';

const ShowAll = ({navigation, route}) => {
  console.log('route.params.title', route.params.show);

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
  return (
    <SafeAreaView style={styles.parent}>
      <HeaderIcon
        style="Edit"
        text={route.params.title}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        numColumns={2}
        keyExtractor={item => (item = route.params.show.id)}
        data={route.params.show}
        renderItem={renderItemFlatlist}
        style={{marginHorizontal: getSize(18), marginTop: getSize(25)}}
      />
      <Footer />
    </SafeAreaView>
  );
};

export default ShowAll;
