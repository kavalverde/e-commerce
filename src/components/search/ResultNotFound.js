import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ResultNotFound(props) {
  const { search } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>No hay resultados para {search}.</Text>
      <Text style={styles.otherText}>
        Revisa que tu ortografía o usa un termino diferente.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    marginTop: "50%",
  },
  searchText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  otherText: {
    fontSize: 14,
    paddingTop: 5,
  },
});
