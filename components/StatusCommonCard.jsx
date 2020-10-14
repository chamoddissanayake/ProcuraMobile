import React, { Component } from 'react'
import { Text, StyleSheet, View, addons, Alert, Image } from 'react-native'
const axios = require("axios").default;
import constants from "../utils/constants";
import colors from "../config/colors";
import AppText from "../common/AppText";

export default class StatusCommonCard extends Component {
    //handle only 
    //  APPROVAL_PENDING
    // APPROVED
    // REJECTED
    // IN_PROCESS

    constructor(props) {
        super();
        this.state = {
            reqId:"",
            reqObj:{},
            cardColor:"white",

            // 
            itemName:"",
            imagePath:"",
            supplierName:"",
            locationName:"",
        };
       
    }
    // https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2FItems%2Fcement%2Fcement.png?alt=media&token=96f1e299-6bcd-4119-83c9-59e10b5e58ce

    componentDidMount(){
        this.setState({cardColor:colors.light});
        
        // load reqData according to reqId
        this.setState({
            reqId: this.props.reqId
        }, () => {

            console.log("$$$");
            console.log(this.state.reqId);
            console.log("$$$");
            //get reqData network call - start;
            
            console.log(constants.ipAddress + "/requisition/getById/reqId="+this.state.reqId+"");
            axios.get(constants.ipAddress + "/requisition/getById/reqId="+this.state.reqId+"")
            .then(
                function (response) {

                this.setState({
                    reqObj : response.data[0]
                }, () => {
                    console.log("&&&");
                    console.log(this.state.reqObj.status);
                    console.log("&&&");
                        if(this.state.reqObj.status == 'APPROVAL_PENDING'){
                            this.setState({cardColor: colors.APPROVAL_PENDING_COLOR});
                        }else if (this.state.reqObj.status =='APPROVED'){
                            this.setState({cardColor: colors.APPROVED_COLOR});
                        }else if (this.state.reqObj.status =='REJECTED'){
                            this.setState({cardColor: colors.REJECTED_COLOR});
                        }else if (this.state.reqObj.status =='IN_PROCESS'){
                            this.setState({cardColor: colors.IN_PROCESS_COLOR});
                        }else if (this.state.reqObj.status =='ORDER_PLACED'){
                            this.setState({cardColor: colors.ORDER_PLACED_COLOR});
                        }

                        // ### 
                            //  get location by id  - start
                             axios.get(constants.ipAddress + "/location/id="+this.state.reqObj.siteId)
                                .then(
                                    function (response) {
                                    this.setState({locationName : response.data[0].location});
                                    }.bind(this)
                                )
                                .catch(
                                    function (error) {
                                    console.log("error occurred -" + error);
                                    this.setState({isLoading:false});
                                    }.bind(this)
                                );
                            // get location by id  - end

                            // get supplier by id  - start
                            axios.get(constants.ipAddress + "/supplier/id="+this.state.reqObj.supplierId)
                            .then(
                                function (response) {
                                    this.setState({supplierName: response.data[0].name});
                                }.bind(this)
                            )
                            .catch(
                                function (error) {
                                console.log("error occurred -" + error);
                                this.setState({isLoading:false});
                                }.bind(this)
                            );
                            // get location by id  - end

                            // get item name and photo by id - start
                            axios.get(constants.ipAddress + "/item/id="+this.state.reqObj.itemId)
                            .then(
                                function (response) {
                                    this.setState({
                                        itemName :response.data[0].itemName,
                                        imagePath: response.data[0].photoURL21
                                    });
                              
                                }.bind(this)
                            )
                            .catch(
                                function (error) {
                                console.log("error occurred -" + error);
                                this.setState({isLoading:false});
                                }.bind(this)
                            );
                            //get item name and photo by id - end

                        // ###

                });
                

                }.bind(this)
            )
            .catch(
                function (error) {
                console.log("error occurred -" + error);
                this.setState({isLoading:false});
                }.bind(this)
            );
            // get reqData network call - end


        });

    }

    // Object {
    //     "_id": "5f81325e79efb93138449917",
    //     "approvedBy": "",
    //     "approvedDate": "",
    //     "comment": "Aa",
    //     "itemId": "5f7f206fdb1a64991851c8c1",
    //     "priority": "1",
    //     "quantity": 2,
    //     "requiredDate": "Thursday 22 Oct 2020",
    //     "siteId": "5f80855bbd407b562e87e3ea",
    //     "siteManagerUsername": "aaa",
    //     "status": "APPROVAL_PENDING",
    //     "supplierId": "5f801b52c4ae96c56270d778",
    //     "totalPrice": 20000,
    //   }

    cardStyle = function() {
        return {
            backgroundColor: this.state.cardColor,
            borderRadius: 16,
            padding: 10,
        }
      }
        
    render() {
        return (
            <View style={{padding:10, alignItems:"center"}}>
                <View style={styles.cardShadow}>
                    <View style={this.cardStyle()}>
                            
                            <View style={styles.mainTitleContainer}>
                            <AppText style={styles.titleNameTxt}>{this.state.itemName}</AppText>
                            </View>
                         
                            <Image
                                style={styles.itemImageStyle}
                                source={
                                this.state.imagePath
                                    ? { uri: this.state.imagePath }
                                    : null
                                }
                            />

                            <View style={styles.detailsContainer}>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Order Number</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                            <AppText style={styles.valueTxt}>{this.state.reqObj._id}</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Status</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.reqObj.status}</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Requested Date</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.reqObj.requisitionDate}</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Site</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.locationName}</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Priority</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                        {this.state.reqObj.priority == 1 && 
                                            <AppText style={styles.valueTxt}>High</AppText>
                                        }
                                        {this.state.reqObj.priority == 2 && 
                                            <AppText style={styles.valueTxt}>Medium</AppText>
                                        }
                                        {this.state.reqObj.priority == 3 && 
                                            <AppText style={styles.valueTxt}>High</AppText>
                                        }

                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Price</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.reqObj.totalPrice}</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Quantity</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.reqObj.quantity}</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Supplier</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.supplierName}</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Required Date:</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.reqObj.requiredDate}</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Comment:</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.reqObj.comment}</AppText>
                                    </View>
                                </View>


                                {this.state.reqObj.status == 'APPROVED' && 
                                <View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Approved By:</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.reqObj.approvedBy}</AppText>
                                    </View>
                                </View>

                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Approved Date:</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>{this.state.reqObj.approvedDate}</AppText>
                                    </View>
                                </View>
                                </View>
                                }

                              
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
       itemImageStyle:{
           width:"100%",
           height:200,
           borderRadius:30
       },
       mainTitleContainer:{
           padding:10,
           alignItems:"center"
       },
       titleNameTxt:{
           fontSize:20,
           fontWeight:"bold"
       },
       detailsContainer:{
        padding:10
       },
       singleRow:{
        flexDirection: 'row',
        alignItems: 'flex-start',
       },
       leftSide:{
            width:130
       },
       rightSide:{

       },
       titleTxt:{
        fontSize:16,
        fontWeight:"bold"
       },
       valueTxt:{
            fontSize:16
       }
})
