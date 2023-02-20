import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  ScrollView,
  Keyboard,
  Dimensions,
  ActivityIndicator,SafeAreaView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import React, {useEffect} from 'react';
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
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import font from '../../../resources/font';

const Icon = createIconSetFromFontello(fontelloConfig);

const Commentaire = ({navigation, route}) => {
  const user = useSelector(state => state.user.user);

  const [commentaires, setCommentaire] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComment();
  }, []);

  const getComment = () => {
    firestore()
      .collection('Events')
      .doc(route.params.event.id)
      .collection('Commentaire')
      .orderBy('date', 'desc')
      .get()
      .then(resp => {
        let data = [];
        resp._docs.map(com => {
          data.push(com._data);
        });
        setCommentaire(data);
        setLoading(false);
      });
  };

  const sendComment = () => {
    setLoading(true);
    console.log(route.params);
    if (commentText != '') {
      firestore()
        .collection('Events')
        .doc(route.params.event.id)
        .collection('Commentaire')
        .add({
          comment: commentText,
          userNom: user.nom,
          userPrenom: user.prenom,
          imageUser: user.avatar,
          date: new Date(),
        })
        .then(resp => getComment());
    }
  };
  return (
    <SafeAreaView style={{backgroundColor:Colors.backgroundColor,flex:1}}>
      <HeaderIcon
        style="Edit"
        text={StringsFr.comments}
        onPress={() => {
          navigation.goBack();
        }}
      />
     
      <ScrollView
        style={styles.parent}
        contentContainerStyle={{paddingTop: getSize(10)}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          {commentaires.length > 0 ? (
            commentaires.map(item => {
              return (
                <View
                  style={{
                    width: getSize(350),
                    flex: 1,
                    backgroundColor: Colors.backgroundComment,
                    padding: getSize(7),
                    borderRadius: getSize(10),
                    marginBottom: getSize(10),
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{
                        uri: item.imageUser,
                      }}
                      style={{
                        width: getSize(34),
                        height: getSize(34),
                        borderRadius: getSize(17),
                        marginStart: getSize(5),
                      }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                      }}>
                      <Text style={styles.OrateursComment}>
                        {item.userNom + ' ' + item.userPrenom}
                      </Text>
                      <Text style={styles.dateComment}>
                        {item.date.toDate().toLocaleDateString('fr')}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.textComment}>{item.comment}</Text>
                </View>
              );
            })
          ) : (
            <View
              style={{
                height: Dimensions.get('window').height - getSize(200),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: font.MontserratMedium,
                  color: Colors.softOrange,
                }}>
                {StringsFr.NoComment}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={{backgroundColor: Colors.backgroundColor}}>
      <KeyboardAwareScrollView>
        <View
          style={{
            margin: getSize(12),
            borderWidth: 1,
            borderRadius: getSize(12),
            height: getSize(63),
            borderColor: changeColorOpacity(Colors.gray, 80),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              borderRadius: getSize(15),
              flex: 1,
              alignSelf: 'center',
              color: Colors.white,
              paddingStart: getSize(10),
            }}
            placeholder={StringsFr.palceholderComment}
            placeholderTextColor={changeColorOpacity(Colors.white, 50)}
            multiline
            defaultValue={commentText}
            onChangeText={text => setCommentText(text)}
          />
          <TouchableOpacity
            style={{
              marginStart: getSize(10),
              padding: getSize(10),
            }}
            onPress={() => {
              sendComment();
              setCommentText('');
              Keyboard.dismiss();
            }}
            disabled={commentText == ''}>
            <Icon
              name="send"
              size={getSize(20)}
              color={
                commentText == ''
                  ? changeColorOpacity(Colors.priamry, 40)
                  : Colors.priamry
              }
            />
          </TouchableOpacity>
        </View> 
        </KeyboardAwareScrollView>
      </View>
    
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

export default Commentaire;
