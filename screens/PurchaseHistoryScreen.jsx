import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../common/AppText";
import PurchasedItemComponent from "../components/PurchasedItemComponent";
import Screen from "../components/Screen";

export default class PurchaseHistoryScreen extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <View>
          <View style={styles.purchseHistoryTitleContainer}>
            <AppText style={styles.purchaseHistory}>Purchase History</AppText>
          </View>
          <ScrollView>
            <PurchasedItemComponent />
            <PurchasedItemComponent />
            <PurchasedItemComponent />
            <PurchasedItemComponent />
          </ScrollView>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  purchseHistoryTitleContainer: {
    alignItems: "center",
    padding: 20,
  },
  purchaseHistory: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
