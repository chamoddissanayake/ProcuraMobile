import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import OrderPlacedComponent from "../components/OrderPlacedComponent";
import RequisitionSentForApprovalComponent from "../components/RequisitionSentForApprovalComponent";
import Screen from "../components/Screen";
import colors from "../config/colors";

export default class RequestOrOrderScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      //   type: "OrderPlaced",
      type: "SentForApprovel",
      symbolBack: "<< ",
      symbolNext: " >>",
    };
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <View style={styles.fullContainer}>
          <View>
            {this.state.type == "OrderPlaced" && <OrderPlacedComponent />}
            {this.state.type == "SentForApprovel" && (
              <RequisitionSentForApprovalComponent />
            )}
          </View>

          {/*  */}
          <View style={styles.btnView}>
            <TouchableOpacity
              // onPress={this.onPressPlaceNewOrder}
              onPress={() =>
                this.props.navigation.navigate("MainDashboardScreen")
              }
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>
                {this.state.symbolBack} Back To Home
              </Text>
            </TouchableOpacity>
          </View>
          {/*  */}

          <View style={styles.btnView}>
            <TouchableOpacity
              // onPress={this.onPressPlaceNewOrder}
              onPress={() => this.props.navigation.navigate("StocksScreen")}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>
                Order More {this.state.symbolNext}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  btnView: {
    alignItems: "center",

    paddingTop: 20,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: colors.btnColor,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 300,
    height: 50,
  },
  appButtonText: {
    fontSize: 18,
    // color: "#fff",
    color: colors.btnTextColor,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  fullContainer: {
    paddingVertical: "35%",
  },
});
