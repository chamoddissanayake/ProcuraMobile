import React, { Component } from "react";
import { Text, Button, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";
import { TextInput } from "react-native";
import LoginComponent from "../components/LoginComponent";
import { ScrollView } from "react-native-gesture-handler";

export default class LoginScreen extends Component {
  render() {
    return (
      // <Screen navigation={this.props.navigation}>
      <View>
        <LoginComponent navigation={this.props.navigation} />
      </View>
      // </Screen>
    );
  }
}

const styles = StyleSheet.create({});
