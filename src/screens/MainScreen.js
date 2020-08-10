import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

const MainScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>poketto</Text>
      <Button onPress={() => navigation.navigate('Detail')}>
        Go to details
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainScreen;
