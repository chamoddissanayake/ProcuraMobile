import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../common/AppText";
import Screen from "../components/Screen";
import StockItemCard from "../components/StockItemCard";

export default class StocksScreen extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.onPress = this.onPress.bind(this);
  }

  onPress(txt) {
    // Alert.alert("Alert Title", "My Alert Msg " + txt);
    //load View percentage screen

    this.props.navigation.navigate("ViewPercentageScreen");
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
