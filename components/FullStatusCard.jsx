import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AppText from '../common/AppText';
import StatusCommonCard from './StatusCommonCard';
import colors from "../config/colors";
import constants from "../utils/constants";
const axios = require("axios").default;

export default class FullStatusCard extends Component {
    
    constructor(props) {
        super();
        this.state = {
            reqId:"",
            type:"",
            reqObj:{},
            loaded:false,
            orderId:"",
            loadingDelete:false,
            approveloading:false
        };
    
    }

    componentDidMount(){
       
        this.setState({
            reqId:this.props.reqId, 
            type:this.props.type,
        }, () => {
          this.setState({loaded:true});

          if(this.state.type=='ORDER_PLACED'){
            //load order id - start
                    axios.get(constants.ipAddress + "/order/req/id="+this.state.reqId+'')
                  .then(
                      function (response) {
                          this.setState({
                            orderId :response.data[0]._id
                          });

                        this.setState({
                          orderId :response.data[0]._id
                        }, () => {

                        });

                    
                      }.bind(this)
                  ).catch(
                      function (error) {
                      console.log("error occurred -" + error);
                      this.setState({isLoading:false});
                      }.bind(this)
                  );
            //load order id - end
          }
         


        });
    }
    onPressOrderPlaced= () => {
        // Alert.alert("Order Placed"+ this.state.orderId);      
        this.props.navigation.navigate("ReceivedScreen",{orderId: this.state.orderId, reqId: this.state.reqId});
    };

    onPressDelete = () => {
      this.setState({loadingDelete:true});

        axios.delete(constants.ipAddress + "/requisition/id="+this.state.reqId)
        .then(
            function (response) {
              this.setState({loadingDelete:false});
              Alert.alert("Deleted successfully.");
              this.props.navigation.navigate("MainDashboardScreen");
              
            }.bind(this)
        )
        .catch(
            function (error) {
              this.setState({loadingDelete:false});
            console.log("error occurred -" + error);
            this.setState({isLoading:false});
            }.bind(this)
        );
        

      };

      onPressPlace= () => {

        this.setState({approveloading:true});
        //this.state.reqId
        // placeOrder endpoint
      
        axios.post(constants.ipAddress + "/requisition/placeApprovedOrder", {reqId:this.state.reqId})
        .then(
          function (response) {
            this.setState({approveloading:false});
            console.log(response.data);
            this.props.navigation.navigate("MainDashboardScreen");

          }.bind(this)
        )
        .catch(
          function (error) {
            this.setState({approveloading:false});
            // alert("error occurred -" + error);
            console.log(error);
          }.bind(this)
        );

        // Onpress place order end
      };

      onPressModify= () => {
        Alert.alert("Modify pressed");
        
      };
    
    render() {
        return (
            <View>

            <View style={styles.titleContainer}>
                {this.state.type == 'APPROVAL_PENDING'  &&
                    <AppText style={styles.titletxt}>Approval Pending</AppText>
                }

                {this.state.type == 'IN_PROCESS'  &&
                    <AppText style={styles.titletxt} >Processing</AppText>
                }

                {this.state.type == 'APPROVED'  &&
                    <AppText style={styles.titletxt}>Approved</AppText>
                }

                {this.state.type == 'REJECTED'  &&
                    <AppText style={styles.titletxt}>Rejected</AppText>
                }
                {this.state.type == 'ORDER_PLACED'  &&
                    <AppText style={styles.titletxt}>Order Placed</AppText>
                }
            </View>
 
            <ScrollView>
                <View style={styles.reqIdContainer}>
                    <AppText style={{fontWeight:"bold"}}>Requisition ID:</AppText>
                    <AppText>{this.state.reqId}</AppText>
                </View>

                

                {this.state.loaded == true &&                   
                    <StatusCommonCard reqId={this.state.reqId}/>
                }


            </ScrollView>
          
            {this.state.type == 'APPROVAL_PENDING'  &&
            <View style={styles.BtnContainer}>
                <TouchableOpacity
                 onPress={this.onPressDelete}
                 style={styles.deleteButtonContainer}
               >
                 <Text style={styles.deleteButtonText}>Delete</Text>
               </TouchableOpacity>
               <View style={{paddingTop:10}}>            
                  {this.state.loadingDelete == true && 
                        <Image
                        source={require("../assets/loading/gear.gif")}
                        style={{width:40, height:40,paddingTop:30}}
                        />
                  }
              </View>
            </View>
                
               
            }

            {/* {this.state.type == 'IN_PROCESS'  &&
                //nothing
            } */}

            {this.state.type == 'APPROVED'  &&
            <View style={styles.BtnContainer}>
               <TouchableOpacity
                 onPress={this.onPressPlace}
                 style={styles.placeOrderButtonContainer}
               >
                 <Text style={styles.placeOrderButtonText}>Place Order</Text>
               </TouchableOpacity>
                <View style={{paddingTop:15}}>
                    {this.state.approveloading == true && 
                          <Image
                          source={require("../assets/loading/gear.gif")}
                          style={{width:40, height:40,paddingTop:30}}
                          />
                    }
                </View>

            </View>
            }

            {this.state.type == 'REJECTED'  &&
                <View style={styles.BtnContainer}>
            <TouchableOpacity
                 onPress={this.onPressDelete}
                 style={styles.deleteButtonContainer}
               >
                 <Text style={styles.deleteButtonText}>Delete</Text>
               </TouchableOpacity>
                <AppText></AppText>
               {/* <TouchableOpacity
                 onPress={this.onPressModify}
                 style={styles.modifyButtonContainer}
               >
                 <Text style={styles.modifyButtonText}>Modify</Text>
               </TouchableOpacity> */}

                </View>
            }

            {this.state.type == 'ORDER_PLACED'  &&
                <View style={styles.BtnContainer}>
      
               <TouchableOpacity
                 onPress={this.onPressOrderPlaced}
                 style={styles.modifyButtonContainer}
               >
                 <Text style={styles.modifyButtonText}>Received</Text>
               </TouchableOpacity>

                </View>
            }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleContainer:{
        padding:20,
        alignItems:"center"
        
    },
    titletxt:{
        fontSize:22,
        fontWeight:"bold"
    },
    reqIdContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10
    },
    deleteButtonContainer: {
        elevation: 8,
        backgroundColor: colors.deleteBtnColor,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 300,
        height: 50,
      },
      deleteButtonText: {
        fontSize: 18,
        color: colors.btnTextColor,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
      },
      placeOrderButtonContainer: {
        elevation: 8,
        backgroundColor: colors.placeOrderBtnColor,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 300,
        height: 50,
      },
      placeOrderButtonText: {
        fontSize: 18,
        color: colors.btnTextColor,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
      },
      modifyButtonContainer: {
         
        elevation: 8,
        backgroundColor: colors.modifyBtnColor,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 300,
        height: 50,
      },
      modifyButtonText: {
        fontSize: 18,
        color: colors.btnTextColor,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
      },
      BtnContainer:{
          padding:10,
          // alignItems:"center",
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',

      }
})
