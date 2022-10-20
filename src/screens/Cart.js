import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import StatusBar from "../components/StatusBar";
import Search from "../components/search/Search";
import NotProduct from "../components/cart/NotProduct";
import ProductList from "../components/cart/ProductList";
import AddressList from "../components/cart/AddressList";
import Payment from "../components/cart/Payment";
import { getProductCartApi } from "../api/cart";
import { getAddressApi } from "../api/address";
import colors from "../styles/colors";
import useAuth from "../hooks/useAuth";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [reload, setReload] = useState(false);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      setCart(null);
      setAddresses(null);
      setSelectedAddress(null);

      loadCart();
      loadAddresses();
    }, [])
  );

  useEffect(() => {
    if (reload) {
      loadCart();
      setReload(false);
    }
  }, [reload]);

  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };

  const loadAddresses = async () => {
    const response = await getAddressApi(auth);
    setAddresses(response);
  };

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      {!cart || size(cart) === 0 ? (
        <>
          <Search />
          <NotProduct />
        </>
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer}>
            <ProductList
              cart={cart}
              products={products}
              setProducts={setProducts}
              setReload={setReload}
              setTotalPayment={setTotalPayment}
            />
            <AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <Payment
              totalPayment={totalPayment}
              products={products}
              selectedAddress={selectedAddress}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    padding: 10,
  },
});
