import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({moneda, guardarMoneda, criptomoneda, guardarCriptomoneda, guardarConsultarApi}) => {
    
    const [criptomonedas, guardarCriptomonedas] = useState([]);

    //useEffect se usa para consumir datos de un API, es lo mas recomendado
    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
            const res = await axios.get(url)
            guardarCriptomonedas(res.data.Data)
        }
        consultarApi()
    }, [])

    //Almacena los datos seleccionados por el usuario
    const obtenerMoneda = moneda => {
        guardarMoneda(moneda)
    }
    const obtenerCriptomoneda = cripto => {
        guardarCriptomoneda(cripto)
        console.log(guardarCriptomoneda)
    }
    //Se detona cuando se presiona el boton de cotizar
    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta();
            return;
        }
        guardarConsultarApi(true)
    }
    //Funcion que muestra una alerta
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ambos campos son necesarios para realizar la cotización',
            [
                { text: "Ok" }
            ]
        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
                <Picker
                    selectedValue={ moneda }
                    onValueChange={ moneda => obtenerMoneda(moneda) }
                    itemStyle={{height:120}}
                >
                    <Picker.Item label='- Seleccione -' value=""/>
                    <Picker.Item label='Dolar de Estados Unidos' value="USD"/>
                    <Picker.Item label='Peso Mexicano' value="MXN"/>
                    <Picker.Item label='Euro' value="EUR"/>
                    <Picker.Item label='Libra Esterlina' value="GBP"/>
                </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
                <Picker
                    selectedValue={ criptomoneda }
                    onValueChange={ cripto => obtenerCriptomoneda(cripto) }
                    itemStyle={{height:120}}
                >
                    <Picker.Item label='- Seleccione -' value=""/>
                    { criptomonedas.map( cripto => (
                        <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
                    ))}
                </Picker>
            <TouchableHighlight 
                style={styles.boton}
                onPress={ () => cotizarPrecio() }>
                <Text style={styles.txtCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create ({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 30,
        color: '#000'
    },
    boton: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 40,
        borderRadius: 20,
    },
    txtCotizar: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})
export default Formulario