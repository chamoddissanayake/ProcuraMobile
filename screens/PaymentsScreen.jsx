import React, { Component } from "react";
import { FlatList } from "react-native";
import AppText from '../common/AppText';
import PayCard from '../components/PayCard';
import Screen from "../components/Screen";
import { ScrollView } from "react-native-gesture-handler";
import AwesomeAlert from 'react-native-awesome-alerts';

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

export default class PaymentsScreen extends Component {
  constructor(props) {
    super();
    this.state = { alert: false };
  }

  handleConfirm = () => {
    this.setState({ alert: false })
    this.props.navigation.goBack();
  }


  render() {
    return (
      <Screen navigation={this.props.navigation} style={{ alignItems: 'center' }}>
        <AppText style={{ fontSize: 22, marginTop: 20 }}> Items to pay </AppText>
        <AwesomeAlert
          show={this.state.alert}
          showProgress={false}
          title="Alert"
          message={"Message sent successfully"}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="ok"
          confirmButtonColor={"green"}
          onConfirmPressed={this.handleConfirm}
        />
        <ScrollView>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            numColumns={1}
            renderItem={({ item }) => <PayCard {...item} onPress={() => this.setState({ alert: true })} />}
          />
        </ScrollView>
      </Screen>
    );
  }
}

