/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Card, Title, Headline, Chip} from 'react-native-paper';

import typeColors from '../typeColors';

// TODO: extract these out to utility functions later

const capitalize = (name) =>
  [...name.split('')[0].toUpperCase(), ...name.split('').slice(1)].join('');

const concatenate = (name) =>
  name
    .split('-')
    .map((n) => capitalize(n))
    .join(' ');

const DetailScreen = ({route}) => {
  const {data} = route.params;

  return (
    <View>
      <Card>
        <Card.Content>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={{uri: data.sprites.front_default}}
            />
            <Headline style={styles.id}>
              #{data.id.toString().padStart(3, '0')}
            </Headline>
            <Title style={styles.title}>{concatenate(data.name)}</Title>
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
          <View style={styles.stats}>
            <View style={styles.statCard}>
              <Text style={styles.titleStat}>HP: </Text>
              <Text>{data.stats[0].base_stat}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.titleStat}>ATK: </Text>
              <Text>{data.stats[1].base_stat}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.titleStat}>DEF: </Text>
              <Text>{data.stats[2].base_stat}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.titleStat}>SPL ATK: </Text>
              <Text>{data.stats[3].base_stat}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.titleStat}>SPL DEF: </Text>
              <Text>{data.stats[4].base_stat}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.titleStat}>SPD: </Text>
              <Text>{data.stats[5].base_stat}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '50%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    padding: 5,
    elevation: 2,
    fontSize: 16,
  },
  titleStat: {
    fontSize: 16,
  },
  id: {
    padding: 5,
    elevation: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  img: {
    marginLeft: '10%',
    width: 192,
    height: 192,
  },
  stats: {
    paddingTop: '12%',
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  type: {
    paddingHorizontal: 5,
  },
});

export default DetailScreen;
