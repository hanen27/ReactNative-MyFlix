import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import Input from '../../components/CustomInput';
import {getSize, changeColorOpacity} from 'helpers';
import styles from './style';
import Colors from '../../Constantes/Colors';
import {useState, useRef} from 'react';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useSelector, useDispatch} from 'react-redux';

const FormOne = ({
  titre,
  setTitre,
  setDescription,
  description,
  setDate,
  date,
  setLieu,
  lieu,
  setCategorie,
  categorie,
  theme,
  setTheme,
}) => {
  const [open, setOpen] = useState(false);

  const Categories = useSelector(state => state.event.categories);
  const Themes = useSelector(state => state.event.themes);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const addZero = i => {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  };
  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          backgroundColor: changeColorOpacity(Colors.gray, 20),
          height: getSize(0.5),
          marginHorizontal: getSize(10),
        }}
      />
    );
  };

  const Item = ({title, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.titleItem}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.formOne}>
      <View style={styles.viewTextInput}>
        <Text style={styles.textInput}>{StringsFr.title}</Text>
        <Input
          style={'ADD'}
          onchangeText={text => setTitre(text)}
          value={titre}
        />
      </View>
      <View style={styles.viewTextInput}>
        <Text style={styles.textInput}>{StringsFr.description}</Text>
        <Input
          style={'ADD'}
          onchangeText={text => setDescription(text)}
          value={description}
        />
      </View>
      <View style={styles.viewTextInput}>
        <Text style={styles.textInput}>{StringsFr.date}</Text>
        <Pressable
          style={styles.Picker}
          onPress={() => {
            setOpen(true);
          }}>
          <DatePicker
            modal
            open={open}
            date={date}
            onDateChange={date => {
              setDate(date);
            }}
            mode="datetime"
            onConfirm={date => {
              setOpen(false);
              console.log('ddddd', date.getTime());
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Text style={styles.text}>
            {addZero(date.getDate()) +
              '/' +
              addZero(date.getMonth()) +
              '/' +
              addZero(date.getFullYear()) +
              ' à ' +
              addZero(date.getHours()) +
              ':' +
              addZero(date.getMinutes())}
          </Text>
        </Pressable>
      </View>
      <View style={styles.viewTextInput}>
        <Text style={styles.textInput}>{StringsFr.lieu}</Text>
        <Input
          style={'ADD'}
          onchangeText={text => setLieu(text)}
          value={lieu}
        />
      </View>
      <View style={styles.viewTextInput}>
        <Text style={styles.textInput}>{StringsFr.Categories}</Text>
        <Pressable
          style={styles.Picker}
          onPress={() => {
            if (refRBSheet.current) {
              refRBSheet.current.open();
            }
          }}>
          <Text style={styles.text}>{categorie.name}</Text>
        </Pressable>
        <RBSheet
          ref={refRBSheet}
          height={getSize(350)}
          openDuration={250}
          dragFromTopOnly
          customStyles={{
            container: {
              borderTopRightRadius: getSize(20),
              backgroundColor: '#1F303B',

              borderTopLeftRadius: getSize(20),
            },
          }}>
          <View
            style={{
              backgroundColor: changeColorOpacity(Colors.gray, 15),
              marginHorizontal: getSize(20),
              marginTop: getSize(15),
              borderRadius: getSize(30),
              height: getSize(45),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.title}>{StringsFr.Categories}</Text>
          </View>
          <View style={styles.container}>
            <FlatList
              data={Categories}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <Item
                  title={item.name}
                  onPress={() => {
                    setCategorie(item);
                    refRBSheet.current.close();
                  }}
                />
              )}
              ItemSeparatorComponent={FlatListItemSeparator}
            />
          </View>
        </RBSheet>
      </View>
      <View style={styles.viewTextInput}>
        <Text style={styles.textInput}>{StringsFr.Themes}</Text>
        <Pressable
          style={styles.Picker}
          onPress={() => {
            if (refRBSheet1.current) {
              refRBSheet1.current.open();
            }
          }}>
          <Text style={styles.text}>{theme.name}</Text>
        </Pressable>
        <RBSheet
          ref={refRBSheet1}
          height={getSize(350)}
          openDuration={250}
          dragFromTopOnly
          customStyles={{
            container: {
              borderTopRightRadius: getSize(20),
              backgroundColor: '#1F303B',

              borderTopLeftRadius: getSize(20),
            },
          }}>
          <View
            style={{
              backgroundColor: changeColorOpacity(Colors.gray, 15),
              marginHorizontal: getSize(20),
              marginTop: getSize(15),
              borderRadius: getSize(30),
              height: getSize(45),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.title}>{StringsFr.Themes}</Text>
          </View>
          <View style={styles.container}>
            <FlatList
              data={Themes}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <Item
                  title={item.name}
                  onPress={() => {
                    setTheme(item);
                    refRBSheet1.current.close();
                  }}
                />
              )}
              ItemSeparatorComponent={FlatListItemSeparator}
            />
          </View>
        </RBSheet>
      </View>
    </View>
  );
};

export default FormOne;
