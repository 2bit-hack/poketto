/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {Card, Chip, Text, Headline} from 'react-native-paper';

import typeColors from '../typeColors';

const capitalize = (name) =>
  [...name.split('')[0].toUpperCase(), ...name.split('').slice(1)].join('');

const concatenate = (name) =>
  name
    .split('-')
    .map((n) => capitalize(n))
    .join(' ');

const PokeListItem = ({url, navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) {
          setData(json);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Card
          style={{
            ...styles.card,
            ...{
              backgroundColor: typeColors[data.types[0].type.name] + '22',
            },
          }}
          onPress={() =>
            navigation.navigate('Detail', {
              data,
            })
          }>
          <Card.Content>
            <View style={styles.header}>
              <View>
                <View style={styles.titleCard}>
                  <Headline style={styles.id}>
                    #{data.id.toString().padStart(3, '0')}
                  </Headline>
                  <Headline style={styles.title}>
                    {concatenate(data.name)}
                  </Headline>
                </View>
                <View style={styles.types}>
                  {data.types.map((typeObj) => (
                    <View key={typeObj.slot} style={styles.type}>
                      <Chip
                        style={{
                          borderColor: typeColors[typeObj.type.name],
                          elevation: 1,
                        }}
                        mode="outlined">
                        <Text style={{color: typeColors[typeObj.type.name]}}>
                          {typeObj.type.name}
                        </Text>
                      </Chip>
                    </View>
                  ))}
                </View>
              </View>
              <Image
                style={styles.img}
                source={{
                  uri: data.sprites.other['official-artwork'].front_default,
                }}
              />
            </View>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 0,
    borderRadius: 0,
    borderWidth: 0,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    padding: 5,
    paddingLeft: 20,
    elevation: 0,
    fontSize: 16,
  },
  id: {
    padding: 5,
    elevation: 0,
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  type: {
    paddingHorizontal: 5,
  },
  img: {
    width: 96,
    height: 96,
  },
});

export default PokeListItem;
