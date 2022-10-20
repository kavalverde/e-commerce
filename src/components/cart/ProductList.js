import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { map } from "lodash";
import ScreenLoading from "../../components/ScreenLoading";
import Product from "../../components/cart/Product";
import { getProductApi } from "../../api/product";

export default function ProductList(props) {
  const { cart, products, setProducts, setReload, setTotalPayment } = props;

  const calcPrice = (price, discount) => {
    if (!discount) return price;
    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  useEffect(() => {
    setProducts(null);
    (async () => {
      const productTemp = [];
      let totalPaymentTemp = 0;

      for await (const product of cart) {
        const response = await getProductApi(product.idProduct);
        response.quantity = product.quantity;
        productTemp.push(response);

        totalPaymentTemp +=
          calcPrice(response.price, response.discount) * response.quantity;
      }

      setProducts(productTemp);
      setTotalPayment(totalPaymentTemp);
    })();
  }, [cart]);

  return (
    <View>
      <Text style={styles.title}>Productos: </Text>
      {!products ? (
        <ScreenLoading text="Cargando carrito" />
      ) : (
        map(products, (product) => (
          <Product key={product._id} product={product} setReload={setReload} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
