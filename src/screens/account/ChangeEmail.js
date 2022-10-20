import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

import { formStyles } from "../../styles";
import { getMeApi, updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";

export default function ChangeEmail() {
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        if (response.email) {
          await formik.setFieldValue("email", response.email);
        }
      })();
    }, [])
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) {
          Toast.show("El Email se encuentr actualmente en uso", {
            position: Toast.positions.CENTER,
          });
        } else {
          navigation.goBack();
        }
      } catch (error) {
        Toast.show("Error al actualizar sus datos", {
          position: Toast.positions.CENTER,
        });
        setLoading(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <RootSiblingParent>
        <TextInput
          label="Email"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Button
          onPress={formik.handleSubmit}
          mode="contained"
          style={formStyles.btnSuccess}
          loading={loading}
        >
          Cambiar Email
        </Button>
      </RootSiblingParent>
    </View>
  );
}
function initialValues() {
  return {
    email: "",
  };
}
function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
