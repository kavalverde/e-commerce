import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NotProduct() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No tiene productos en el carrito</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});
