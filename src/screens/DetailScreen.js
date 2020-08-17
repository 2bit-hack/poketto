/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';
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
    <ScrollView
      style={{
        ...styles.viewContainer,
        backgroundColor: typeColors[data.types[0].type.name] + '22',
      }}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{
            uri: data.sprites.other['official-artwork'].front_default,
          }}
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
      <Card style={styles.statCard}>
        <Card.Content>
          <View>
            <View style={styles.stats}>
              <Text style={styles.titleStat}>HP: </Text>
              <Text style={styles.titleStat}>{data.stats[0].base_stat}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.titleStat}>ATK: </Text>
              <Text style={styles.titleStat}>{data.stats[1].base_stat}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.titleStat}>DEF: </Text>
              <Text style={styles.titleStat}>{data.stats[2].base_stat}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.titleStat}>SPL ATK: </Text>
              <Text style={styles.titleStat}>{data.stats[3].base_stat}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.titleStat}>SPL DEF: </Text>
              <Text style={styles.titleStat}>{data.stats[4].base_stat}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.titleStat}>SPD: </Text>
              <Text style={styles.titleStat}>{data.stats[5].base_stat}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '10%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    elevation: 2,
    fontSize: 20,
    // fontWeight: 'bold',
  },
  titleStat: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  id: {
    elevation: 2,
    fontSize: 20,
    fontWeight: 'bold',
  },
  img: {
    width: 192,
    height: 192,
  },
  statCard: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 0,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
    paddingBottom: '5%',
  },
  type: {
    paddingHorizontal: 5,
  },
});

export default DetailScreen;
