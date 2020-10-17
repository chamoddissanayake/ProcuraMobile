import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TextInput, Alert, TouchableOpacity } from 'react-native'
import NumericInput from 'react-native-numeric-input';
import AppText from '../common/AppText';
import Screen from "../components/Screen";
const axios = require("axios").default;
import constants from "../utils/constants";
import colors from "../config/colors";
import { ScrollView } from 'react-native-gesture-handler';

export default class ReceivedScreen extends Component {

    constructor(props) {
        super();
        this.state = {
            orderId:"",
            reqId:"",
            reqObj:{},
            orderObj:{},
            itemObj:{},
            supplierObj:{},

            inputPrice:0,
            inputCount:0,
            cardColor:"white",
            fullDelivery:false,
            visible:false,
            proof:"",
            loading:false
        };

      }
    


    componentDidMount(){

        this.setState({
            orderId: this.props.route.params.orderId,
            reqId : this.props.route.params.reqId
        }, () => {
        
            //get order Obj by orderId
            axios.get(constants.ipAddress + "/order/req/id="+this.state.reqId+'')
            .then(
                function (response) {
                  
                  this.setState({
                    orderObj :response.data[0]
                  }, () => {
        
                  });

                }.bind(this)
            ).catch(
                function (error) {
                console.log("error occurred -" + error);
                this.setState({isLoading:false});
                }.bind(this)
            );

           
            //get requisition by reqId
            axios.get(constants.ipAddress + "/requisition/getById/reqId="+this.state.reqId+'')
            .then(
                function (response) {
                  
                  this.setState({
                    reqObj :response.data[0]
                  }, () => {
                    // 
                    //get item by id - start
                     //get requisition by reqId
                        axios.get(constants.ipAddress + "/item/id="+this.state.reqObj.itemId+'')
                        .then(
                            function (response) {
                            
                            this.setState({
                                itemObj :response.data[0]
                            }, () => {
                                //get supplier by id - start
                                axios.get(constants.ipAddress + "/supplier/id="+this.state.itemObj.supplierId+'')
                                .then(
                                    function (response) {
                                    
                                        this.setState({
                                            supplierObj :response.data[0]
                                        }, () => {
                                          //all data loaded
                                          console.log("====");
                                          console.log(this.state.reqObj);
                                          console.log(this.state.orderObj);
                                          console.log(this.state.itemObj);
                                          console.log(this.state.supplierObj);
                                          console.log("====");
                                        });
        
                                    }.bind(this)
                                ).catch(
                                    function (error) {
                                    console.log("error occurred -" + error);
                                    this.setState({isLoading:false});
                                    }.bind(this)
                                );
                                //get supplier by id - end
                            });

                            }.bind(this)
                        ).catch(
                            function (error) {
                            console.log("error occurred -" + error);
                            this.setState({isLoading:false});
                            }.bind(this)
                        );
                    //get item by id - end

                  });

                }.bind(this)
            ).catch(
                function (error) {
                console.log("error occurred -" + error);
                this.setState({isLoading:false});
                }.bind(this)
            );




        });
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

    onChangeTextProof= (text) => {

        this.setState({proof:text});
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
      
        console.log("---");
        console.log(this.state.inputPrice);
        console.log(this.state.inputCount);
        console.log(this.state.reqObj.quantity);
        console.log(this.state.reqObj.totalPrice);
        console.log("---");

        if(this.state.reqObj.quantity == this.state.inputCount){
            // delivery complete
            this.setState({
                fullDelivery:true,
                visible:true
            });
            
        }else{
            // partial delivery
            this.setState({
                fullDelivery:false,
                visible:true
            });
        }

    };


    onPressDone= () => {
        // Alert.alert("Order Placed"+ this.state.orderId);      
        // this.props.navigation.navigate("ReceivedScreen",{orderId: this.state.orderId, reqId: this.state.reqId});

if(this.state.proof ==""){
    Alert.alert("Plese provide proof");
}else{
    this.setState({loading:true}); 

    console.log("---");
    console.log(this.state.reqId);
    console.log(this.state.orderId);
    console.log(this.state.reqObj.quantity);
    console.log(this.state.fullDelivery);
    console.log(this.state.inputCount);
    console.log(this.state.proof)
    console.log(this.state.reqObj.totalPrice);
    console.log("---");

    var orderReceivedObj={
        reqId:this.state.reqId,
        orderId :this.state.orderId,
        quantity:this.state.reqObj.quantity,
        fullDelivery: this.state.fullDelivery,
        inputCount:this.state.inputCount,
        proof :this.state.proof,
        totalPrice:this.state.reqObj.totalPrice
    }


    axios.post(constants.ipAddress + "/order/received",orderReceivedObj)
    .then(
        function (response) {
            this.setState({loading:false}); 
  
            console.log("Received Response");
            console.log(response.data);
            Alert.alert("Status updated Successfully");
            this.props.navigation.navigate("MainDashboardScreen");
        //   this.setState({
        //     orderObj :response.data[0]
        //   }, () => {

        //   });

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
                <View>
                    <View style={styles.OrderIdContainer}>
                        <AppText style={styles.titleTxt}>Order ID</AppText>
                        <AppText style={styles.valueTxt}>{this.state.orderObj._id}</AppText>
                    </View>
                    
                    <View style={styles.itemNameContainer}>
                        <AppText style={styles.itemNameTxt}>{this.state.itemObj.itemName}</AppText>
                    </View>
                    
                    {/* <AppText>{this.state.itemObj.photoURL11}</AppText> */}

                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.itemImageStyle}
                            source={ this.state.itemObj.photoURL21  ? { uri: this.state.itemObj.photoURL21 } : null   }
                        />
                    </View>

                    <AppText></AppText>
                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <AppText style={styles.lText}>Price: </AppText>
                        </View>
                        <View style={styles.rowRight}>
                            <AppText style={styles.rText}>{this.state.reqObj.totalPrice}</AppText>
                        </View>
                    </View>
                    

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <AppText style={styles.lText}>Ordered Quantity: </AppText>
                        </View>
                        <View style={styles.rowRight}>
                            <AppText style={styles.rText}>{this.state.reqObj.quantity}</AppText>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.rowLeft}>
                            <AppText style={styles.lText}>Supplier: </AppText>
                        </View>
                        <View style={styles.rowRight}>
                            <AppText style={styles.rText}>{this.state.supplierObj.name}</AppText>
                        </View>
                    </View>
                   
                    
                    
                    
                    
                    

                    <View style={{padding:10, alignItems:"center"}}>
                        <View style={styles.cardShadow}>
                            <View style={this.cardStyle()}>
                               {/* Card start */}
                               <AppText style={{fontWeight:"bold"}}>Delivery advice Notice</AppText>
                               <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                        <AppText style={styles.leftTxt}> Price: </AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                        <NumericInput style = {styles.inputPrice}
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
                                            maxValue={this.state.reqObj.quantity}
                                            underlineColorAndroid = "transparent"
                                            placeholderTextColor = "gray"
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
                                        <View style={{paddingTop:10}}>    
                                            {this.state.loading == true && 
                                            <Image
                                            source={require("../assets/loading/gearWhite.gif")}
                                            style={{width:40, height:40,paddingTop:10}}
                                            />
                                            }
                                        </View>
                                </View>
                            </View>
                        </View>
                    </View>


                   


                   
                      

                    
                        



                </View>
                </ScrollView>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({
    itemImageStyle:{
        width:300,
        height:150,
        borderRadius:30
    }, 
    inputPrice: {
        margin: 15,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius:30,
        paddingLeft:10
     },
     inputQuantity:{
        margin: 15,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius:30,
        paddingLeft:10
     },
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
       singleRow:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding:10
       },
       leftSide:{
            width:100,
            paddingTop:14
       },
      rightSide:{

      },
      leftTxt:{
          fontSize:17,
          fontWeight:"bold"
      },
      OrderIdContainer:{
          alignItems:"center",
          paddingTop:20
      },
      titleTxt:{
        fontSize:20, 
        fontWeight:"bold"
      },
      valueTxt:{

      },
      itemNameContainer:{
        alignItems:"center",
        paddingBottom:20

      }, 
      itemNameTxt:{
        fontSize:20,
        fontWeight:"bold"
        
      },
      imageContainer:{
          alignItems:"center"
      },
      row:{
        paddingLeft:40,
        paddingBottom:10,
        flexDirection: 'row',
        alignItems: 'flex-start',

      },
      rowLeft:{
        width:170
      },
      rowRight:{

      },
      rText:{
        
      },
      lText:{
        fontSize:18,
        fontWeight:"bold"
      },
    //   btn
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
    checkResponseView:{
        alignItems:"center"
    },
    textInputStyle:{
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius:30, 
        width:250,
        padding:10
    },
    proofLeft:{
        width:60,
        paddingTop:8
    },
    proofTxt:{
        fontSize:18, fontWeight:"bold"
    },
    // btnDone
    BtnDoneContainer:{
        padding:10,
        // alignItems:"center",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
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

})
