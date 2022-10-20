import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

import { addProductCartApi, getProductCartApi } from "../../api/cart";

export default function Buy(props) {
  const { product, quantity } = props;

  const addProductCart = async () => {
    const response = await addProductCartApi(product._id, quantity);

    if (response) {
      Toast.show("Producto añadido al carrito", {
        position: Toast.positions.CENTER,
      });
    } else {
      Toast.show("Error al añadir el producto al carrito", {
        position: Toast.positions.CENTER,
      });
    }
  };
  return (
    <View style={{ zIndex: 1 }}>
      <RootSiblingParent>
        <Button
          mode="contained"
          contentStyle={styles.btnBuyContent}
          labelStyle={styles.btnLabel}
          style={styles.btn}
          onPress={addProductCart}
        >
          Añadir a la cesta
        </Button>
      </RootSiblingParent>
    </View>
  );
}
const styles = StyleSheet.create({
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
  },
});
