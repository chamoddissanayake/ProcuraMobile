import React, { Component } from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
// import AppText from '../common/AppText';
import PayCard from '../components/PayCard';
// import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../common/AppText";
import Screen from "../components/Screen";
const axios = require("axios").default;
import constants from "../utils/constants";


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



// {
//   "reqId": "5f8a70efdcc8180750682902",
//   "orderId": "5f8a70f0dcc8180750682903",
//   "requisitionDate": "17/10/2020",
//   "price": 3000,
//   "receivedDate": "17/10/2020",
//   "id": 1,
//   "itemName": "Wire",
//   "itemPhoto": "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2FItems%2Fwire%2FwireSquare.jpg?alt=media&token=76f681f4-4010-41df-88ba-2e791a2b7097"
// },

export default class PurchaseHistoryScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      paidItemsArr:[],
      loading:false
    };
  }

  componentDidMount(){
    
    this.setState({loading:true});
    
    //load purchased Data

    axios.get(constants.ipAddress + "/payment/getPaidItems")
    .then(
    function (response) {
      this.setState({loading:false});
      console.log("^^^^");
      console.log(response.data);
      console.log("^^^^"); 
      
      this.setState({ paidItemsArr: response.data });

    }.bind(this)) 
    .catch(
    function (error) {
      this.setState({loading:false});
        console.log("error occurred -" + error);
    }.bind(this)
    );

  }

  render() {
    return (
      <Screen navigation={this.props.navigation} style={{ alignItems: 'center' }}>
        <AppText style={{ fontSize: 22, marginTop: 20, fontWeight:"bold" }}> Purchase History </AppText>

        <View>
            
            {this.state.loading == true && 
                  <Image
                  source={require("../assets/loading/gear.gif")}
                  style={{width:80, height:80,paddingTop:30}}
                  />
            }
        </View>

        <ScrollView>
          <FlatList
            data={this.state.paidItemsArr}
            keyExtractor={({ id }) => id.toString()}
            numColumns={1}
            renderItem={({ item }) => <PayCard {...item} />}
          />
        </ScrollView>

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
