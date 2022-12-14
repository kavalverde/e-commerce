import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Price(props) {
  const { price, discount } = props;
  const calcPrice = (price, discount) => {
    if (!discount) return price;
    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };
  return (
    <View>
      {discount && (
        <View style={styles.containerData}>
          <Text style={styles.dataText}>Precio Recomendado: </Text>
          <Text style={[styles.dataValue, styles.oldPrice]}>{price} $</Text>
        </View>
      )}

      <View style={styles.containerData}>
        <Text style={styles.dataText}>Price: </Text>
        <Text style={[styles.dataValue, styles.currentPrice]}>
          {calcPrice(price, discount)} $
        </Text>
      </View>
      {discount && (
        <View style={styles.containerData}>
          <Text style={styles.dataText}> Ahorras: </Text>
          <Text style={[styles.dataValue, styles.saving]}>
            {((price * discount) / 100).toFixed(2)} $ ({discount}%)
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  containerData: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  dataText: {
    width: "50%",
    fontSize: 17,
    color: "#747474",
    textAlign: "right",
  },
  dataValue: {
    width: "50%",
    fontSize: 17,
    paddingLeft: 5,
  },
  oldPrice: {
    textDecorationLine: "line-through",
  },
  currentPrice: {
    fontSize: 23,
    color: "#bc0e0d",
  },
  saving: {
    color: "#bc0e0d",
  },
});
