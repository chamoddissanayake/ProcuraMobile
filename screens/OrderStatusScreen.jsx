import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../common/AppText";
import OrderStatusCard from "../components/OrderStatusCard";
import Screen from "../components/Screen";
import constants from "../utils/constants";
const axios = require("axios").default;


export default class OrderStatusScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      allRequisitions:[],
      
    };
  }

  componentDidMount(){
    


    axios
    .get(constants.ipAddress + "/requisition/all")
    .then(
      function (response) {
           
        this.setState({
            allRequisitions: response.data 
        }, () => {
          // console.log(this.state.allRequisitions);
        });

      }.bind(this)
    )
    .catch(
      function (error) {
        console.log("error occurred -" + error);
      }.bind(this)
    );



  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <View>
          <View style={styles.orderStatusTitleView}>
            <AppText style={styles.orderStatusTitleTxt}>Order Status</AppText>
          </View>

          <ScrollView>


           {this.state.allRequisitions.map((item) =>
           

            <OrderStatusCard 
            key={item._id}
            itemId={item.itemId} 
            RequisitionId={item._id} 
            status={item.status} 
            date={item.requiredDate} 
            site={item.siteId} 
            siteManager={item.siteManagerUsername} 
            price={item.totalPrice} 
            priority={item.priority} />
          
          )}  






         {/* <OrderStatusCard 
            // key={item.id}
            itemId={"5f7ed6dfa3f08557606c31bd"} 
            RequisitionId={"5f8084d7d44517435849ac8b"} 
            status={"APPROVAL_PENDING"} 
            date={"Friday 23 Oct 2020"} 
            site={"5f80855bbd407b562e87e3ea"} 
            siteManager={"aaa"} 
            price={4500} 
            priority={"2"} />  */}

      
            
          </ScrollView>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  orderStatusTitleView:{
    alignItems:"center",
    padding: 10,
  },
  orderStatusTitleTxt:{
    fontSize:20,
    fontWeight:"bold"
  }
});
