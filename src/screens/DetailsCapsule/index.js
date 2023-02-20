import {
  View,
  Text,
  Alert,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Platform,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import styles from './style';
import React, { useState, useEffect } from 'react';
import Colors from '../../Constantes/Colors';
import { getSize, changeColorOpacity } from 'helpers';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import HeaderIcon from '../../components/CustomHeader/headerIcon';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { useRef } from 'react';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Orientation from 'react-native-orientation-locker';
import StringsFr from '../../Constantes/langue/fr';
import { AirbnbRating } from 'react-native-ratings';
import Overlay from 'react-native-modal-overlay';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { setEvent, setFavoriteEvent, setSavedEvent } from '../../Redux/event';
import { useDispatch } from 'react-redux';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { setRatedEvent, } from '../../Redux/user';

const Icon = createIconSetFromFontello(fontelloConfig);
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const DetailsScreen = ({ route, navigation }) => {
  const videoPlayer = useRef(null);
  const [event, setEventDetails] = useState(route.params.item);
  const [favoris, setfavoris] = useState(route.params.item?.favoris);
  const [saved, setSaved] = useState(route.params.item?.save);
  const [rated, setRated] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState();
  const user = useSelector(state => state.user.user);
  const favoriteEvent = useSelector(state => state.event.favoriteEvent);
  const savedEvent = useSelector(state => state.event.savedEvent);
  const ratedEvent = useSelector(state => state.user.ratedEvent);

  const dispatch = useDispatch();
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const fs = RNFetchBlob.fs;

  useEffect(() => {
    getSponsors();

  }, []);
  useEffect(() => {

    const rated = ratedEvent.filter((ev) => ev.eventId == event.id)
    if (rated.length > 0) {

      setRated(rated)
    }
  }, [event]);

  const getSponsors = () => {
    firestore()
      .collection('Events')
      .doc(event.id)
      .collection('Sponsors')
      .get()
      .then(resp => {
        let data = [];
        resp._docs.map(com => {
          data.push(com._data);
        });
        setSponsors(data);
      });
  };
  useEffect(() => {
    console.log('favorite ', favoriteEvent);

    favoriteEvent?.map(ev => {
      if (ev.id == event.id) {
        console.log('isFavoris');
        setfavoris(true);
      }
    });
    savedEvent?.map(ev => {
      if (ev.id == event.id) {
        console.log('isSaved');
        setSaved(true);
      }
    });
  }, []);
  useEffect(() => {
    const backAction = () => {
      if (isFullScreen) {
        Orientation.lockToPortrait();
        setIsFullScreen(!isFullScreen);
      } else {
        navigation.pop();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  });
  const onFullScreen = () => {
    isFullScreen ? Orientation.lockToPortrait() : Orientation.lockToLandscape();
    setIsFullScreen(!isFullScreen);
  };
  const shareTheProductDetails = imagesPath => {
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', event.uriImage)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(base64Data => {
        // here's base64 encoded image
        var imageUrl = 'data:image/png;base64,' + base64Data;
        let shareImage = {
          url: imageUrl,
          // urls: [imageUrl, imageUrl], // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
        };
        Share.open(shareImage)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            err && console.log(err);
          });
        // remove the file from storage
        return fs.unlink(imagePath);
      });
  };
  const onSeek = seek => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = currentVideoTime => setCurrentTime(currentVideoTime);

  const onPaused = newState => {
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
    }
  };


  const onProgress = data => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const addToFavorite = () => {
    firestore()
      .collection('Users')
      .doc(user?.token)
      .collection('Favoris')
      .add({ idEvent: event.id, id: '' })
      .then(res => {
        firestore()
          .collection('Users')
          .doc(user?.token)
          .collection('Favoris')
          .doc(res._documentPath._parts[3])
          .update({
            id: res._documentPath._parts[3],
          })
          .then(res => {
            setfavoris(!favoris);
            dispatch(setFavoriteEvent([...favoriteEvent, event]));
            console.log('added favorite ', favoriteEvent);
          });
      });
  };

  const deleteFromFavorite = () => {
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
  const favoriteAction = () => {
    !favoris ? addToFavorite() : deleteFromFavorite();
  };

  const saveEvent = () => {
    firestore()
      .collection('Users')
      .doc(user?.token)
      .collection('Saved')
      .add({ idEvent: event.id, id: '' })
      .then(res => {
        firestore()
          .collection('Users')
          .doc(user?.token)
          .collection('Saved')
          .doc(res._documentPath._parts[3])
          .update({
            id: res._documentPath._parts[3],
          })
          .then(res => {
            setSaved(!saved);
            dispatch(setSavedEvent([...savedEvent, event]));

            console.log('Saved');
          });
      });
  };
  const deleteEvent = () => {
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
            setSaved(!saved);
            dispatch(setSavedEvent(savedEvent.filter(ev => ev.id != event.id)));
            console.log('Saved deleted');
          });
      });
  };
  const saveAction = () => {
    !saved ? saveEvent() : deleteEvent();
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };
  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  const ratingCompleted = rating => {
    if (rated.length > 0) {
      firestore()
        .collection('Events')
        .doc(event.id)
        .update({
          ratings:
            (((parseInt(event.ratings)) * (parseInt(event.nbreRate)) - rated[0]?.rate) + rating) /
            (parseInt(event.nbreRate)),
        })
        .then(() => {
          console.log('rate succes');
          firestore()
            .collection('Events')
            .doc(event.id)
            .get()
            .then(res => {
              console.log('res', res._data);
              setEventDetails(res._data);

              firestore()
                .collection('Users')
                .doc(user?.token)
                .collection('Rated')
                .doc(rated[0]?.id)
                .update({
                  rate: rating,
                })
                .then(res => {
                  getRatedEvent()
                  getData()
                });
            });
        })
        .catch(e => console.log(e));
    } else {
      console.log("Not Rated ===", rated)
      firestore()
        .collection('Events')
        .doc(event.id)
        .update({
          nbreRate: event.nbreRate ? parseInt(event.nbreRate) + 1 : 1,
          ratings:
            (parseInt(event.ratings) * parseInt(event.nbreRate) + rating) /
            (parseInt(event.nbreRate) + 1),
        })
        .then(() => {
          console.log('rate succes');
          firestore()
            .collection('Events')
            .doc(event.id)
            .get()
            .then(res => {
              console.log('res', res._data);
              setEventDetails(res._data);
              firestore()
                .collection('Users')
                .doc(user.token)
                .collection('Rated')
                .add({
                  rate: rating,
                  eventId: event.id,
                  id: ''
                })
                .then(res => {
                  console.log("res._documentPath._parts[3]===", res._documentPath._parts[3]);
                  firestore()
                    .collection('Users')
                    .doc(user?.token)
                    .collection('Rated')
                    .doc(res._documentPath._parts[3])
                    .update({
                      id: res._documentPath._parts[3],
                    })
                    .then(res => {
                      getRatedEvent()
                      getData()
                    });

                });
            });
        })
        .catch(e => console.log(e));

    }
    setIsVisible(!isVisible);

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
        console.log("res res====", res)
        res._docs.map(ev => {
          data.push(ev._data)
        });
        setRated(data)
        dispatch(setRatedEvent(data)); console.log("data====", data)

      })
      .catch(() => {
        console.log("data====", data)
        // setLoading(false);
      });
  };
  const renderContent = () => {
    return (
      <>
        {!isFullScreen && (
          <HeaderIcon
            style="transparentHeader"
            text=""
            onPress={() => {
              navigation.goBack();
            }}
            withGradient
          />
        )}

        <ScrollView
          contentContainerStyle={
            isVisible ? styles.Transparent : styles.containerUnder
          }
          scrollEnabled={!isFullScreen}>
          <View style={[styles.containerViedo]}>
            {!!event?.uriVideo || event?.uriVideo != '' ? (
              <>
                <Video
                  source={{
                    uri: event?.uriVideo,
                  }}
                  onEnd={onEnd}
                  onLoad={onLoad}
                  onLoadStart={onLoadStart}
                  onProgress={onProgress}
                  paused={PLAYER_STATES.PAUSED == playerState}
                  ref={ref => (videoPlayer.current = ref)}
                  resizeMode={isFullScreen ? 'cover' : 'contain'}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
                <MediaControls
                  isFullScreen={isFullScreen}
                  onFullScreen={onFullScreen}
                  duration={duration}
                  isLoading={isLoading}
                  progress={currentTime}
                  onPaused={onPaused}
                  onReplay={onReplay}
                  onSeek={onSeek}
                  onSeeking={onSeeking}
                  mainColor={changeColorOpacity(Colors.priamry, 20)}
                  playerState={playerState}
                  sliderStyle={{
                    containerStyle: {},
                    thumbStyle: {},
                    trackStyle: {},
                  }}
                  style={
                    isFullScreen
                      ? { height: screenHeight, width: screenWidth }
                      : {
                        height: getSize(250),
                        width: '100%',
                      }
                  }
                />
              </>
            ) : (
              <Image
                source={{
                  uri: event?.uriImage,
                }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            )}
          </View>
          {!isFullScreen && (
            <>
              <LinearGradient
                colors={[
                  changeColorOpacity(Colors.backgroundColor, 0),
                  changeColorOpacity(Colors.backgroundColor, 50),
                  changeColorOpacity(Colors.backgroundColor, 80),
                  changeColorOpacity(Colors.backgroundColor, 90),
                  changeColorOpacity(Colors.backgroundColor, 100),
                ]}
                style={{
                  position: 'absolute',
                  top: getSize(350),
                  left: 0,
                  right: 0,
                  height: getSize(30),
                }}></LinearGradient>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[styles.Title]}>{event?.title}</Text>

                <Overlay
                  //animationType="slide"
                  //transparent={true}
                  childrenWrapperStyle={styles.modalView}
                  containerStyle={{ backgroundColor: '#00000099' }}
                  visible={isVisible}
                  closeOnTouchOutside
                  onClose={() => setIsVisible(false)}>
                  {/* <View
                  style={{
                    width: getSize(270),
                    height: getSize(150),
                  }}> */}
                  <Pressable
                    hitSlop={{
                      top: getSize(25),
                      bottom: getSize(25),
                      left: getSize(25),
                      right: getSize(25),
                    }}
                    onPress={() => setIsVisible(false)}
                    style={{
                      alignSelf: 'flex-end',
                      // paddingBottom: getSize(-20),
                      // backgroundColor: 'red',
                      // height: getSize(30),
                      // width: getSize(30),
                      // marginTop: getSize(10),
                    }}>
                    <Icon name="cancel" size={getSize(33)} color={Colors.gray} />
                  </Pressable>
                  <View
                    style={{
                      flex: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: getSize(50),
                    }}>
                    <Text style={styles.modalText}>Donnez Votre Avis ! </Text>

                    <AirbnbRating
                      ratingContainerStyle={{
                        alignSelf: 'center',
                        height: getSize(10),
                      }}
                      revies
                      count={5}
                      defaultRating={rated.length ? rated[0]?.rate : 0}
                      size={33}
                      onFinishRating={ratingCompleted}
                    />
                    {/* </View> */}
                    {/* <Pressable
                  style={{
                    justifyContent: 'center',
                    backgroundColor: changeColorOpacity(Colors.priamry, 85),
                    height: getSize(50),
                    width: getSize(300),
                    borderBottomEndRadius: 20,
                    borderBottomStartRadius: 20,
                  }}
                  onPress={() => setIsVisible(!isVisible)}>
                  <Text style={styles.textStyle}>Valider</Text>
                </Pressable> */}
                  </View>
                </Overlay>

                <TouchableOpacity
                  onPress={() => setIsVisible(!isVisible)}
                  style={styles.containerIconText}>
                  <Icon name="star" size={getSize(15)} color={'#eabc04'} />
                  <Text style={styles.startText}>
                    {event?.nbreRate
                      ? '(' + event?.nbreRate + ')'
                      : '(' + 0 + ')'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.descriptionText}>{event?.description}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: getSize(10),
                  alignItems: 'center',
                }}>
                <Icon
                  name="calendar"
                  size={12}
                  color={changeColorOpacity(Colors.white, 90)}
                />
                <Text style={[styles.dateText, { marginBottom: getSize(5) }]}>
                  {addZero(new Date(event.date).getDate()) +
                    '/' +
                    addZero(new Date(event.date).getMonth()) +
                    '/' +
                    addZero(new Date(event.date).getFullYear()) +
                    ' à ' +
                    addZero(new Date(event.date).getHours()) +
                    ':' +
                    addZero(new Date(event.date).getMinutes())}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: getSize(10),
                  alignItems: 'center',
                }}>
                <Icon
                  name="location"
                  size={12}
                  color={changeColorOpacity(Colors.white, 90)}
                />
                <Text style={styles.dateText}>{event?.lieu}</Text>
              </View>
              <View
                style={{
                  marginTop: getSize(10),
                  height: getSize(70),
                  width: getSize(375),
                  backgroundColor: changeColorOpacity(Colors.backgroundBar, 40),
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    favoriteAction();
                  }}>
                  <Icon
                    name={favoris ? 'heart' : 'heart-empty'}
                    size={getSize(22)}
                    color={favoris ? Colors.priamry : Colors.white}
                  />
                  <Text
                    style={[
                      styles.textIcon,
                      { color: favoris ? Colors.priamry : Colors.white },
                    ]}>
                    {favoris ? StringsFr.DontLike : StringsFr.like}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => saveAction()}>
                  <Icon
                    name={saved ? 'floppy-1' : 'floppy'}
                    size={getSize(22)}
                    color={saved ? Colors.priamry : Colors.white}
                  />
                  <Text
                    style={[
                      styles.textIcon,
                      { color: saved ? Colors.priamry : Colors.white },
                    ]}>
                    {saved ? StringsFr.delete : StringsFr.saved}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    shareTheProductDetails();
                  }}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="share" size={getSize(22)} color={Colors.white} />
                  <Text style={styles.textIcon}>Partager</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('Commentaire', { event: event })
                  }>
                  <Icon name="comment" size={getSize(22)} color={Colors.white} />
                  <Text style={styles.textIcon}>{StringsFr.comments}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: getSize(10),
                  width: getSize(375),

                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: getSize(5),
                    width: getSize(90),
                  }}>
                  {event?.orateurNom ? (
                    <Text style={styles.Orateurs}>{StringsFr.Orateur}</Text>
                  ) : (
                    <></>
                  )}
                  <Image
                    source={{ uri: event?.imageOrateur }}
                    style={{
                      width: getSize(40),
                      height: getSize(40),
                      borderRadius: getSize(20),
                      marginHorizontal: getSize(10),
                    }}
                    resizeMode="cover"
                  />
                  <Text style={styles.Orateurs}>{event?.orateurNom}</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: getSize(5),
                    width: getSize(80),
                  }}>
                  {event?.moderateurNom ? (
                    <Text style={styles.Orateurs}>{StringsFr.Moderateur}</Text>
                  ) : (
                    <></>
                  )}
                  <Image
                    source={{ uri: event?.imageModerateur }}
                    style={{
                      width: getSize(40),
                      height: getSize(40),
                      borderRadius: getSize(20),
                      marginHorizontal: getSize(10),
                    }}
                    resizeMode="cover"
                  />
                  <Text style={styles.Orateurs}>{event?.moderateurNom}</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: getSize(10),
                  height: getSize(70),
                  width: getSize(375),

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {sponsors.length > 0 ? (
                  <Text
                    style={[
                      styles.OrateursComment,
                      {
                        marginStart: getSize(5),
                        marginVertical: getSize(5),
                      },
                    ]}>
                    {StringsFr.sponsors}
                  </Text>
                ) : (
                  <></>
                )}
                <View style={{ flexDirection: 'row' }}>
                  {sponsors.length > 0 ? (
                    sponsors.map(item => {
                      return (
                        <TouchableOpacity
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: getSize(10),
                          }}>
                          <Image
                            source={{ uri: item.imageSponsor }}
                            style={{
                              width: getSize(40),
                              height: getSize(40),
                              borderRadius: getSize(20),
                              marginHorizontal: getSize(10),
                            }}
                            resizeMode="cover"
                          />
                          <Text style={styles.Orateurs}>{item.nameSponsor}</Text>
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </>
          )}
        </ScrollView></>)
  }
  return (
    isFullScreen ?
      <>{renderContent()}</>
      :
      <SafeAreaView style={{ backgroundColor: Colors.backgroundColor }}>
        {renderContent()}
      </SafeAreaView>

  );
};

export default DetailsScreen;
