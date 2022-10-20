import React, { useState, useCallback } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import StatusBar from "../../components/StatusBar";
import Search from "../../components/search/Search";
import { getMeApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import UserInfo from "../../components/account/UserInfo";
import colors from "../../styles/colors";
import ScreenLoading from "../../components/ScreenLoading";

import Menu from "../../components/account/Menu";

export default function Account() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const response = await getMeApi(auth.token);
        setUser(response);
      })();
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />

      {!user ? (
        <ScreenLoading size="large" />
      ) : (
        <>
          <Search />
          <ScrollView>
            <UserInfo user={user} />
            <Menu />
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
