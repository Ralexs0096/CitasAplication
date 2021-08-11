import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TextComponent,
  TouchableHighlight,
  Alert,
  ScrollView
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "shortid";

const Formulario = ({citas, setCitas, setMostarForm}) => {
  const [paciente, setPaciente] = useState("");
  const [propietario, setPropietario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [sintoma, setSintoma] = useState("");

  // Picker States
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // Date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const ConfirmarFecha = (date) => {
    const opciones = { year: "numeric", month: "long", day: "2-digit" };
    setFecha(date.toLocaleDateString("es-ES", opciones));
    hideDatePicker();
  };

  // Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const ConfirmarHora = (hora) => {
    const opciones = { hour: "numeric", minute: "2-digit" };
    setHora(hora.toLocaleTimeString("es-ES", opciones));
    hideTimePicker();
  };

  // Crear nueva Cita
  const crearNuevaCita = () => {
    if(paciente.trim() === '' || 
        propietario.trim() === '' || 
        telefono.trim() === '' || 
        fecha.trim() === '' ||
        hora.trim() === '' ||
        sintoma.trim() === '') {
            // falla la validacion
            mostrarAlerta()
        }
    const cita = {paciente, propietario, telefono, fecha, hora, sintoma};
    cita.id = shortid.generate();
    // console.log(cita);

    // Agregar al State
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    // Ocultar el formulario
    setMostarForm(false);

    // Resetear el formulario


  }

  // Alerta si la validacion falla
  const mostrarAlerta = () => {
      Alert.alert(
          'Error', // Titulo
          'Todos los campos son obligatorios', // Cuerpo
          [{
              text: 'OK' // arreglo de botones
          }]
      )
  }

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Propietario: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPropietario(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Telefono de contacto: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setTelefono(texto)}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha: </Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={ConfirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige la fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora: </Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={ConfirmarHora}
            onCancel={hideTimePicker}
            headerTextIOS="Elige una Hora"
            // is24Hour
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Sintomas: </Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(texto) => setSintoma(texto)}
          />
        </View>

        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}
          >
            <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: "#7d024e",
    marginVertical: 10,
    marginBottom: 20
  },
  textoSubmit: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  }
});

export default Formulario;
