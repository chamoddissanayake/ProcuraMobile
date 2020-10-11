import React, { Component } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import { ScrollView, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import AppText from "../common/AppText";
import OrderStatusCard from "../components/OrderStatusCard";
import Screen from "../components/Screen";
import constants from "../utils/constants";
import colors from "../config/colors";

const axios = require("axios").default;


export default class OrderStatusScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      allRequisitions:[],
       selectedType:"ALL" ,  // APPROVAL_PENDING , APPROVED , REJECTED , IN_PROCESS , ORDER_PLACED , DELIVERED , PARTIALLY_DELIVERED 

     
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress(type) {


   if( type=='ALL'){
      this.setState({selectedType:"ALL"});
   }else if( type=='APPROVAL_PENDING'){
    this.setState({selectedType:"APPROVAL_PENDING"});
   }else if( type=='APPROVED'){
    this.setState({selectedType:"APPROVED"});
  }else if( type=='REJECTED'){
    this.setState({selectedType:"REJECTED"});
  }else if( type=='IN_PROCESS'){
    this.setState({selectedType:"IN_PROCESS"});
  }else if( type=='ORDER_PLACED'){
    this.setState({selectedType:"ORDER_PLACED"});
  }else if( type=='DELIVERED'){
    this.setState({selectedType:"DELIVERED"});
  } else if( type=='PARTIALLY_DELIVERED'){
    this.setState({selectedType:"PARTIALLY_DELIVERED"});
  }

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

  onPressPlaceNewOrder = () => {
    // this.props.navigation.navigate("PlaceOrderScreen",{itemObjId:this.state.itemObjId, loggedUser:this.state.loggedUser});
    Alert.alert("Hi");
  };

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <View>
          <View style={styles.orderStatusTitleView}>
            <AppText style={styles.orderStatusTitleTxt}>Order Status</AppText>
          </View>



          <View>
            <ScrollView horizontal={true}>

            {/* <View style={styles.singleButton}>
              <TouchableOpacity
                onPress={this.onPressPlaceNewOrder}
                style={[styles.buttonCommon, { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>All</Text>
              </TouchableOpacity>
            </View> */}

            <View style={styles.singleButton}>
              <TouchableOpacity
               onPress={() => this.onPress('ALL')}
                style={[styles.buttonCommon,  this.state.selectedType == 'ALL' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('APPROVAL_PENDING')}
                style={[styles.buttonCommon,  this.state.selectedType == 'APPROVAL_PENDING' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Approval Pending</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('APPROVED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'APPROVED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Approved</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('REJECTED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'REJECTED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Rejected</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('IN_PROCESS')}
                style={[styles.buttonCommon,  this.state.selectedType == 'IN_PROCESS' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>In Process</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('ORDER_PLACED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'ORDER_PLACED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Order Placed</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('DELIVERED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'DELIVERED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>delivered</Text>
              </TouchableOpacity>
            </View>            
            <View style={styles.singleButton}>
            <TouchableOpacity
                onPress={() => this.onPress('PARTIALLY_DELIVERED')}
                style={[styles.buttonCommon,  this.state.selectedType == 'PARTIALLY_DELIVERED' ? { backgroundColor: colors.primary} : { backgroundColor: colors.btnColor}]}
              >
                <Text style={styles.appButtonTextAll}>Partially Delivered</Text>
              </TouchableOpacity>
            </View>


            </ScrollView>

           

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
  },

 

 appButtonTextAll: {
    fontSize: 15,
    color: colors.btnTextColor,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  buttonCommon:{
    borderRadius: 30,
    paddingVertical: 10, 
    paddingHorizontal: 12, 
  
   
    height: 40,
    elevation: 8,
  },
  singleButton:{
    padding: 10,

  }
 

});
