import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Screen from "../components/Screen";
import AppText from "../common/AppText";
const axios = require("axios").default;
import constants from "../utils/constants";
import colors from '../config/colors';


export default class DeliveredScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            requisitionId:"",
            status:"",
            orderObj:{},
            reqObj:{},
            itemObj:{},
            cardColor:colors.light
        };
      }

      componentDidMount(){
        this.setState({
            requisitionId: this.props.route.params.requisitionId, 
            status:this.props.route.params.status,
            cardColor:colors.DELIVERED_COLOR
        }, () => {
        
                    //Provide requisition id and get order object - start

                        axios.get(constants.ipAddress + "/requisition/orderobjByReqId/id="+this.state.requisitionId)
                        .then(
                        function (response) {
                            this.setState({
                                orderObj: response.data
                            }, () => {
                                console.log(" --Order Obj --");
                                console.log(this.state.orderObj);
                                console.log(" --------------");
                            });

                        }.bind(this)
                        )
                        .catch(
                        function (error) {
                            console.log("error occurred -" + error);
                        
                        }.bind(this)
                        );
                    //Provide requisition id and get order object - end
                    
                    //Provide requisition id and get requisition object -start
                
    
                    axios.get(constants.ipAddress + "/requisition/getById/reqId="+this.state.requisitionId)
                    .then(
                    function (response) {
                        this.setState({
                            reqObj: response.data[0]
                        }, () => {
                            console.log(" --Requisition Obj --");
                            console.log(this.state.reqObj);
                            console.log(" --------------");

                                //get item by id - start
                                axios.get(constants.ipAddress + "/item/id="+this.state.reqObj.itemId)
                                .then(
                                function (response) {
                                    this.setState({
                                        itemObj: response.data[0]
                                    }, () => {
                                        console.log(" --Item Obj --");
                                        console.log(this.state.itemObj);
                                        console.log(" --------------");
                                    });
                                }.bind(this)
                                )
                                .catch(
                                function (error) {
                                    console.log("error occurred -" + error);
                                
                                }.bind(this)
                                );

                            //get item by id - end
                        });

                    }.bind(this)
                    )
                    .catch(
                    function (error) {
                        console.log("error occurred -" + error);
                    
                    }.bind(this)
                    );

                    //Provide requisition id and get requisition object -end
        });
      }

      
    cardStyle = function() {
        return {
            backgroundColor: this.state.cardColor,
            borderRadius: 16,
            padding: 10,
        }
      }

      onPressGoToPayments = () => {
        this.props.navigation.navigate("PaymentsScreen");
      };
    render() {
        return (
            <Screen navigation={this.props.navigation}>
                 
                <View style={styles.titleContainer}>
                    <AppText style={styles.titleTxt}> Delivered Item</AppText>
                </View>
                
                <View style={{padding:10, alignItems:"center"}}>
                    <View style={styles.cardShadow}>

                        <View style={this.cardStyle()} >
                {/*  */}
                       
                       <AppText></AppText>
                        <View style={styles.idViews}>
                            <AppText style={styles.idTitleTxt}>Requisition Id</AppText>
                            <AppText style={styles.idTitleValue}>{this.state.reqObj._id}</AppText>
                        </View>
                        <View style={styles.idViews}>
                            <AppText style={styles.idTitleTxt}>Order Id </AppText>
                            <AppText style={styles.idTitleValue}>{this.state.orderObj._id}</AppText>
                        </View>

                        <View style={styles.nameContainer}>
                            <AppText style={styles.nameTxt}>{this.state.itemObj.itemName}</AppText>
                        </View>


                        <View style={styles.imageContainer}>
                            <Image style={styles.itemImageStyle}
                            source={this.state.itemObj.photoURL21 ? { uri: this.state.itemObj.photoURL21 } : null } />
                        </View>
                        <AppText></AppText>
                        
                        <View style={styles.singleRow}>
                            <View style={styles.rowLeft}>
                                <AppText style={styles.leftTxt}>Price:</AppText>
                            </View>
                            <View style={styles.rowRight}>
                                <AppText style={styles.RightTxt}>{this.state.reqObj.totalPrice}</AppText>
                            </View>
                        </View>

                        <View style={styles.singleRow}>
                            <View style={styles.rowLeft}>
                                <AppText style={styles.leftTxt}>Quantity:</AppText>
                            </View>
                            <View style={styles.rowRight}>
                                <AppText style={styles.RightTxt}>{this.state.reqObj.quantity}</AppText>
                            </View>
                        </View>

                        <View style={styles.singleRow}>
                            <View style={styles.rowLeft}>
                                <AppText style={styles.leftTxt}>Delivered Date:</AppText>
                            </View>
                            <View style={styles.rowRight}>
                                <AppText style={styles.RightTxt}>{this.state.orderObj.receivedDate}</AppText>
                            </View>
                        </View>
                        <View style={styles.singleRow}>
                            <View style={styles.rowLeft}>
                                <AppText style={styles.leftTxt}>Delivered By:</AppText>
                            </View>
                            <View style={styles.rowRight}>
                                <AppText style={styles.RightTxt}>{this.state.orderObj.signature}</AppText>
                            </View>
                        </View>


                {/*  */}
                        </View>
                    </View>
                </View>

                    <View style={styles.centerBtns}>
                    <TouchableOpacity
                        onPress={this.onPressGoToPayments}
                        style={styles.appButtonContainer}
                    >
                        <Text style={styles.appButtonText}>Go to Payments</Text>
                    </TouchableOpacity>
                    </View>

                
                
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    cardShadow: {
        width:"93%",
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
       },
       titleContainer:{
            paddingTop:20,
            paddingBottom:10,
            alignItems:"center"
       },
        titleTxt:{
            fontSize:22,
            fontWeight:"bold"
        },
        idViews:{
            alignItems:"center",
            paddingBottom:5
            
        },
        idTitleTxt:{
            fontSize:17,
            fontWeight:"bold"
        },
        idTitleValue:{
            fontSize:16
        },
        imageContainer:{
            alignItems:"center"
        },
        itemImageStyle:{
            width:300,
            height:150,
            borderRadius:30
        },
        nameContainer:{
            padding: 10,
            alignItems:"center"
        },
        nameTxt:{
            fontSize:20,
            fontWeight:"bold"
        },
        singleRow:{
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingLeft:20,
            paddingBottom:5
        },
        rowLeft:{
            width:150,
        },
        rowRight:{

        },
        leftTxt:{
            fontSize:17,
            fontWeight:"bold"
        },
        RightTxt:{
            fontSize:17
        },
        centerBtns: {
            alignItems: "center",
            paddingBottom: 10,
            paddingTop: 10,
          },
          //
          appButtonContainer: {
            elevation: 8,
            backgroundColor: colors.btnColor,
            borderRadius: 30,
            paddingVertical: 10,
            paddingHorizontal: 12,
            width: 300,
            height: 50,
          },
          appButtonText: {
            fontSize: 18,
            // color: "#fff",
            color: colors.btnTextColor,
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase",
          },
})
