import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native';
import Screen from "../components/Screen";
import constants from "../utils/constants";
import colors from "../config/colors";
import { CreditCardInput  } from "react-native-credit-card-input";
import AppText from '../common/AppText';
const axios = require("axios").default;


export default class PaymentGatewayScreen extends Component {

    constructor(props) {
        super();
        this.state = {
            reqId:"",
            orderId:"",
            totalPrice:0,
            loading:false,
        };
      }

      componentDidMount(){
    

        this.setState({
            reqId: this.props.route.params.reqId,
            orderId: this.props.route.params.orderId,
            totalPrice: this.props.route.params.price,
        }, () => {
                console.log(this.state.reqId);
                console.log(this.state.orderId);
                console.log(this.state.totalPrice);
            
        });

      }
           
        onPressPay= () => {
            // Alert.alert(this.state.reqId+"--"+this.state.orderId+"--"+this.state.totalPrice);
          
            this.setState({loading:true});
            // 
            axios.post(constants.ipAddress + "/payment/paid", 
            {
                reqId:this.state.reqId,
                orderId:this.state.orderId,
                totalPrice:this.state.totalPrice
            })
            .then(
              function (response) {
                this.setState({loading:false});
                console.log(response.data);
                Alert.alert("Payment Success");
                this.props.navigation.navigate("MainDashboardScreen");
    
              }.bind(this)
            )
            .catch(
              function (error) {
                this.setState({loading:false});
                // alert("error occurred -" + error);
                console.log(error);
              }.bind(this)
            );
            // 


        };

    render() {
        return (
            <Screen navigation={this.props.navigation}>
                <View style={styles.paymentGatewayTitleContainer}>
                    <AppText style={styles.paymentGatewayTitleTxt}>Payment Gateway</AppText>
                </View>
                <View style={styles.totalPriceContainer}>
        <AppText style={styles.totalPriceTxt}>  Total Price  | Rs. {this.state.totalPrice}  </AppText>
                </View>
                <View style={styles.cardContainer}>
                    <CreditCardInput />
                </View>

                <View>
                    <View style={styles.BtnContainer}>
                        <TouchableOpacity
                            onPress={this.onPressPay}
                            style={styles.payButtonContainer}
                        >
                            <Text style={styles.payButtonText}>Pay</Text>
                        </TouchableOpacity>

                        <View>    
                            {this.state.loading == true && 
                                <Image
                                source={require("../assets/loading/gear.gif")}
                                style={{width:50, height:50,paddingTop:20}}
                                />
                            }
                        </View>

                    </View>
                </View>

            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    paymentGatewayTitleContainer:{
        padding:20,
        alignItems:"center",
        
    },
    paymentGatewayTitleTxt:{
        fontSize:22,
        fontWeight:"bold"
    },
    cardContainer:{

    },
    totalPriceContainer:{
        alignItems:"center",
        paddingTop:"10%",
        paddingBottom:"10%",
    },
    totalPriceTxt:{
        fontSize:20,
        fontWeight:"bold",
        backgroundColor:"#cdcdcd",
        borderRadius:10
    },
    BtnContainer:{
        padding:"10%",
        alignItems:"center"
    },
    
    payButtonContainer: {
       
      elevation: 8,
      backgroundColor: colors.primary,
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 12,
      width: 300,
      height: 50,
    },
    
    payButtonText: {
      fontSize: 18,
      color: colors.btnTextColor,
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
})
