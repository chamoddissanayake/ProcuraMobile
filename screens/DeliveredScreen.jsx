import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Screen from "../components/Screen";
import AppText from "../common/AppText";
const axios = require("axios").default;
import constants from "../utils/constants";


export default class DeliveredScreen extends Component {
    constructor(props) {
        super();
        this.state = {
            requisitionId:"",
            status:"",
            orderObj:{}
        };
      }

    componentDidMount(){
        this.setState({ 
             
        });

        this.setState({
            requisitionId: this.props.route.params.requisitionId, 
            status:this.props.route.params.status
        }, () => {
            //Provide requisition id and get order object - start

            axios.get(constants.ipAddress + "/requisition/objByReqId/id="+this.state.requisitionId)
            .then(
              function (response) {
 
                console.log(response);
                // this.setState({
                //     orderObj: response.data[0]
                // }, () => {
                //     console.log("^^^^^");
                //     console.log(this.state.orderObj);
                //     console.log("^^^^^");
                // });

              }.bind(this)
            )
            .catch(
              function (error) {
                console.log("error occurred -" + error);
              
              }.bind(this)
            );
            //Provide requisition id and get order object - end
        });

        // localhost:8000/requisition/objByReqId/id=5f86f16d736dff2078d772f4

    }
    render() {
        return (
            <Screen navigation={this.props.navigation}>
                <View>
                    <AppText> Delivered Screen</AppText>
                    <AppText> {this.state.requisitionId} </AppText>
                    <AppText> {this.state.status}</AppText>
                </View>
            </Screen>
        )
    }
}

const styles = StyleSheet.create({})
