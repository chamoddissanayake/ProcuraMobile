import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, Image } from 'react-native'
import { cos } from 'react-native-reanimated';
import FullStatusCard from '../components/FullStatusCard';
import Screen from "../components/Screen";
const axios = require("axios").default;
import constants from "../utils/constants";

export default class OrderStatusFullScreen extends Component {

    constructor(props) {
        super();
        this.state = {
            requisitionId:"",
            status:"",
            reqObj:{},
            loading:false
        };
     
    }

    componentDidMount(){
        // console.log(this.props.navigation)
        this.setState({ 
            requisitionId: this.props.route.params.requisitionId, 
            status:this.props.route.params.status,
            loading:true 
        }, () => {
            //network call for fetching data  by requisition id- start
            // for
                    // APPROVAL_PENDING
                    // IN_PROCESS
                    // APPROVED
                    // REJECTED
                   
                    if(this.state.status=='APPROVAL_PENDING' || this.state.status=='IN_PROCESS' 
                        ||this.state.status=='APPROVED' || this.state.status=='REJECTED' || this.state.status=='ORDER_PLACED' ){
                          
                            axios.get(constants.ipAddress + "/requisition/getById/reqId="+this.state.requisitionId)
                            .then(
                              function (response) {
                              
                                this.setState({loading:false});   

                                console.log(response.data);
                                this.setState({
                                    reqObj: response.data[0]
                                }, () => {
                                //   this.setState({isLoading:false});
                                    // console.log("%%%%");
                                    // console.log(this.state.reqObj);
                                    // console.log("%%%%");
                                });
                
                              }.bind(this)
                            )
                            .catch(
                              function (error) {
                                this.setState({});   
                                console.log("error occurred -" + error);
                                this.setState({loading:false});
                              }.bind(this)
                            );
                            

                    }

            //network call for fetching data - end
        });
        

   
    }

    render() {
        return (
            <Screen navigation={this.props.navigation}>
            <View>

             {/* APPROVAL_PENDING
             IN_PROCESS
             APPROVED
             REJECTED */}

               <View style={{alignItems:"center", paddingTop:10}}>        
                    {this.state.loading == true && 
                            <Image
                            source={require("../assets/loading/gear.gif")}
                            style={{width:80, height:80,paddingTop:30}}
                            />
                    }
                </View>

            {(this.state.reqObj.status == 'APPROVAL_PENDING' || this.state.reqObj.status == 'IN_PROCESS' ||
             this.state.reqObj.status == 'APPROVED'||  this.state.reqObj.status == 'REJECTED' || this.state.reqObj.status == 'ORDER_PLACED'  ) &&

                 <FullStatusCard  navigation={this.props.navigation} reqId={this.state.reqObj._id} type ={this.state.reqObj.status}/>
            }


            </View>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({})
