import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, FlatList} from 'react-native';

import constants from '../constants';
import {concatenate} from '../utilityFunctions';

import PokeListItem from '../components/PokeListItem';
import PokeGridItem from '../components/PokeGridItem';

import {TextInput, Button} from 'react-native-paper';

const MainScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('LIST');
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const renderPokeListItem = ({item}) => {
    return <PokeListItem url={item.url} navigation={navigation} />;
  };

  const renderPokeGridItem = ({item}) => {
    return <PokeGridItem url={item.url} navigation={navigation} />;
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => setViewType(viewType === 'LIST' ? 'GRID' : 'LIST')}>
          {viewType}
        </Button>
      ),
    });
  }, [navigation, viewType]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View>
            <TextInput
              label="Search..."
              mode="flat"
              value={query}
              disabled={isLoading}
              onChangeText={(text) => setQuery(text)}
            />
          </View>
          {viewType === 'LIST' ? (
            <FlatList
              data={data.filter((pokemon) =>
                concatenate(pokemon.name).includes(query),
              )}
              removeClippedSubviews={true}
              renderItem={renderPokeListItem}
              key={'_'}
              keyExtractor={(pokemon) => {
                return '_' + pokemon.name;
              }}
              numColumns={1}
            />
          ) : (
            <FlatList
              data={data.filter((pokemon) =>
                concatenate(pokemon.name).includes(query),
              )}
              removeClippedSubviews={true}
              renderItem={renderPokeGridItem}
              key={'#'}
              keyExtractor={(pokemon) => {
                return '#' + pokemon.name;
              }}
              numColumns={2}
            />
          )}
        </>
      )}
    </View>
  );
};

export default MainScreen;
