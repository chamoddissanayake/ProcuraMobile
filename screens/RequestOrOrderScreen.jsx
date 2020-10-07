import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import OrderPlacedComponent from "../components/OrderPlacedComponent";
import RequisitionSentForApprovalComponent from "../components/RequisitionSentForApprovalComponent";
import Screen from "../components/Screen";

export default class RequestOrOrderScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      //   type: "OrderPlaced", //SentForApprovel
      type: "SentForApprovel",
    };
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <View>
          <Text> Request or order Screen </Text>

          {this.state.type == "OrderPlaced" && <OrderPlacedComponent />}
          {this.state.type == "SentForApprovel" && (
            <RequisitionSentForApprovalComponent />
          )}
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({});
