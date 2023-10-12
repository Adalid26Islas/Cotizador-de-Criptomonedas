import React from 'react';
import {StyleSheet, Image} from 'react-native';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Image
        source={require('./assets/img/cryptomonedas.png')}
        style={styles.imagen}
      />
    </>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150
  }
});

export default App;
