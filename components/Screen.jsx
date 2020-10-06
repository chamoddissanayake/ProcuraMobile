import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import Header from "./Header";

export default function Screen({ children, style, navigation, title, goBack }) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar
        barStyle="light-content"
        animated
      />
      <Header navigation={navigation} title={title} goBack={goBack} />
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: { flex: 1 },
});
