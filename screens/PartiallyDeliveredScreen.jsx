import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import Screen from "../components/Screen";
import AppText from "../common/AppText";
const axios = require("axios").default;
import constants from "../utils/constants";
import colors from '../config/colors';
import { ScrollView } from 'react-native-gesture-handler';


export default class PartiallyDeliveredScreen extends Component {

    constructor(props) {
        super();
        this.state = {
            requisitionId:"",
            status:"",
            orderObj:{},
            reqObj:{},
            itemObj:{},
            cardColor:colors.light,
            neededQuantity:0,
            fullDelivery:false,
            visible:false,
            inputPrice:0,
            inputCount:0,
            proof:"",
            loading:false

        };
      }

      componentDidMount(){
        this.setState({
            requisitionId: this.props.route.params.requisitionId, 
            status:this.props.route.params.status,
            cardColor:colors.PARTIALLY_DELIVERED_COLOR
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
                                var needed = this.state.orderObj.orderedCount - this.state.orderObj.receivedCount;
                                this.setState({neededQuantity: needed});
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


      onPressCheck= () => {
        // Alert.alert("Order Placed"+ this.state.orderId);      
        // this.props.navigation.navigate("ReceivedScreen",{orderId: this.state.orderId, reqId: this.state.reqId});
      
        console.log("-$-");
        console.log(this.state.inputPrice);
        console.log(this.state.inputCount);
        console.log(this.state.neededQuantity)
        

        if(this.state.neededQuantity == this.state.inputCount){
            this.setState({
                fullDelivery:true,
                visible:true
            });
        }else{
            this.setState({
                fullDelivery:false,
                visible:true
            });
        }


       
    };

    onChangeTextProof= (text) => {

        this.setState({proof:text});
    }

    handlePrice = (text) => {
        //  this.setState({ inputPrice: text });

         this.setState({
            inputPrice: text
        }, () => {
           console.log("Input Price : "+ this.state.inputPrice);
        });
     }
     handleQuantity = (text) => {

        // this.setState({ inputCount: text });        
        
        this.setState({
            inputCount: text
        }, () => {
        //    this.state.inputCount
           console.log("Input Count : "+  this.state.inputCount);
        });
    }


    onPressDone= () => {

        if(this.state.proof == ""){
            Alert.alert("Plese add a proof");
        }else{
            this.setState({loading:true}); 
            // Alert.alert("Order Placed"+ this.state.orderId);      
            // this.props.navigation.navigate("ReceivedScreen",{orderId: this.state.orderId, reqId: this.state.reqId});
    
            var currentTot = this.state.inputCount + this.state.orderObj.receivedCount;
    
            var orderReceivedObj={
                reqId:this.state.requisitionId,
                orderId :this.state.orderObj._id,
                quantity:this.state.reqObj.quantity,
                fullDelivery: this.state.fullDelivery,
                inputCount:currentTot,
                proof :this.state.proof,
                totalPrice:this.state.reqObj.totalPrice
            }
    
    
    
            axios.post(constants.ipAddress + "/order/received",orderReceivedObj)
            .then(
                function (response) {
                    this.setState({loading:false}); 
                    console.log("Received Response");
                    console.log(response.data);
                    Alert.alert("Order Received Modified");
                    this.props.navigation.navigate("MainDashboardScreen");
             
    
                }.bind(this)
            ).catch(
                function (error) {
                
                this.setState({loading:false}); 
                console.log("error occurred -" + error);
                this.setState({isLoading:false});
                }.bind(this)
            );
        }

        
      

    };


    render() {
        return (
            <Screen navigation={this.props.navigation}>
            <ScrollView>


                <View style={styles.titleContainer}>
                    <AppText style={styles.titleTxt}>Partially Delivered</AppText>
                </View>

               <View style={{padding:10, alignItems:"center"}}>
                    <View style={styles.cardShadow}>
                        <View style={this.cardStyle()} >
{/*  */}
                        <View style={styles.idViews}>
                            <AppText style={styles.idTitleTxt}>Requisition Id:</AppText>
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
{/* // */}

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
                                <AppText style={styles.leftTxt}>Ordered Quantity:</AppText>
                            </View>
                            <View style={styles.rowRight}>
                                <AppText style={styles.RightTxt}>{this.state.orderObj.orderedCount}</AppText>
                            </View>
                        </View>

                        <View style={styles.singleRow}>
                            <View style={styles.rowLeft}>
                                <AppText style={styles.leftTxt}>Received Quantity:</AppText>
                            </View>
                            <View style={styles.rowRight}>
                                <AppText style={styles.RightTxt}>{this.state.orderObj.receivedCount}</AppText>
                            </View>
                        </View>

                        <View style={styles.singleRow}>
                            <View style={styles.rowLeft}>
                                <AppText style={styles.leftTxt}>Needed Quantity:</AppText>
                            </View>
                            <View style={styles.rowRight}>
                                <AppText style={styles.RightTxt}>{this.state.neededQuantity}</AppText>
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



                    <View style={{padding:10, alignItems:"center"}}>
                        <View style={styles.cardShadow}>
                            <View style={this.cardStyle()}>
                               {/* Card start */}
                                <View style={{alignItems:"center"}}>
                                    <AppText style={{fontWeight:"bold",padding:10}}>Delivery advice Notice</AppText>
                                </View>
                               
                               <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                        <AppText style={styles.leftTxt}> Price: </AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                        <NumericInput style = {styles.inputPrice}
                                            maxValue ={this.state.neededQuantity}
                                            underlineColorAndroid = "transparent"
                                            placeholderTextColor = "gray"
                                            onChange={value => this.handlePrice(value)}
                                            />
                                            
                                    </View>
                               </View>
                               <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                        <AppText style={styles.leftTxt}> Quantity: </AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                        <NumericInput style = {styles.inputQuantity}
                                            underlineColorAndroid = "transparent"
                                            placeholderTextColor = "gray"
                                            maxValue= {this.state.neededQuantity}
                                            // onChange={value => console.log(value)}
                                            onChange={value => this.handleQuantity(value)}
                                            />
                                    </View>
                               </View>
                               <View>
 
                                        {/* Button start */}
                                            <View style={styles.BtnContainer}>
                                                <TouchableOpacity
                                                    onPress={this.onPressCheck}
                                                    style={styles.checkButtonContainer}
                                                >
                                                    <Text style={styles.checkButtonText}>Check</Text>
                                                </TouchableOpacity>
                                            </View>
                                        {/* Button end */}
                                    <View>
                                    
                                        <View style={styles.checkResponseView}>
                                            {(this.state.fullDelivery == true && this.state.visible==true) && 
                                                    <AppText>Fully Delivered</AppText>
                                                }
                                                {(this.state.fullDelivery == false && this.state.visible==true) && 
                                                    <AppText>Partially Delivered</AppText>
                                                }
                                        </View>
                                    </View>

                                    <View style={styles.singleRow}>
                                        <View style={styles.proofLeft}>
                                                <AppText style={styles.proofTxt}>Proof</AppText>
                                        </View>
                                        <View>
                                            <TextInput
                                                style={styles.textInputStyle}
                                                onChangeText={text => this.onChangeTextProof(text)}
                                                value={this.state.proof}
                                                />
                                        </View>
                                    </View>
                               </View>
                               {/* Card end */}
                                 
                               <View style={styles.BtnDoneContainer}>
                                    <TouchableOpacity
                                        onPress={this.onPressDone}
                                        style={styles.doneButtonContainer}
                                    >
                                        <Text style={styles.doneButtonText}>Done</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                                <View style={{alignItems:"center"}}>
                                    {this.state.loading == true && 
                                            <Image
                                            source={require("../assets/loading/gear.gif")}
                                            style={{width:40, height:40,paddingTop:30}}
                                            />
                                    }
                                    </View>
                            </View>
                        </View>
                    </View>


                {/* // */}



                {/*  */}
                        </View>
                    </View>
                </View>

               
                {/* <View>
                    <AppText>Partially Delivered</AppText>
                </View> */}
            </ScrollView>
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
            alignItems:"center",
            paddingTop:20,
            paddingBottom:10
       },
       titleTxt:{
           fontSize:20,
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
    },  nameContainer:{
        padding: 10,
        alignItems:"center"
    },
    nameTxt:{
        fontSize:20,
        fontWeight:"bold"
    },
    imageContainer:{
        alignItems:"center"
    },
    itemImageStyle:{
        width:300,
        height:150,
        borderRadius:30
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
    leftSide:{
        width:100,
        paddingTop:14
   },
  rightSide:{

  },
  BtnContainer:{
    padding:10,
    alignItems:"center"
},
checkButtonContainer: {
   
  elevation: 8,
  backgroundColor: colors.modifyBtnColor,
  borderRadius: 30,
  paddingVertical: 10,
  paddingHorizontal: 12,
  width: 300,
  height: 50,
},

checkButtonText: {
  fontSize: 18,
  color: colors.btnTextColor,
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase",
},
proofLeft:{
    width:60,
    paddingTop:8
},
proofTxt:{
    fontSize:18, fontWeight:"bold"
},
textInputStyle:{
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius:30, 
    width:200,
    padding:10
},

BtnDoneContainer:{
    padding:10,
    alignItems:"center",
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'flex-start',
},
doneButtonContainer: {
   
  elevation: 8,
  backgroundColor: "#18b300",
  borderRadius: 30,
  paddingVertical: 10,
  paddingHorizontal: 12,
  width: 300,
  height: 50,
},

doneButtonText: {
  fontSize: 18,
  color: colors.btnTextColor,
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase",
},
checkResponseView:{
    alignItems:"center"
},

})
