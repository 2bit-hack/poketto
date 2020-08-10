import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const MainScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>poketto</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Detail')}
      />
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
