import React, {useEffect, useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import styles from './style';
import {
  Text,
  View,
  SectionList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {getSize, changeColorOpacity} from 'helpers';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import Font from '../../../resources/font';
import StringsFr from '../../Constantes/langue/fr';
import Footer from '../../components/CustomFooter';
import LinearGradient from 'react-native-linear-gradient';
import {AirbnbRating} from 'react-native-ratings';
import Colors from '../../Constantes/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {setEvent, setFavoriteEvent, setSavedEvent} from '../../Redux/event';
import {setCategories, setThemes} from '../../Redux/event';
import {setRatedEvent,} from '../../Redux/user';

const Icon = createIconSetFromFontello(fontelloConfig);
const AcceuilScreen = ({navigation}) => {
  const user = useSelector(state => state.user.user);
  const event = useSelector(state => state.event.event);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [mostViewed, setMostViewed] = useState([]);
  const [encours, setEncours] = useState([]);
  const [all, setAll] = useState([]);

  const [loading, setLoading] = useState(true);
  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  useEffect(() => {
    getData();
    let cat = [];
    let theme = [];
    firestore()
      .collection('Categories')
      .get()
      .then(res => {
        res._docs.map(ev => {
          cat.push(ev._data);
        });
        dispatch(setCategories(cat));

        firestore()
          .collection('Themes')
          .get()
          .then(res => {
            res._docs.map(ev => {
              theme.push(ev._data);
            });
            dispatch(setThemes(theme));
          });
      });
  }, []);
  useEffect(() => {
    console.log('get event');
    treatData(event);
  }, [event]);
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
    setLoading(true);
    firestore()
      .collection('Events')
      .get()
      .then(res => {
        setLoading(false);

        let data = [];
        res.docs.map(item => {
          data.push(item._data);
        });
        dispatch(setEvent(data));
        getFavoriteEvent(data);
        getSavedEvent(data);
        getRatedEvent()
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const getRatedEvent = () => {
    firestore()
      .collection('Users')
      .doc(user.token)
      .collection('Rated')
      .get()
      .then(res => {
        let data = [];
        console.log("res res====",res)
        res._docs.map(ev => {
          data.push(ev._data)
        });
        dispatch(setRatedEvent(data));        console.log("data====",data)

      })
      .catch(() => {
        console.log("data====",data)
        // setLoading(false);
      });
  };

  const treatData = data => {
    const currentDate = new Date();
    const evenementAVenir = [];
    const lesPlusVue = [];
    const all = [];
    const encours = [];
    data.map(item => {
      if (item.shown) {
        if (item.date > currentDate.getTime()) {
          evenementAVenir.push(item);
        } else {
          if (item.type == 'encours') {
            encours.push(item);
          } else if (item.type == 'plusvue') {
            lesPlusVue.push(item);
          }
          all.push(item);
        }
      }
    });

    setAll(all);
    setEncours(encours);
    setMostViewed(lesPlusVue);

    setData([
      {
        id: 1,
        data: [
          {
            text: StringsFr.GoodMorning,
          },
        ],
      },
      {
        id: 2,
        title: StringsFr.EventToCome,
        data: [evenementAVenir],
      },
      {
        id: 3,
        title: StringsFr.AllEventInMyFlix,
        data: [all],
      },
      {
        id: 3,
        title: StringsFr.Mostviewed,
        data: [lesPlusVue],
      },
      {
        id: 3,
        title: StringsFr.CurrentlyViewing,
        data: [encours],
      },
    ]);
  };
  const ListHeader = ({item}) => {
    return (
      <View style={styles.containerText}>
        <View
          style={{flexDirection: 'column', flex: 1, justifyContent: 'center'}}>
          <Text style={styles.itemText}>{item.text + ','}</Text>
          <View style={{paddingLeft: getSize(-50)}}>
            <Text style={styles.itemText2}>
              {user?.nom} {user?.prenom}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilStack')}>
          <Image
            source={
              user?.avatar
                ? {uri: user?.avatar}
                : require('../../../assets/LogoApp/avatar.png')
            }
            style={styles.photoUser}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const ListItem = ({item, section}) => {
    return item.index == 4 ? (
      <View style={styles.item}>
        <TouchableOpacity
          style={[
            styles.itemPhoto,
            {
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: Colors.borderItem,
            },
          ]}
          onPress={() =>
            navigation.navigate('ListEvent', {
              item: {
                name: section.title,
                data: section.data[0],
              },
            })
          }>
          <Text style={styles.itemTextVoir}>{StringsFr.SeeMore}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('Details', {
            item: item.item,
          })
        }>
        <View style={{flex: 1}}>
          <Image
            source={{
              uri: item.item.uriImage,
            }}
            style={styles.itemPhoto}
            resizeMode='cover'
          />
          <View style={styles.playImage}>
            <Icon
              name="polygon-1"
              size={15}
              color={changeColorOpacity(Colors.white, 70)}
              style={{marginLeft: getSize(3)}}
            />
          </View>
        </View>
        <View
          style={{
            flex: 3,
            marginBottom: getSize(20),
            paddingStart: getSize(5),
          }}>
          <View style={styles.Date}>
            <Icon
              style={{paddingRight: getSize(5)}}
              name="calendar"
              size={12}
              color={changeColorOpacity(Colors.white, 70)}
            />
            <Text
              style={{
                alignSelf: 'flex-start',
                fontFamily: Font.MontserratBold,
                color: Colors.white,
                fontSize: getSize(10),
                paddingVertical: getSize(2),
              }}>
              {addZero(new Date(item.item.date).getDate()) +
                '/' +
                addZero(new Date(item.item.date).getMonth()) +
                '/' +
                addZero(new Date(item.item.date).getFullYear()) +
                ' à ' +
                addZero(new Date(item.item.date).getHours()) +
                ':' +
                addZero(new Date(item.item.date).getMinutes())}
            </Text>
          </View>
          <View style={styles.Date}>
            <Icon
              style={{paddingRight: getSize(5)}}
              name="location"
              size={12}
              color={changeColorOpacity(Colors.white, 70)}
            />
            <Text
              style={{
                alignSelf: 'flex-start',
                fontFamily: Font.MontserratBold,
                color: Colors.white,
                fontSize: getSize(10),
                paddingVertical: getSize(2),
              }}>
              {item.item.lieu}
            </Text>
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontFamily: Font.MontserratRegular,
              color: changeColorOpacity(Colors.white, 60),
              fontSize: getSize(10),
            }}>
            {item.item.title}
          </Text>

          <AirbnbRating
            ratingContainerStyle={{
              alignSelf: 'flex-start',
              height: getSize(6),
            }}
            count={5}
            isDisabled={true}
            defaultRating={item.item.ratings}
            size={10}
            reviews={false}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const ListItemEvent = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemEvent}
        onPress={() =>
          navigation.navigate('Details', {
            item: item,
          })
        }>
        <Image
          source={{
            uri: item.uriImage,
          }}
          style={styles.itemPhotoEvent}
          resizeMode="cover"></Image>

        <View style={styles.itemViewEvent}></View>
        <LinearGradient
          colors={[
            changeColorOpacity(Colors.backgroundColor, 0),
            changeColorOpacity(Colors.backgroundColor, 50),
            changeColorOpacity(Colors.backgroundColor, 80),
            changeColorOpacity(Colors.backgroundColor, 95),
            changeColorOpacity(Colors.backgroundColor, 100),
          ]}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            borderRadius: getSize(5),
            paddingBottom: getSize(3),
          }}>
          <View style={styles.Date}>
            <Icon
              style={styles.icon}
              name="calendar"
              size={13}
              color={changeColorOpacity(Colors.white, 50)}
            />
            <Text
              style={[
                styles.itemTextUnderPhoto,
                {color: Colors.softOrange, fontFamily: Font.MontserratBold},
              ]}>
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
          <View style={styles.Date}>
            <Icon
              style={styles.icon}
              name="location"
              size={13}
              color={changeColorOpacity(Colors.white, 50)}
            />
            <Text
              style={[
                styles.itemTextUnderPhoto,
                {color: Colors.softOrange, fontFamily: Font.MontserratBold},
              ]}>
              {item.lieu}
            </Text>
          </View>
          <Text
            style={[
              styles.itemTextUnderPhoto,
              {
                color: changeColorOpacity(Colors.softOrange, 65, 20),
                fontFamily: Font.MontserratMedium,
                fontSize: getSize(15),
              },
            ]}>
            {item.title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, section}) => {
    if (section.id == 1) {
      return <ListHeader item={item} />;
    } else if (section.id == 2) {
      return (
        <Carousel
          data={item}
          renderItem={ListItemEvent}
          sliderWidth={getSize(375)}
          itemWidth={Math.round(getSize(375) * 0.7)}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          layout={'default'}
          loop={true}
        />
      );
    }
    return (
      <Carousel
        data={item.length > 4 ? [...item.slice(0, 4), {}] : item}
        renderItem={item => <ListItem item={item} section={section} />}
        sliderWidth={getSize(375)}
        itemWidth={getSize(160)}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        activeSlideAlignment={'start'}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        // contentContainerStyle={{paddingHorizontal: 20}}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item + index}
        sections={data}
        renderSectionHeader={({section, index}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={renderItem}
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
export default AcceuilScreen;
// const SECTIONS = [
//   {
//     id: 1,
//     data: [
//       {
//         text: 'Bonjour',
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: 'Evénments à venir  ',
//     data: [
//       [
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriVideo: '',
//           uriImage:
//             'https://previews.123rf.com/images/provector/provector1604/provector160400049/56013533-retro-summer-holidays-partie-affiche-plage-ou-flyer-mod%C3%A8le-de-conception-night-club-event-retro-typo.jpg',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Sousse, Movenpick',
//           favoris: true,
//           ratings: 0,
//           save: false,
//         },

//         {
//           title: 'Team bilding With Millessima Events',
//           date: '30 Septembre',
//           uriVideo: '',
//           uriImage:
//             'https://img.freepik.com/psd-gratuit/affiche-evenement-entreprise_1409-1117.jpg?w=2000',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Four Seasons Hotels and Resorts',
//           favoris: true,
//           ratings: 0,
//           save: false,
//         },
//         {
//           title: 'Event virtuel',
//           date: '22 juillet',
//           uriVideo: '',
//           uriImage:
//             'https://img.freepik.com/psd-gratuit/modele-affiche-evenement-entreprise_23-2148347484.jpg',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Salle des Conférences, Technopôle Manouba',
//           favoris: true,
//           ratings: 0,
//           save: false,
//         },

//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriVideo: '',
//           uriImage:
//             'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/event-flyer-template-4d26bb8b3c4b197ae03e03bfc2207cdd_screen.jpg?ts=1636975449',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Palais des Congrès - قصر المؤتمرات',
//           favoris: true,
//           ratings: 0,
//           save: false,
//         },
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '2 janvier',
//           uriVideo: '',
//           uriImage:
//             'https://img.freepik.com/psd-gratuit/modele-annonce-vente-affiche_23-2148800103.jpg',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Salle des Séminaires',
//           favoris: true,
//           ratings: 0,
//           save: false,
//         },
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriVideo: '',
//           uriImage:
//             'https://img.freepik.com/psd-gratuit/affiche-modele-annonce-commerciale_23-2148702279.jpg?w=2000',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Salle des Séminaires',
//           favoris: true,
//           ratings: 0,
//           save: false,
//         },
//       ],
//     ],
//   },
//   {
//     title: 'Les plus vues',
//     data: [
//       [
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriImage:
//             'https://img.freepik.com/psd-gratuit/affiche-modele-annonce-commerciale_23-2148702279.jpg?w=2000',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'La badira',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//         {
//           title: 'Event virtuel',
//           date: '22 juillet',
//           uriImage:
//             'https://img.freepik.com/psd-gratuit/affiche-modele-annonce-entreprise_23-2148788944.jpg?size=338&ext=jpg',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'El Mouradi Hotel',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriImage:
//             'https://img.freepik.com/psd-gratuit/modele-affiche-evenement-entreprise_23-2148347484.jpg',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'El Mouradi Hotel ',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriImage:
//             'https://img.freepik.com/vecteurs-libre/affiche-evenement-elegante-splash-noir_1361-2193.jpg?w=2000',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Golf Royal Hotel',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriImage:
//             'https://img.freepik.com/vecteurs-libre/affiche-evenement-elegante-splash-noir_1361-2193.jpg?w=2000',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: '',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//       ],
//     ],
//   },
//   {
//     title: 'En cours de visualisation',
//     data: [
//       [
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriImage:
//             'https://img.pikbest.com/01/57/30/52VpIkbEsTiMD.jpg-0.jpg!bw700',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Golf Royal Hotel',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriImage:
//             'https://img.pikbest.com/05/61/83/83kpIkbEsTqMC.jpg-0.jpg!bw700',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Golf Royal Hotel',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriImage:
//             'https://previews.123rf.com/images/provector/provector1604/provector160400049/56013533-retro-summer-holidays-partie-affiche-plage-ou-flyer-mod%C3%A8le-de-conception-night-club-event-retro-typo.jpg',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Golf Royal Hotel',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriImage:
//             'https://img.freepik.com/vecteurs-libre/affiche-evenement-elegante-splash-noir_1361-2193.jpg?w=2000',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Golf Royal Hotel',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//         {
//           title: 'Team bilding With Millessima Events',
//           date: '22 juillet',
//           uriImage:
//             'https://img.freepik.com/vecteurs-libre/affiche-evenement-elegante-splash-noir_1361-2193.jpg?w=2000',
//           uriVideo: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//           orateurs: 'Zied Houa',
//           moderateurs: 'Hanen Abdelkrim',
//           description:
//             'Chez Millesima Events nous allions la technologie chroma au présentiel et nous adorons réussir nos défis! 💪🤩',
//           sponsors: [{}],
//           lieu: 'Golf Royal Hotel',
//           favoris: true,
//           ratings: 3,
//           save: false,
//         },
//       ],
//     ],
//   },
// ];
