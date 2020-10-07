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
        <View style={styles.tickNoticeContainer}>
          <View style={styles.tickNoticeLeftSide}>
            {/* image start */}
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
            {/* image end */}
          </View>
          <View style={styles.tickNoticeRightSide}>
            <AppText style={styles.sentmsg}>Requisition sent</AppText>
            <AppText style={styles.sentmsg}>for approval</AppText>
          </View>
        </View>

        <View style={styles.referenceIDContainer}>
          <AppText style={styles.refIDTitletxt}>Reference ID: </AppText>
          <AppText style={styles.refIDValuetxt}>
            {this.state.referenceID}
          </AppText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tickImageStyle: {
    width: 130,
    height: 130,
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
  requisitionMessageTxt: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  tickNoticeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  tickNoticeLeftSide: {},
  tickNoticeRightSide: {
    paddingTop: 40,
  },
  sentmsg: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  referenceIDContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: 30,
  },
  refIDTitletxt: {
    fontSize: 18,
  },
  refIDValuetxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
