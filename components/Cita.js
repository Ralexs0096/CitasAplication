import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

export default function Cita({ cita, eliminarPaciente }) {
  const dialogoEliminar = (id) => {
    console.log("Eliminando...", id);
    eliminarPaciente(id);
  };

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.text}>{cita.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario: </Text>
        <Text style={styles.text}>{cita.propietario}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintoma: </Text>
        <Text style={styles.text}>{cita.sintoma}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(cita.id)}
          style={styles.btnEliminar}
        >
          <Text style={styles.textoEliminar}> Eliminar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cita: {
    backgroundColor: "#FFF",
    borderBottomColor: "#e1e1e1",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
  },
  textoEliminar: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
