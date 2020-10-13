import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert } from 'react-native'
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
            reqObj:{}
        };
    
    }

    componentDidMount(){
       
        this.setState({
            reqId:this.props.reqId, 
            type:this.props.type
        }, () => {
           
        });
    }

    onPressDelete = () => {

        axios.delete(constants.ipAddress + "/requisition/id="+this.state.reqId)
        .then(
            function (response) {
              Alert.alert("Requisition deleted successfully.");
              this.props.navigation.navigate("MainDashboardScreen");
              
            }.bind(this)
        )
        .catch(
            function (error) {
            console.log("error occurred -" + error);
            this.setState({isLoading:false});
            }.bind(this)
        );
        

      };

      onPressPlace= () => {
        Alert.alert("Order Place pressed");
        
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
            </View>
 
            <ScrollView>
                <View style={styles.reqIdContainer}>
                    <AppText style={{fontWeight:"bold"}}>Requisition ID:</AppText>
                    <AppText>{this.state.reqId}</AppText>
                </View>

                <StatusCommonCard reqId={this.state.reqId}/>
            </ScrollView>
          
            {this.state.type == 'APPROVAL_PENDING'  &&
            <View style={styles.BtnContainer}>
                <TouchableOpacity
                 onPress={this.onPressDelete}
                 style={styles.deleteButtonContainer}
               >
                 <Text style={styles.deleteButtonText}>Delete</Text>
               </TouchableOpacity>
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
               <TouchableOpacity
                 onPress={this.onPressModify}
                 style={styles.modifyButtonContainer}
               >
                 <Text style={styles.modifyButtonText}>Modify</Text>
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
          alignItems:"center"
      }
})
