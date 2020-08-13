import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, FlatList, StyleSheet} from 'react-native';

import constants from '../constants';
import PokeListItem from '../components/PokeListItem';

const MainScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const renderPokeListItem = ({item}) => {
    return <PokeListItem url={item.url} />;
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
        <FlatList
          data={data}
          renderItem={renderPokeListItem}
          keyExtractor={(pokemon) => {
            return pokemon.url;
          }}
        />
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
