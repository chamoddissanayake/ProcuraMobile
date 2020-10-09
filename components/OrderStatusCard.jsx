import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

import constants from "../utils/constants";
import colors from "../config/colors";
import AppText from '../common/AppText';
const axios = require("axios").default;

export default class OrderStatusCard extends Component {

    constructor(props) {
        super();
        this.state = {
            itemId:"",
            requisitionId:"",
            status:"",
            requisitiondate:"",
            siteId:"",
            siteManager:"",
            price:"",
            priority:"",
            // 
            itemName:"",
            itemPhoto:"",
            siteLocation:""
        };
      }

    componentDidMount(){

        this.setState({
            itemId: this.props.itemId,
            requisitionId:this.props.RequisitionId,
            status:this.props.status,
            requisitiondate:this.props.date,
            siteId:this.props.site,
            siteManager:this.props.siteManager,
            price:this.props.price,
            priority:this.props.priority
        }, () => {
           //get location by id


           axios
           .get(constants.ipAddress + "/location/id="+this.state.siteId)
           .then(
             function (response) {
                this.setState({
                    siteLocation: response.data[0].location ,
                });
             }.bind(this)
           )
           .catch(
             function (error) {
               console.log("error occurred -" + error);
             }.bind(this)
           );

           //get get itemname and location

           axios
           .get(constants.ipAddress + "/item/id="+this.state.itemId)
           .then(
             function (response) {

                this.setState({ 
                    itemName: response.data[0].itemName,
                    itemPhoto: response.data[0].photoURL11, 
                });
             }.bind(this)
           )
           .catch(
             function (error) {
               console.log("error occurred -" + error);
             }.bind(this)
           );


        });
    }

    render() {
        return (
            <View style={{padding:10, alignItems:"center"}}>
            <View style={styles.cardShadow}>
                <View style={styles.cardContainer}>

                    <View style={styles.namePriorityImageContainer}>
                        <View style={styles.priorityImgContainer}>

                        {this.state.priority == 1 && 
                        <Image
                        source={require("../assets/statusCard/green.png")}
                        style={styles.statusCircle}
                        />
                        }
                        {this.state.priority == 2 && 
                            <Image
                            source={require("../assets/statusCard/orange.png")}
                            style={styles.statusCircle}
                            />
                        }
                        {this.state.priority == 3 && 
                             <Image
                             source={require("../assets/statusCard/red.png")}
                             style={styles.statusCircle}
                             />
                        }
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{this.state.itemName}</Text>
                        </View>
                    </View>
                    

                <View style={styles.orderNoRow}>
                    <View style={{paddingRight:20}}>
                        <AppText style={{fontSize:17, fontWeight:"bold"}}>Order No:</AppText>
                    </View>
                    <View>
                        <AppText  style={{fontSize:17}}>{this.state.requisitionId}</AppText>
                    </View>
                </View> 

                    <View style={styles.imageDetailsContainer}>
                        <View style={styles.leftSide}>
                        {/* Left side start */}
                            <View>
                                <Image
                                    style={styles.imageStyle}
                                    source={this.state.itemPhoto ? { uri: this.state.itemPhoto } : null}
                                />
                            </View>
                        {/* Left Side end */}
                        </View>
                        <View style={styles.rightSide}> 
                        {/* Right side start */}
                        
                        <View style={styles.rightSideRow}>
                            <View style={styles.titleView}>
                                <AppText  style={styles.rightTitleTxt}>Status:</AppText>
                            </View>
                            <View style={styles.valueView}>
                                <AppText style={styles.leftTitleTxt}>{this.state.status}</AppText>
                            </View>
                        </View>
                        <View style={styles.rightSideRow}>
                            <View style={styles.titleView}>
                                <AppText  style={styles.rightTitleTxt}>Requisition Date: </AppText>
                            </View>
                            <View style={styles.valueView}>
                                <AppText style={styles.leftTitleTxt}>{this.state.requisitiondate}</AppText>
                            </View>
                        </View>
                        <View style={styles.rightSideRow}>
                            <View style={styles.titleView}>
                                <AppText  style={styles.rightTitleTxt}>Site:</AppText>
                            </View>
                            <View style={styles.valueView}>
                                <AppText style={styles.leftTitleTxt}>{this.state.siteLocation}</AppText>
                            </View>
                        </View>
                        <View style={styles.rightSideRow}>
                            <View style={styles.titleView}>
                                <AppText  style={styles.rightTitleTxt}>Price:</AppText>
                            </View>
                            <View style={styles.valueView}>
                                <AppText style={styles.leftTitleTxt}>{this.state.price}</AppText>
                            </View>
                        </View>

                        <View style={styles.rightSideRow}>
                            <View style={styles.titleView}>
                                <AppText  style={styles.rightTitleTxt}>Site Manager:</AppText>
                            </View>
                            <View style={styles.valueView}>
                                <AppText style={styles.leftTitleTxt}>{this.state.siteManager}</AppText>
                            </View>
                        </View>
                        {/* Right side end */}
                        </View>
                    </View>
                    
                </View>
            </View>
            </View>
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
       cardContainer: {
        backgroundColor: colors.light,
        borderRadius: 16,
       },

       statusCircle:{
           width:10,
           height:10
       },
       imageStyle:{
           width:100,
           height:100,
           borderRadius:20,

       },
       namePriorityImageContainer:{
        flexDirection: 'row',
        alignItems: 'flex-start',
       },
       priorityImgContainer:{
          
           padding:20
       },
       nameContainer:{
            padding:10
        },
        nameTxt:{
            fontSize:20,
            fontWeight:"bold"
        },
        imageDetailsContainer:{
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        leftSide:{
            paddingLeft: 10,
            paddingRight: 10 ,
            paddingBottom: 10,
        },
        rightSide:{
            
        },
        orderNoRow:{
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingLeft:10,
            paddingRight:10,
            paddingBottom:10
        },
        rightSideRow:{
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
        leftTitleTxt:{
            fontSize:13,

        },
        rightTitleTxt:{
            fontSize:13,            
            fontWeight:"bold"

        },
        valueView:{

        },
        titleView:{
            width:110
        }


})
