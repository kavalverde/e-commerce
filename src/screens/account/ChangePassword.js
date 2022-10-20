import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

import { formStyles } from "../../styles";
import { updateUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";

export default function ChangeUsername() {
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        const response = await updateUserApi(auth, formData);
        if (response.statusCode) {
          Toast.show("Error al guardar la contraseña", {
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
          label="Nueva contraseña"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
          secureTextEntry
        />
        <TextInput
          label="Repetir nueva contraseña"
          style={formStyles.input}
          onChangeText={(text) => formik.setFieldValue("repetirPassword", text)}
          value={formik.values.repetirPassword}
          error={formik.errors.repetirPassword}
          secureTextEntry
        />
        <Button
          onPress={formik.handleSubmit}
          mode="contained"
          style={formStyles.btnSuccess}
          loading={loading}
        >
          Cambiar Contraseña
        </Button>
      </RootSiblingParent>
    </View>
  );
}
function initialValues() {
  return {
    password: "",
    repetirPassword: "",
  };
}
function validationSchema() {
  return {
    password: Yup.string().min(6, true).required(true),
    repetirPassword: Yup.string()
      .min(6, true)
      .oneOf([Yup.ref("password")])
      .required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
