import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import AppText from "../common/AppText";

export default class OrderPlacedComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      type: "",
      loaded: false,
      referenceID: "",
    };
  }

  componentDidMount() {

    console.log("4444");
    console.log(this.props);
    console.log("4444");

    this.setState({
      type : this.props.type,
      referenceID : this.props.refId
    });

    this.timeoutHandle = setTimeout(() => {
      this.setState({ loaded: true });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.orderPlacedContainer}>
        <View style={styles.orderPlacedMessageContainer}>
          <AppText style={styles.OrderPlacedMessageTxt}>
            No need of special approval
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
            <AppText style={styles.orderPlacedTxt}>Order Placed</AppText>
          </View>
        </View>

        <View style={styles.OrderIDContainer}>
          <AppText style={styles.OrdIDTitletxt}>Reference ID: </AppText>
          <AppText style={styles.ordIDValuetxt}>{this.state.referenceID}</AppText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  orderPlacedContainer: {
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

  orderPlacedMessageContainer: { padding: 25 },
  OrderPlacedMessageTxt: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  tickNoticeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: 10,
  },
  tickNoticeLeftSide: {},
  tickNoticeRightSide: {
    paddingTop: 40,
  },
  tickContainer: {},
  tickImageStyle: {
    width: 130,
    height: 130,
  },

  orderPlacedTxt: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  OrderIDContainer: {
    // flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "flex-start",
    alignItems:"center",
    padding: 30,
  },
  OrdIDTitletxt: {
    fontSize: 18,
  },
  ordIDValuetxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
