import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
// import AppText from '../common/AppText';
import PayCard from '../components/PayCard';
// import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../common/AppText";
// import PurchasedItemComponent from "../components/PurchasedItemComponent";
import Screen from "../components/Screen";

const data = [
  {
    id: 1,
    refId: '1100',
    status: 'qwerty',
    orderDate: new Date().toLocaleDateString(),
    receivedDate: new Date().toLocaleDateString(),
    price: 12500
  },
  {
    id: 2,
    refId: '1100',
    status: 'qwerty',
    orderDate: new Date().toLocaleDateString(),
    receivedDate: new Date().toLocaleDateString(),
    price: 12500
  },
  {
    id: 3,
    refId: '1100',
    status: 'qwerty',
    orderDate: new Date().toLocaleDateString(),
    receivedDate: new Date().toLocaleDateString(),
    price: 12500
  },
  {
    id: 4,
    refId: '1100',
    status: 'qwerty',
    orderDate: new Date().toLocaleDateString(),
    receivedDate: new Date().toLocaleDateString(),
    price: 12500
  },
  {
    id: 5,
    refId: '1100',
    status: 'qwerty',
    orderDate: new Date().toLocaleDateString(),
    receivedDate: new Date().toLocaleDateString(),
    price: 12500
  },
  {
    id: 6,
    refId: '1100',
    status: 'qwerty',
    orderDate: new Date().toLocaleDateString(),
    receivedDate: new Date().toLocaleDateString(),
    price: 12500
  }
]

export default class PurchaseHistoryScreen extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <Screen navigation={this.props.navigation} style={{ alignItems: 'center' }}>
        <AppText style={{ fontSize: 22, marginTop: 20 }}> Purchase History </AppText>
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            numColumns={1}
            renderItem={({ item }) => <PayCard {...item} />}
          />
        </ScrollView>
        {/* <Screen navigation={this.props.navigation}>
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
          </View> */}
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
