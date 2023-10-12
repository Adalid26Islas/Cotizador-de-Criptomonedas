import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';

const App = () => {
  return (
    <>
      <Header />
      <Image
        source={require('./assets/img/cryptomonedas.png')}
        style={styles.imagen}
      />
      <View style={styles.contenido}>
        <Formulario/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginBottom: 30
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
