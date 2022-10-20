import React, { useState, useEffect } from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/search";
import ScreenLoading from "../../components/ScreenLoading";
import CarouselImage from "../../components/product/CarouselImage";
import Price from "../../components/product/Price";
import Quantity from "../../components/product/Quantity";
import Buy from "../../components/product/Buy";
import Favorite from "../../components/product/Favorite";
import { getProductApi } from "../../api/product";
import colors from "../../styles/colors";

export default function Product(props) {
  const { route } = props;
  const { params } = route;
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProduct(null);
    (async () => {
      const response = await getProductApi(params.idProduct);
      setProduct(response);
      const arrayImage = [response.main_image];
      arrayImage.push(...response.images);
      setImage(arrayImage);
    })();
  }, [params]);
  return (
    <>
      <StatusBar backGroundColor={colors.bgDark} barstyle="light-content" />
      <Search />
      {!product ? (
        <ScreenLoading text="Cargando producto" size="large" />
      ) : (
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{product.title}</Text>
          <CarouselImage images={image} />
          <View style={styles.containerView}>
            <Price price={product.price} discount={product.discount} />
            <Quantity quantity={quantity} setQuantity={setQuantity} />
            <Buy product={product} quantity={quantity} />
            <Favorite product={product} />
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 8,
  },
  containerView: {
    padding: 10,
    paddingBottom: 200,
  },
});
