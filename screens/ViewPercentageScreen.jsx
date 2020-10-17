import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Alert, AppRegistry } from "react-native";
import Screen from "../components/Screen";
// import PureChart from "react-native-pure-chart";
import AppText from "../common/AppText";
import AppButton from "../common/AppButton";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";
import constants from "../utils/constants";
// import Pie from 'react-native-pie'


const axios = require("axios").default;


export default class ViewPercentageScreen extends Component {
  
  constructor(props) {
    super();
    this.state = {
      itemObjId: "",
      itemName: "",
      photoPath:"",
      capacity: 0,
      //   used: 0,
      //   remaining: 50,

      dataSet: [
        { value: 0, label: "Used", color: "red" },
        { value: 0, label: "Remaining", color: "blue" }
        // 0 value - used
        // 1 value - remaining
      ],
      loggedUser:""
    };
  }

  componentDidMount() {
    this.setState({
      itemObjId: this.props.route.params.itemObjId.props.children,
      loggedUser: this.props.route.params.loggedUser,
  }, () => {
    axios
    .get(constants.ipAddress + "/item/id="+this.state.itemObjId+"")
    .then(
      function (response) {
        // this.setState({ criticalItems: response.data });
        // console.log(response.data);


        this.setState({ itemObjId: response.data[0]._id });
        this.setState({ itemName: response.data[0].itemName });
        this.setState({ photoPath: response.data[0].photoURL21 });
        this.setState({ capacity: response.data[0].maxQty });

        var usedQty = response.data[0].maxQty - response.data[0].availableQty;
        var availQty = response.data[0].availableQty;

        var usedQtyPresentage= parseInt(usedQty);
        var availQtyPresentage= parseInt(availQty);

        // Alert.alert(usedQtyPresentage.toString(),availQtyPresentage.toString());
        
        
        if(usedQtyPresentage>availQtyPresentage){
          // Alert.alert(usedQtyPresentage.toString(),availQtyPresentage.toString());

          //usedQty is less or equal  - first add usedQty and then availQty
          this.setState({ 
            dataSet:[{ value: usedQtyPresentage, label: "Used", color: "red" },{ value:availQtyPresentage, label: "Remaining", color: "blue" }]
          });
        }else if(usedQtyPresentag<=availQtyPresentage){
          // Alert.alert(availQtyPresentage.toString(),usedQtyPresentage.toString());

          //usedQty is greater   - first add availQty and then usedQty
          this.setState({ 
            dataSet:[{ value: parseInt(availQtyPresentage), label: "Remaining", color: "blue" },{ value: parseInt(usedQtyPresentage), label: "Used", color: "red" }]
          });
        }


// this.setState(prevState => ({
//   dataSet: {
//       ...prevState.dataSet,
//       [prevState.dataSet[0].value]: usedQty,
//       [prevState.dataSet[1].value]: availQty,
//   },
// }));


// dataSet: [
//   { value: 30, label: "Used", color: "red" },
//   { value:70, label: "Remaining", color: "blue" },
//   // 0 value - used
//   // 1 value - remaining
// ],


      
        // response.data[0]._id availableQty  category  itemName  maxQty  photoURL11  photoURL21  price  supplierId  weightPerItem
      }.bind(this)
    )
    .catch(
      function (error) {
        console.log("error occurred -" + error);
      }.bind(this)
    );
  });

  


  }

  onPressPlaceNewOrder = () => {
    this.props.navigation.navigate("PlaceOrderScreen",{itemObjId:this.state.itemObjId, loggedUser:this.state.loggedUser});
  };

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <ScrollView>
          <View>
            {/* https://developer.aliyun.com/mirror/npm/package/react-native-pure-chart */}

            <View style={styles.ItemNameArea}>
              <AppText style={styles.ItemNameText}>
                {this.state.itemName}
              </AppText>
            </View>


            <View style={styles.imageContainerView}>
              <Image
                style={styles.imageStyle}
                source={
                  this.state.photoPath ? { uri: this.state.photoPath } : null
                }
              />
            </View>
            <View style={styles.piechartArea}>
              {/* <PureChart data={this.state.dataSet} type="pie" /> */}
            </View>

            {/* Start Summary */}
            <View style={styles.usedRemainingSummary}>
              <View style={styles.usedRemainingSummaryRow}>
                <View style={styles.summaryLeftSide}>
                  <AppText style={styles.titleText}>Capacity</AppText>
                </View>
                <View style={styles.summaryRightSide}>
                  <AppText style={styles.valueText}>
                    {this.state.capacity}
                  </AppText>
                </View>
              </View>
              <View style={styles.usedRemainingSummaryRow}>
                <View style={styles.summaryLeftSide}>
                  <AppText style={styles.titleText}>Remaining</AppText>
                </View>
                <View style={styles.summaryRightSide}>
                  <AppText style={styles.valueText}>
                    {this.state.dataSet[1].value}
                  </AppText>
                </View>
              </View>
              <View style={styles.usedRemainingSummaryRow}>
                <View style={styles.summaryLeftSide}>
                  <AppText style={styles.titleText}>Used</AppText>
                </View>
                <View style={styles.summaryRightSide}>
                  <AppText style={styles.valueText}>
                    {this.state.dataSet[0].value}
                  </AppText>
                </View>
              </View>
            </View>
            {/* End of summary */}

            {/* <View style={styles.centerBtns}>
              <TouchableOpacity
                //   onPress={onPress}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>View Previous Orders</Text>
              </TouchableOpacity>
            </View> */}

            <View style={styles.centerBtns}>
              <TouchableOpacity
                onPress={this.onPressPlaceNewOrder}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Place New Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  piechartArea: {
    alignItems: "center",
  },
  ItemNameArea: {
    alignItems: "center",
    padding: 18,
  },
  ItemNameText: {
    fontSize: 27,
    fontWeight: "bold",
  },
  imageStyle: {
    width: 350,
    height: 175,
    borderRadius: 30,
  },
  imageContainerView: {
    // backgroundColor: "yellow",
    alignItems: "center",
    paddingBottom: 30,
  },

  usedRemainingSummary: {
    padding: 20,
    //
    // display: "flex",
    // backgroundColor: colors.light,
    // flex: 1,
    // padding: 3,
    borderRadius: 3,
    marginVertical: 10,
    marginHorizontal: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },

  usedRemainingSummaryRow: {
    flexDirection: "row",
    alignItems: "flex-start",

    alignSelf: "center",
  },
  summaryLeftSide: {
    width: 150,
  },
  summaryRightSide: {
    width: 50,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  valueText: {
    fontSize: 18,
  },
  centerBtns: {
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  //
  appButtonContainer: {
    elevation: 8,
    backgroundColor: colors.btnColor,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 300,
    height: 50,
  },
  appButtonText: {
    fontSize: 18,
    // color: "#fff",
    color: colors.btnTextColor,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
