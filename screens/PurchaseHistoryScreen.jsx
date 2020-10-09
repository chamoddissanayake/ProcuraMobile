import React, { Component } from "react";
import { FlatList, StyleSheet, ScrollView } from "react-native";
import AppText from '../common/AppText';
import PayCard from '../components/PayCard';
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
      </Screen>
    );
  }
}

const styles = StyleSheet.create({});
