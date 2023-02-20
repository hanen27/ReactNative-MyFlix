import {View, Text, ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import React from 'react';
import {getSize, changeColorOpacity} from 'helpers';
import styles from './style';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from '../../config.json';
import Colors from '../../Constantes/Colors';
import {BallIndicator, BarIndicator} from 'react-native-indicators';
import {useState, useRef} from 'react';
import storage from '@react-native-firebase/storage';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const Icon = createIconSetFromFontello(fontelloConfig);

const FormThree = ({showVideo, setVideo, video, affiche, setAffiche}) => {
  const [nomImage, setNomImage] = useState('');
  const [nomVideo, setNomVideo] = useState('');
  const [isLoadingv, setIsLoadingV] = useState(false);
  const [isLoadingI, setIsLoadingI] = useState(false);

  console.log('fffffffffffffdfsfq<', video, affiche);

  const uploadImage = async (uri, name, firebasePath) => {
    const imageRef = storage().ref(`${firebasePath}/${name}`);
    console.log('imageRef', imageRef);

    await imageRef.putFile(uri).catch(error => {
      console.log('error', error);
    });

    const url = await imageRef.getDownloadURL().catch(error => {
      console.log('error', error);
    });
    return url;
  };
  return (
    <View style={styles.formOne}>
      <Pressable
        style={styles.Import}
        onPress={() => {
          ImagePicker.openPicker({cropping: true})

            .then(async image => {
              setIsLoadingI(true);
              let filename = image.path.substring(
                image.path.lastIndexOf('/') + 1,
              );
              const uploadedUrl = await uploadImage(
                image.path,
                filename,
                'Affiche',
              );
              console.log('afiche', uploadedUrl);
              setAffiche(uploadedUrl);
              setNomImage(
                image.path.split('/')[image.path.split('/').length - 1],
              );
              setIsLoadingI(false);
            })
            .catch(() => {
              setIsLoadingI(false);
            });
        }}>
        {isLoadingI ? (
          <View
            style={{
              alignSelf: 'center',
            }}>
            <ActivityIndicator size="small" color={Colors.priamry} />
          </View>
        ) : (
          <>
            <View style={{alignSelf: 'center'}}>
              <Icon
                name={affiche ? 'picture' : 'file-image'}
                size={30}
                color={changeColorOpacity(Colors.white, 70)}
              />
            </View>

            <View
              style={{
                alignSelf: 'center',

                width: getSize(200),
              }}>
              <Text numberOfLines={3} style={styles.textViedoAffiche}>
                {nomImage ? nomImage : StringsFr.Addphoto}
              </Text>
            </View>
          </>
        )}
      </Pressable>

      {showVideo && (
        <Pressable
          style={styles.Import}
          onPress={() => {
            ImagePicker.openPicker({mediaType: 'video'})
              .then(async video => {
                setIsLoadingV(true);

                let filename = video.path.substring(
                  video.path.lastIndexOf('/') + 1,
                );
                const uploadedUrl = await uploadImage(
                  video.path,
                  filename,
                  'Video',
                );
                console.log('video', uploadedUrl);
                setVideo(uploadedUrl);
                setNomVideo(
                  video.path.split('/')[video.path.split('/').length - 1],
                );
                setIsLoadingV(false);
              })
              .catch(() => {
                setIsLoadingV(false);
              });
          }}>
          {isLoadingv ? (
            <View
              style={{
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="small" color={Colors.priamry} />
            </View>
          ) : (
            <>
              <View style={{alignSelf: 'center'}}>
                <Icon
                  name={video ? 'videocam' : 'file-video'}
                  size={30}
                  color={changeColorOpacity(Colors.white, 70)}
                />
              </View>
              <View style={{alignSelf: 'center', width: getSize(200)}}>
                <Text style={styles.textViedoAffiche}>
                  {nomVideo ? nomVideo : StringsFr.Addvideo}
                </Text>
              </View>
            </>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default FormThree;
