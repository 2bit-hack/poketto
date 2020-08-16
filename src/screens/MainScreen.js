import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, FlatList, StyleSheet} from 'react-native';

import constants from '../constants';
import PokeListItem from '../components/PokeListItem';
import {TextInput, Avatar} from 'react-native-paper';

const capitalize = (name) =>
  [...name.split('')[0].toUpperCase(), ...name.split('').slice(1)].join('');

const concatenate = (name) =>
  name
    .split('-')
    .map((n) => capitalize(n))
    .join(' ');

const MainScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const renderPokeListItem = ({item}) => {
    return <PokeListItem url={item.url} navigation={navigation} />;
  };

  useEffect(() => {
    fetch(constants.basicURL)
      .then((response) => response.json())
      .then((json) => {
        setData(json.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <TextInput
            label="Search..."
            mode="flat"
            value={query}
            disabled={isLoading}
            onChangeText={(text) => setQuery(text)}
          />
          <FlatList
            data={data.filter((pokemon) =>
              concatenate(pokemon.name).includes(query),
            )}
            removeClippedSubviews={true}
            renderItem={renderPokeListItem}
            keyExtractor={(pokemon) => {
              return pokemon.name;
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;
