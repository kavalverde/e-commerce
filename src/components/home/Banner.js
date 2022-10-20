import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";

import { getBannersApi } from "../../api/home-banner";
import { API_URL } from "../../utils/constants";

const width = Dimensions.get("window").width;
const height = 160;

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [bannerActive, setBannerActive] = useState(0);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => goToProduct(item.product._id)}>
        <Image
          style={styles.carousel}
          source={{ uri: `${API_URL}${item.banner.url}` }}
        />
      </TouchableWithoutFeedback>
    );
  };
  const goToProduct = (id) => {
    navigation.push("product", { idProduct: id });
  };

  useEffect(() => {
    (async () => {
      const response = await getBannersApi();
      setBanners(response);
    })();
  }, []);

  if (!banners) return null;
  return (
    <View style={styles.container}>
      <Carousel
        layout={"stack"}
        data={banners}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setBannerActive(index)}
      />
      <Pagination
        dotsLength={size(banners)}
        activeDotIndex={bannerActive}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.dot}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  carousel: {
    width,
    height,
  },
  dotsContainer: {
    position: "absolute",
    bottom: -20,
    width: "100%",
  },
  dot: {
    backgroundColor: "#fff",
  },
});
