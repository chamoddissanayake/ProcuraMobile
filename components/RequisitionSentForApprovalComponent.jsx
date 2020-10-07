import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import AppText from "../common/AppText";

export default class RequisitionSentForApprovalComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      type: "SentForApprovel",
      maxPriceLimit: 100000,
      loaded: false,
      referenceID: "#123456",
    };
  }

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.setState({ loaded: true });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.requisitionContainer}>
        <View style={styles.requisitionMessageContainer}>
          <AppText style={styles.requisitionMessageTxt}>
            The price is greater than Rs. {this.state.maxPriceLimit}/= and need
            special approval
          </AppText>
        </View>

        <View style={styles.tickContainer}>
          {!this.state.loaded && (
            //false
            <Image
              source={require("../assets/finish/tick.gif")}
              style={styles.tickImageStyle}
            />
          )}

          {this.state.loaded && (
            //true
            <Image
              source={require("../assets/finish/tickStable.jpg")}
              style={styles.tickImageStyle}
            />
          )}
        </View>

        <AppText>Requisition sent for approval</AppText>
        <AppText>Reference ID: </AppText>
        <AppText>{this.state.referenceID}</AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tickImageStyle: {
    width: 150,
    height: 150,
  },
  tickContainer: {},
  requisitionContainer: {
    borderRadius: 3,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  requisitionMessageContainer: { padding: 25 },
  requisitionMessageTxt: { fontSize: 18, fontWeight: "bold" },
});
