import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {Card, Title} from 'react-native-paper';

import typeColors from '../typeColors';
import {concatenate} from '../utilityFunctions';

const PokeGridItem = ({url, navigation}) => {
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
              backgroundColor:
                data.types.length > 0
                  ? typeColors[data.types[0].type.name] + '22'
                  : '#ffffff',
            },
          }}
          onPress={() =>
            navigation.navigate('Detail', {
              data,
            })
          }>
          <Card.Content style={styles.content}>
            <Image
              style={styles.img}
              source={{
                uri: data.sprites.other['official-artwork'].front_default,
              }}
            />
            <Title style={styles.title}>{concatenate(data.name)}</Title>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    margin: '2%',
    borderWidth: 0,
    elevation: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  img: {
    width: 96,
    height: 96,
  },
});

export default PokeGridItem;
