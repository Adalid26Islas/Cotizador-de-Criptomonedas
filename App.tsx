import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import axios from 'axios';

const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    const cotizarCriptomoneda =async () => {
      if (consultarApi) {
        //consultar API para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const res = await axios.get(url)
        guardarResultado(res.data.DISPLAY[criptomoneda][moneda])

        guardarConsultarApi(false);
      }
    }
    cotizarCriptomoneda();
  }, [consultarApi]);
  return (
    <>
      <Header />
      <Image
        source={require('./assets/img/cryptomonedas.png')}
        style={styles.imagen}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultarApi={guardarConsultarApi}
        />
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
