import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import Screen from "../components/Screen";

export default class RequestOrOrderScreen extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <View>
          <Text> Request or order Screen </Text>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({});
