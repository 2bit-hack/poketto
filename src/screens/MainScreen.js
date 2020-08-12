import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import {Button} from 'react-native-paper';

// refactor this into a separate component
const BasicInfo = ({name}) => {
  return (
    <View style={styles.item}>
      <Text>{name}</Text>
    </View>
  );
};

const MainScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // let displayItem;

  const renderBasicInfo = ({item}) => {
    return <BasicInfo name={item.name} />;
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000')
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  // if (isLoading) {
  //   displayItem = <Text>Hello</Text>;
  // } else {
  //   displayItem = (
  //     <FlatList
  //       data={data.results}
  //       renderItem={renderBasicInfo}
  //       keyExtractor={(pokemon) => pokemon.name}
  //     />
  //   );
  // }

  return (
    <View style={styles.container}>
      {/* <Button onPress={() => console.log('Hi')}>Hello</Button> */}
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderBasicInfo}
          keyExtractor={(pokemon) => pokemon.name}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default MainScreen;
