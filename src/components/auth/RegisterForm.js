import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";

import { registerApi } from "../../api/user";

import { formStyles } from "../../styles";

export default function RegisterForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      console.log("OK");
      try {
        await registerApi(formData);
        changeForm();
      } catch (error) {
        setLoading(false);
        Toast.show("Error al registrar el usuario", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Email"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <TextInput
        label="Nombre de usuario"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />
      <TextInput
        label="Contraseña"
        style={formStyles.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <TextInput
        label="Repetir contraseña"
        style={formStyles.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("repetirPassword", text)}
        value={formik.values.repetirPassword}
        error={formik.errors.repetirPassword}
      />
      <Button
        mode="contained"
        style={formStyles.btnSuccess}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Registrarse
      </Button>
      <Button
        onPress={changeForm}
        mode="text"
        style={formStyles.btnText}
        labelStyle={formStyles.btnTextLabel}
      >
        Iniciar Sesión
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    repetirPassword: "",
  };
}
function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    username: Yup.string().required(true),
    password: Yup.string().required(true),
    repetirPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
