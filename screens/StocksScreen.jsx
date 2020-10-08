import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../common/AppText";
import Screen from "../components/Screen";
import StockItemCard from "../components/StockItemCard";
import constants from "../utils/constants";

const axios = require("axios").default;

export default class StocksScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      allStockItems: [],
      criticalPrecentage: 0,
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress(txt) {
    // Alert.alert("Alert Title", "My Alert Msg " + txt);
    //load View percentage screen

    this.props.navigation.navigate("ViewPercentageScreen");
  }

  componentDidMount() {
    //load all items

    axios
      .get(constants.ipAddress + "/item")
      .then(
        function (response) {
          // this.setState({ isLoading: false });
          // console.log("####");
          // console.log(response.data);
          // console.log("####");
          this.setState({ allStockItems: response.data });
        }.bind(this)
      )
      .catch(
        function (error) {
          console.log("error occurred -" + error);
        }.bind(this)
      );

    //load critical precentage

    //filter and add critial items to state obj array
    //filter and add normal items to state obj array
    // iterate critical items in critical section in render
    // iterate normal items in normal section in render
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <ScrollView>
          <View style={styles.stocksScreenTitleView}>
            <AppText style={[styles.stocksScreenTitleText, { color: "red" }]}>
              Critical Items
            </AppText>
          </View>
          <View>
            {this.state.allStockItems.length > 0 &&
              this.state.allStockItems.map((item) => (
                // <li key={item._id}>
                //   <AppText>{item.availableQty}</AppText>

                // </li>
                <View key={item._id}>
                  <Text>{item._id}</Text>
                  <Text>{item.availableQty}</Text>
                </View>
              ))}
          </View>

          <TouchableOpacity onPress={() => this.onPress("Cement")}>
            <StockItemCard
              name={"Cement"}
              imagePath={
                "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2Ftemp%2Fcement.jpg?alt=media&token=307a3304-b12c-4f55-b1c4-8643aea5d2d4"
              }
              availableQty={100}
            />
          </TouchableOpacity>

          <StockItemCard
            name={"cement"}
            imagePath={
              "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2Ftemp%2Fcement.jpg?alt=media&token=307a3304-b12c-4f55-b1c4-8643aea5d2d4"
            }
            availableQty={100}
          />

          <View style={styles.stocksScreenTitleView}>
            <AppText style={styles.stocksScreenTitleText}>Other Items</AppText>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  stocksScreenTitleView: {
    alignItems: "center",
    padding: 20,
  },
  stocksScreenTitleText: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 10,
  },
});
