import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { map } from "lodash";

import Product from "./Product";

export default function FavoritesList(props) {
  const { products, setReload } = props;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Listado de favoritos</Text>
      {map(products, (item) => (
        <Product key={item._id} item={item} setReload={setReload} />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
});
