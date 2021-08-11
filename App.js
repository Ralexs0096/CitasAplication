import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

export default function App() {

  const [mostarForm, setMostarForm] = useState(false);

  // definir el state de citas
  const [citas, setCitas] = useState([]);

  // Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };

  // Muestra u oculta el formulario
  const mostarFormulario = () => {
    setMostarForm(!mostarForm);
  }

    // ocultar el teclado
    const cerrarTeclado = () => {
      Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de Citas</Text>

      <View>
        <TouchableHighlight
          onPress={() => mostarFormulario()}
          style={styles.btnMostarForm}
        >
          <Text style={styles.textoMostarForm}>{mostarForm ? 'Ver listado de Citas' : 'Crear Nueva Cita'}</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.contenido}>
        {mostarForm ? (
          <>
            <Text style={styles.titulo}>Crear Nueva Cita</Text>
            <Formulario 
              citas={citas}
              setCitas={setCitas}
              setMostarForm={setMostarForm}
            />
          </>
        ) : (
          <>
            <Text style={styles.titulo}>
              {citas.length > 0
                ? "Administra tus Citas"
                : "No hay citas, agrega una"}
            </Text>
            <FlatList
              style={styles.listado}
              data={citas}
              renderItem={({ item }) => (
                <Cita cita={item} eliminarPaciente={eliminarPaciente} />
              )}
              keyExtractor={(cita) => cita.id}
            />
          </>
        )}
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#AA076B",
    flex: 1,
  },
  titulo: {
    color: "#FFF",
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.5%",
  },
  listado: {
    flex: 1
  },
  btnMostarForm: {
    padding: 10,
    backgroundColor: "#7d024e",
    marginVertical: 10,
    marginBottom: 20
  },
  textoMostarForm: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  }
});
