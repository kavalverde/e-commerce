import React from "react";
import { ScrollView } from "react-native";
import StatusBar from "../../components/StatusBar";
import Search from "../../components/search";
import NewProducts from "../../components/home/NewProducts";
import Banner from "../../components/home/Banner";
import colors from "../../styles/colors";

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      <Search />
      <ScrollView>
        <Banner />
        <NewProducts />
      </ScrollView>
    </>
  );
}
