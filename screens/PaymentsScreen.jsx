import React, { Component } from "react";
import { Alert, FlatList, View, Image } from "react-native";
import AppText from '../common/AppText';
import PayCard from '../components/PayCard';
import Screen from "../components/Screen";
import { ScrollView } from "react-native-gesture-handler";
import AwesomeAlert from 'react-native-awesome-alerts';
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
  }
]

export default class PaymentsScreen extends Component {
  constructor(props) {
    super();
    this.state = { 
      alert: false,
      orderArr:[],
      reqArr:[],
      itemArr:[],
      finalArr:[],
      loading:false
      // finalArr:
      // [
      //   {
      //    "orderId": "5f8a5ffa70169304bc4576ce",
      //    "reqId": "5f8a5fa870169304bc4576cc",
      //    "payStatus": false,
      //    "orderedDate": "17/10/2020",
      //    "receivedDate": "17/10/2020",
      //    "price": 80000,
      //    "itemName": "Cement",
      //    "itemPhoto": ""
      //   }
      

      // ],
    };

  }

  componentDidMount(){

    this.setState({loading:true});    

    axios.get(constants.ipAddress + "/order/pay/getUnpaidDelivered")
    .then(
    function (response) {
      console.log("data came" + response);
      this.setState({
        finalArr : response.data, loading:false
      }); 

    }.bind(this)
    ) 
    .catch(
    function (error) {
        console.log("error occurred -" + error);
        this.setState({loading:false});
    }.bind(this)
    );

  
    //didmount end
  }



  handleConfirm = () => {
    this.setState({ alert: false })
    this.props.navigation.goBack();
  }


  render() {
    return (
      <Screen navigation={this.props.navigation} style={{ alignItems: 'center' }}>
        <AppText style={{ fontSize: 22, marginTop: 20, fontWeight:"bold" }}> Items to pay </AppText>
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
          <View>
              {this.state.loading && 
                    <Image
                    source={require("../assets/loading/gear.gif")}
                    style={{width:80, height:80,paddingTop:30}}
                    />
              }
          </View>
          <FlatList
            data={this.state.finalArr}
            keyExtractor={({ id }) => id.toString()}
            numColumns={1}
            renderItem={({ item }) => <PayCard {...item} onPress={() => 
              // this.setState({ alert: true })
              this.props.navigation.navigate("PaymentGatewayScreen",{reqId: item.reqId, orderId:item.orderId, price:item.price})
            } />}
          />

   

        </ScrollView>
      </Screen>
    );
  }
}

