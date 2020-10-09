import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Picker,
  Alert,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../common/AppText";
import { ScrollView } from "react-native-gesture-handler";
import NumericInput from "react-native-numeric-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Moment from "react-moment";
import Textarea from "react-native-textarea";
import constants from "../utils/constants";

const axios = require("axios").default;


export default class PlaceOrderScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      itemObjId:"",
      supplier: "",
      availableQty:1,
      price: 0,
      itemName: "",
      supplierId:"",
      supplierLogo:"",
      options: {
        1: "Colombo",
        2: "Galle",
        3: "Kandy",
        4: "Anuradhapura",
        5: "Katharagama",
      },
      selectedSite: "",

      //
      orderCount: 1,
      selectedNeedDate: "",
      isDatePickerVisible: false,
      total: 0,
    };

    this.showDatePicker = this.showDatePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
  }

  componentDidMount() {

    this.setState({
      itemObjId: this.props.route.params.itemObjId,
  }, () => {

//load item data

axios
    .get(constants.ipAddress + "/item/id="+this.state.itemObjId+"")
    .then(
      function (response) {

        this.setState({ itemObjId: response.data[0]._id });
        this.setState({ itemName: response.data[0].itemName });
        this.setState({ availableQty: response.data[0].availableQty });
        this.setState({ price: response.data[0].price });

        this.setState({
          supplierId: response.data[0].supplierId
      }, () => {

          //load supplier data




          axios
          .get(constants.ipAddress + "/supplier/id="+this.state.supplierId+"")
          .then(
            function (response) {

               this.setState({ supplier: response.data[0].name });
               this.setState({ supplierLogo: response.data[0].supplierLogoURL });

              // response.data[0]._id availableQty  category  itemName  maxQty  photoURL11  photoURL21  price  supplierId  weightPerItem
            }.bind(this)
          )
          .catch(
            function (error) {
              console.log("error occurred -" + error);
            }.bind(this)
          );









          // load supplier data end







      });
    // "_id": "5f7ed8f90ecdfea0c1e9ff74",  //
    // "itemName": "Wire",//
        // "availableQty": "400",//
        // "price": "500",//

        // "category": "NORMAL",
        // "maxQty": "1000",
        // "photoURL11":"",
        // "photoURL21": "",
        // "supplierId": "S002",
        // "weightPerItem": "5",


        // response.data[0]._id availableQty  category  itemName  maxQty  photoURL11  photoURL21  price  supplierId  weightPerItem
      }.bind(this)
    )
    .catch(
      function (error) {
        console.log("error occurred -" + error);
      }.bind(this)
    );


// End
  })

 

    //last of didmount
    this.setState({ total: this.state.price });
  }

  showDatePicker() {
    this.setState({ isDatePickerVisible: true });
  }
  handleConfirm(date) {
    this.setState({ selectedNeedDate: date });
    this.hideDatePicker();
  }

  hideDatePicker() {
    this.setState({ isDatePickerVisible: false });
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <ScrollView>
          <View style={styles.titleArea}>
            <AppText style={styles.titleText}>Place Order</AppText>
          </View>

          {/* supplier area start */}
          <View style={styles.supplierContainer}>
            <View style={{ alignItems: "center", padding: 10 }}>
              <AppText style={{ fontSize: 20, fontWeight: "bold" }}>
                Supplier Details
              </AppText>
            </View>

            <View style={styles.supplierItemPriceContainer}>
              <View style={styles.leftSide}>
                {/* logo side start */}
                <Image
                  style={styles.supplierLogoStyle}
                  source={
                    this.state.supplierLogo
                      ? { uri: this.state.supplierLogo }
                      : null
                  }
                />
                {/* logo side end */}
              </View>
              <View style={styles.rightSide}>
                {/* Right side start */}
                <View style={styles.rightSideRow}>
                  <View style={styles.supplierTitleView}>
                    <AppText style={styles.supplierTitleTxt}>
                      Supplier :
                    </AppText>
                  </View>
                  <View style={styles.supplierValueView}>
                    <AppText style={styles.supplierValueTxt}>
                      {this.state.supplier}
                    </AppText>
                  </View>
                </View>

                <View style={styles.rightSideRow}>
                  <View style={styles.supplierTitleView}>
                    <AppText style={styles.supplierTitleTxt}>Item :</AppText>
                  </View>
                  <View style={styles.supplierValueView}>
                    <AppText style={styles.supplierValueTxt}>
                      {this.state.itemName}
                    </AppText>
                  </View>
                </View>

                <View style={styles.rightSideRow}>
                  <View style={styles.supplierTitleView}>
                    <AppText style={styles.supplierTitleTxt}>Price :</AppText>
                  </View>
                  <View style={styles.supplierValueView}>
                    <AppText style={styles.supplierValueTxt}>
                      {this.state.price}
                    </AppText>
                  </View>
                </View>
                {/* Right side end */}
              </View>
            </View>
          </View>

          {/* supplier area end */}

          {/* construction Site - start */}
          <View style={styles.constructionSiteContainer}>
            <View style={styles.constructionSiteLeftSide}>
              <AppText style={styles.constructionSiteTxt}>
                Construction Site :
              </AppText>
            </View>
            <View style={styles.constructionSiteRightSide}>
              <View style={styles.pickerContainer}>
                {/* <Picker
                selectedValue={this.state.selectedValue}
                style={{ height: 50, width: 150 }}
                // onValueChange={(itemValue, itemIndex) =>
                //   setSelectedValue(itemValue)
                // }
              >
                <Picker.Item label="Australia" value="java" />
                <Picker.Item label="Canada" value="js" />
                <Picker.Item label="India" value="js" />
                <Picker.Item label="New Zealand" value="js" />
                <Picker.Item label="Singapre" value="js" />
                <Picker.Item label="USA" value="js" />
              </Picker> */}

                <Picker
                  style={{ width: 200 }}
                  mode="dropdown"
                  selectedValue={this.state.selectedSite}
                  onValueChange={() => {}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ selectedSite: itemValue })
                  }
                >
                  {Object.keys(this.state.options).map((key) => {
                    return (
                      <Picker.Item
                        label={this.state.options[key]}
                        value={key}
                        key={key}
                      />
                    ); //if you have a bunch of keys value pair
                  })}
                </Picker>
              </View>
            </View>
          </View>
          {/* construction Site - end */}

          {/* OrderDetails - start */}
          <View style={styles.orderDetailsContainer}>
            <View style={styles.orderDetailsTitleContainer}>
              <AppText style={{ fontSize: 20, fontWeight: "bold" }}>
                Order Details
              </AppText>
            </View>

            <View style={styles.quantityContainer}>
              <View style={styles.quantityLeft}>
                <AppText style={styles.quantityText}>Quantity :</AppText>
              </View>
              <View>
                <View>
                  <NumericInput
                    initValue={1}
                    onChange={(value) => {
                      this.setState({ orderCount: value });
                      var temp = this.state.price * value;
                      this.setState({ total: temp });
                    }}
                    totalWidth={200}
                    totalHeight={50}
                    iconSize={25}
                    step={1}
                    minValue={1}
                    maxValue={this.state.availableQty}
                    valueType="real"
                    rounded
                    textColor="#B0228C"
                    iconStyle={{ color: "white" }}
                    rightButtonBackgroundColor="#EA3788"
                    leftButtonBackgroundColor="#E56B70"
                  />
                </View>
              </View>
            </View>

            <View>
              <AppText>Required Date:</AppText>
            </View>

            <View>
              {/*  */}
              <TouchableOpacity
                style={{ backgroundColor: "#dddddd" }}
                onPress={this.showDatePicker}
              >
                <AppText style={{ fontSize: 15, height: 40 }}>
                  {this.state.selectedNeedDate.toString()}
                </AppText>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
              {/*  */}
            </View>

            <View style={{ paddingLeft: 10 }}>
              <AppText>Comments</AppText>
            </View>
            <View style={{ padding: 10 }}>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                // onChangeText={this.onChange}
                // defaultValue={this.state.text}
                maxLength={120}
                placeholder={"Write any comments here..."}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />
            </View>

            <View style={styles.totPriceContainer}>
              {/* Total price */}
              <View style={styles.totPriceLeftSide}>
                <AppText style={styles.totPriceTxt}>Total Price: (Rs.)</AppText>
              </View>
              <View>
                <AppText style={styles.totPriceVal}>{this.state.total}</AppText>
              </View>
            </View>
          </View>
          {/* Order Details - end */}

          <View style={styles.placeOrderBtnView}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("RequestOrOrderScreen")
              }
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
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

  titleArea: {
    alignItems: "center",
    padding: 18,
  },
  titleText: {
    fontSize: 27,
    fontWeight: "bold",
  },
  supplierContainer: {
    borderRadius: 3,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  //
  supplierItemPriceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  leftSide: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  rightSide: {
    paddingTop: 8,
  },

  supplierLogoStyle: {
    width: 160,
    height: 90,
    borderRadius: 20,
  },
  rightSideRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  supplierTitleView: {
    width: 90,
  },
  supplierValueView: {},

  supplierTitleTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  supplierValueTxt: { fontSize: 18 },

  placeOrderBtnView: {
    alignItems: "center",
    paddingBottom: 20,
  },

  constructionSiteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 20,
  },
  constructionSiteLeftSide: {
    paddingTop: 10,
    paddingLeft: 10,
    // backgroundColor: "green",
    width: 180,
  },
  constructionSiteRightSide: {},
  constructionSiteTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerContainer: {},
  //   Order details
  orderDetailsContainer: {
    padding: 10,
    borderRadius: 3,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },

  orderDetailsTitleContainer: {
    alignItems: "center",
    padding: 10,
  },
  // textarea
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: "#F5FCFF",
    borderRadius: 10,
  },
  textarea: {
    textAlignVertical: "top",
    height: 170,
    fontSize: 14,
    color: "#333",
    borderRadius: 10,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "flex-start",

    padding: 10,
  },

  quantityLeft: {
    width: 120,
    paddingTop: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  totPriceContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  totPriceTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totPriceVal: {
    fontSize: 24,
    fontWeight: "bold",
  },
  totPriceLeftSide: {
    paddingTop: 5,
  },
});
