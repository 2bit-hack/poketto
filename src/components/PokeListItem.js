import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Image, StyleSheet} from 'react-native';
import {Card, Title, Chip} from 'react-native-paper';

const capitalize = (name) =>
  [...name.split('')[0].toUpperCase(), ...name.split('').slice(1)].join('');

const concatenate = (name) =>
  name
    .split('-')
    .map((n) => capitalize(n))
    .join(' ');

const PokeListItem = ({url}) => {
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
        <Card>
          <Card.Content>
            <View style={styles.header}>
              <Title>{concatenate(data.name)}</Title>
              <Image
                style={styles.img}
                source={{uri: data.sprites.front_default}}
              />
            </View>
            <View style={styles.types}>
              {data.types.map((typeObj) => (
                <View style={styles.type}>
                  <Chip key={typeObj.slot} mode="outlined">
                    {typeObj.type.name}
                  </Chip>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  types: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  type: {
    paddingHorizontal: 2,
  },
  img: {
    width: 96,
    height: 96,
  },
});

export default PokeListItem;
