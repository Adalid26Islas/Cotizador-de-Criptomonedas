import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, ScrollView, ActivityIndicator} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false)

  useEffect(() => {
    const cotizarCriptomoneda =async () => {
      if (consultarApi) {
        //consultar API para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const res = await axios.get(url)
        
        guardarCargando(true)
        //Ocultar el Spinner y mostrar el resultado
        setTimeout(() => {
            guardarResultado(res.data.DISPLAY[criptomoneda][moneda])
            guardarConsultarApi(false);
            guardarCargando(false)
        }, 3000);

      }
    }
    cotizarCriptomoneda();
  }, [consultarApi]);

  //mostrar el spinner o el resultado
  const componente = cargando ? <ActivityIndicator size={'large'} color={'#5E49E2'} /> : <Cotizacion resultado={resultado}/>

  return (
    <>
    <ScrollView>
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
      <View style={{marginTop: 40}}>
        {componente}
      </View>
      </ScrollView>
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
