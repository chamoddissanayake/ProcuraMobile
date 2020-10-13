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
            reqId:"5f85417aed812c1640eb038b",
            reqObj:{
                _id: "5f85417aed812c1640eb038b",
                siteManagerUsername: "aaa",
                itemId: "5f7ed6dfa3f08557606c31bd",
                supplierId: "5f801807c4ae96c56270d774",
                quantity: 3,
                requiredDate: "Friday 23 Oct 2020",
                siteId: "5f80855bbd407b562e87e3ea",
                totalPrice: 4500,
                comment: "Hjh",
                priority: "2",
                status: "APPROVAL_PENDING",
                approvedDate: "",
                approvedBy: ""
            },
            cardColor:"white",

            // 
            imagePath:"https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2FItems%2Fcement%2Fcement.png?alt=media&token=96f1e299-6bcd-4119-83c9-59e10b5e58ce"
        };
       
    }
  

    componentDidMount(){
        this.setState({cardColor:colors.light});
        
        // load reqData according to reqId
        this.setState({
            reqId: this.props.reqId
        }, () => {
            //get reqData network call - start;
            
            // console.log(constants.ipAddress + "/requisition/getById/reqId="+this.state.reqId+"");
            // axios.get(constants.ipAddress + "/requisition/getById/reqId="+this.state.reqId+"")
            // .then(
            //     function (response) {

            //     console.log("000");
            //     console.log(response.data);
            //     console.log("000");
            //     // this.setState({
            //     //     reqObj : response.data[0]
            //     // }, () => {
            //     //     console.log("&&&");
            //     //     console.log(this.state.reqObj.status);
            //     //     console.log("&&&");
            //     //         if(this.state.reqObj.status == 'APPROVAL_PENDING'){
            //     //             this.setState({cardColor: colors.APPROVAL_PENDING_COLOR});
            //     //         }else if (this.state.reqObj.status =='APPROVED'){
            //     //             this.setState({cardColor: colors.APPROVED_COLOR});
            //     //         }else if (this.state.reqObj.status =='REJECTED'){
            //     //             this.setState({cardColor: colors.REJECTED_COLOR});
            //     //         }else if (this.state.reqObj.status =='IN_PROCESS'){
            //     //             this.setState({cardColor: colors.IN_PROCESS_COLOR});
            //     //         }
            //     // });
                

            //     }.bind(this)
            // )
            // .catch(
            //     function (error) {
            //     console.log("error occurred -" + error);
            //     this.setState({isLoading:false});
            //     }.bind(this)
            // );
            // get reqData network call - end


// // get location by id  - start
//  axios.get(constants.ipAddress + "/location/id="+"5f80855bbd407b562e87e3ea")
//             .then(
//                 function (response) {

//                 console.log("000");
//                 console.log(response.data);
//                 console.log("000");
//                 // this.setState({
//                 //     reqObj : response.data[0]
//                 // }, () => {
//                 //     console.log("&&&");
//                 //     console.log(this.state.reqObj.status);
//                 //     console.log("&&&");
//                 //     
//                 // });
//                 }.bind(this)
//             )
//             .catch(
//                 function (error) {
//                 console.log("error occurred -" + error);
//                 this.setState({isLoading:false});
//                 }.bind(this)
//             );
// //get location by id  - end

// // get supplier by id  - start
// axios.get(constants.ipAddress + "/supplier/id="+"5f801807c4ae96c56270d774")
// .then(
//     function (response) {

//     console.log("000");
//     console.log(response.data);
//     console.log("000");
//     // this.setState({
//     //     reqObj : response.data[0]
//     // }, () => {
//     //     console.log("&&&");
//     //     console.log(this.state.reqObj.status);
//     //     console.log("&&&");
//     //     
//     // });
//     }.bind(this)
// )
// .catch(
//     function (error) {
//     console.log("error occurred -" + error);
//     this.setState({isLoading:false});
//     }.bind(this)
// );
// //get location by id  - end


// // get item name and photo by id - start
// axios.get(constants.ipAddress + "/item/id="+"5f7ed6dfa3f08557606c31bd")
// .then(
//     function (response) {

//     console.log("000");
//     console.log(response.data);
//     console.log("000");
//     // this.setState({
//     //     reqObj : response.data[0]
//     // }, () => {
//     //     console.log("&&&");
//     //     console.log(this.state.reqObj.status);
//     //     console.log("&&&");
//     //     
//     // });
//     }.bind(this)
// )
// .catch(
//     function (error) {
//     console.log("error occurred -" + error);
//     this.setState({isLoading:false});
//     }.bind(this)
// );
// //get item name and photo by id - end


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
                                <AppText style={styles.titleNameTxt}>Cement</AppText>
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
                                    <AppText style={styles.valueTxt}>#32456734546</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Status</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>Approval Pending</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Date</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>2020/08/10</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Site</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>Colombo</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Priority</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>High</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Price</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>100000</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Quantity</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>100</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Supplier</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>Holcim</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Required Date:</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>12/12/2002</AppText>
                                    </View>
                                </View>
                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Comment:</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>Please approve</AppText>
                                    </View>
                                </View>

                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Approved By:</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>Bbb</AppText>
                                    </View>
                                </View>

                                <View style={styles.singleRow}>
                                    <View style={styles.leftSide}>
                                    <AppText style={styles.titleTxt}>Approved Date:</AppText>
                                    </View>
                                    <View style={styles.rightSide}>
                                    <AppText style={styles.valueTxt}>12/10/2020</AppText>
                                    </View>
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
            width:150
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
