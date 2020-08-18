/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {Card, Title, Headline, Chip} from 'react-native-paper';

import typeColors from '../typeColors';
import {concatenate, getProgress} from '../utilityFunctions';

const getWidth = (progress) => 0.8 * Dimensions.get('window').width * progress;

const DetailScreen = ({route}) => {
  const {data} = route.params;

  return (
    <ScrollView
      style={{
        ...styles.viewContainer,
        backgroundColor:
          data.types.length > 0
            ? typeColors[data.types[0].type.name] + '22'
            : '#ffffff',
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
            <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={styles.titleStat}>HP</Text>
              <View
                style={{
                  ...styles.progressBar,
                  width: Math.round(
                    getWidth(getProgress(data.stats[0].base_stat)),
                  ),
                  backgroundColor:
                    data.types.length > 0
                      ? typeColors[data.types[0].type.name] + '55'
                      : '#000000',
                }}>
                <Text style={styles.stat}>{data.stats[0].base_stat}</Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={styles.titleStat}>ATK</Text>
              <View
                style={{
                  ...styles.progressBar,
                  width: getWidth(getProgress(data.stats[1].base_stat)),
                  backgroundColor:
                    data.types.length > 0
                      ? typeColors[data.types[0].type.name] + '55'
                      : '#000000',
                }}>
                <Text style={styles.stat}>{data.stats[1].base_stat}</Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={styles.titleStat}>DEF</Text>
              <View
                style={{
                  ...styles.progressBar,
                  width: Math.round(
                    getWidth(getProgress(data.stats[2].base_stat)),
                  ),
                  backgroundColor:
                    data.types.length > 0
                      ? typeColors[data.types[0].type.name] + '55'
                      : '#000000',
                }}>
                <Text style={styles.stat}>{data.stats[2].base_stat}</Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={styles.titleStat}>SPL ATK</Text>
              <View
                style={{
                  ...styles.progressBar,
                  width: Math.round(
                    getWidth(getProgress(data.stats[3].base_stat)),
                  ),
                  backgroundColor:
                    data.types.length > 0
                      ? typeColors[data.types[0].type.name] + '55'
                      : '#000000',
                }}>
                <Text style={styles.stat}>{data.stats[3].base_stat}</Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={styles.titleStat}>SPL DEF</Text>
              <View
                style={{
                  ...styles.progressBar,
                  width: Math.round(
                    getWidth(getProgress(data.stats[4].base_stat)),
                  ),
                  backgroundColor:
                    data.types.length > 0
                      ? typeColors[data.types[0].type.name] + '55'
                      : '#000000',
                }}>
                <Text style={styles.stat}>{data.stats[4].base_stat}</Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
              <Text style={styles.titleStat}>SPD</Text>
              <View
                style={{
                  ...styles.progressBar,
                  width: Math.round(
                    getWidth(getProgress(data.stats[5].base_stat)),
                  ),
                  backgroundColor:
                    data.types.length > 0
                      ? typeColors[data.types[0].type.name] + '55'
                      : '#000000',
                }}>
                <Text style={styles.stat}>{data.stats[5].base_stat}</Text>
              </View>
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
    paddingTop: '2%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    elevation: 2,
    fontSize: 16,
  },
  titleStat: {
    fontSize: 11,
    marginLeft: '2%',
  },
  id: {
    elevation: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  img: {
    width: 160,
    height: 160,
  },
  statCard: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 0,
  },
  data: {
    flex: 2,
    flexDirection: 'row',
  },
  stat: {
    fontSize: 11,
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
    paddingBottom: '3%',
  },
  type: {
    paddingHorizontal: 5,
  },
  progressBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '1%',
    margin: '1%',
    borderRadius: 5,
    height: 20,
    borderWidth: 1,
  },
});

export default DetailScreen;
