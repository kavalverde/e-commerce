import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { size } from "lodash";

import { getAddressApi } from "../../api/address";
import useAuth from "../../hooks/useAuth";
import AddressList from "../../components/address/AddressList";

export default function Addresses() {
  const { auth } = useAuth();
  const [addresses, setAddresses] = useState(null);
  const [reload, setReload] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setAddresses(null);
      (async () => {
        const response = await getAddressApi(auth);
        setAddresses(response);
        setReload(false);
      })();
    }, [reload])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mis direcciones</Text>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("add-address")}
      >
        <View style={styles.addAddress}>
          <Text style={styles.addAddressText}>Añadir una dirección</Text>
          <IconButton icon="arrow-right" color="#000" size={19} />
        </View>
      </TouchableWithoutFeedback>
      {!addresses ? (
        <ActivityIndicator
          size="large"
          style={styles.loading}
          color="#00BFFF"
        />
      ) : size(addresses) === 0 ? (
        <Text style={styles.noAddressText}>Crea tu primera dirección</Text>
      ) : (
        <AddressList addresses={addresses} setReload={setReload} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  addAddress: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addAddressText: {
    fontSize: 16,
  },
  loading: {
    marginTop: 20,
  },
  noAddressText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});
