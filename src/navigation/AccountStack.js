import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/account/Account";
import ChangeName from "../screens/account/ChangeName";
import ChangeEmail from "../screens/account/ChangeEmail";
import ChangePassword from "../screens/account/ChangePassword";
import Addresses from "../screens/account/Addresses";
import AddAddress from "../screens/account/AddAddress";
import Orders from "../screens/account/Orders";

import colors from "../styles/colors";
import ChangeUsername from "../screens/account/ChangeUsername";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: {
          backgroundColor: colors.bgLight,
        },
      }}
    >
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Cuenta", headerShown: false }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{ title: "Cambiar nombre y apellido" }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{ title: "Cambiar E-mail" }}
      />
      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{ title: "Cambiar el nombre de usuario" }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{ title: "Cambiar la contraseña" }}
      />
      <Stack.Screen
        name="addresses"
        component={Addresses}
        options={{ title: "Mis direcciones" }}
      />
      <Stack.Screen
        name="add-address"
        component={AddAddress}
        options={{ title: "Nueva Dirección" }}
      />
      <Stack.Screen
        name="orders"
        component={Orders}
        options={{ title: "Mis pedidos" }}
      />
    </Stack.Navigator>
  );
}
