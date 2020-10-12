import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert } from 'react-native'
import { cos } from 'react-native-reanimated';
import ApprovedCard from '../components/FullStatusCards/ApprovedCard';
import InProcessCard from '../components/FullStatusCards/InProcessCard';
import PendingCard from '../components/FullStatusCards/PendingCard';
import RejectedCard from '../components/FullStatusCards/RejectedCard';
import Screen from "../components/Screen";
const axios = require("axios").default;
import constants from "../utils/constants";

export default class OrderStatusFullScreen extends Component {

    constructor(props) {
        super();
        this.state = {
            requisitionId:"",
            status:"",
            reqObj:{}
        };
     
    }

    componentDidMount(){
        // console.log(this.props.navigation)
        this.setState({ 
            requisitionId: this.props.route.params.requisitionId, 
            status:this.props.route.params.status 
        }, () => {
            //network call for fetching data  by requisition id- start
            // for
                    // APPROVAL_PENDING
                    // IN_PROCESS
                    // APPROVED
                    // REJECTED
                    console.log(this.state.status);
                    console.log("aaa");
                    if(this.state.status=='APPROVAL_PENDING' || this.state.status=='IN_PROCESS' 
                        ||this.state.status=='APPROVED' || this.state.status=='REJECTED' ){
                            console.log(""+this.state.requisitionId);
                            axios.get(constants.ipAddress + "/requisition/getById/reqId="+this.state.requisitionId)
                            .then(
                              function (response) {
                              
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
                                console.log("error occurred -" + error);
                                this.setState({isLoading:false});
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
            {this.state.reqObj.status == 'APPROVAL_PENDING' && 
                <PendingCard/>
            }

            {this.state.reqObj.status == 'IN_PROCESS' && 
          
                <InProcessCard/>
            }

            {this.state.reqObj.status == 'APPROVED' && 
          
                <ApprovedCard/>
            }

            {this.state.reqObj.status == 'REJECTED' && 
        
                <RejectedCard/>
            
            }

            </View>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({})
