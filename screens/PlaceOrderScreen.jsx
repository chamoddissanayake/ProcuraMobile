import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../common/AppText";

export default class PlaceOrderScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      supplier: "Holcim",
      price: 1000,
      Item: "Cement",
      supplierLogo:
        "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2Ftemp%2Fholcim.jpg?alt=media&token=1f95c2ee-44fa-4b82-b8f3-ad1c30724fac",
    };
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
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
                  <AppText style={styles.supplierTitleTxt}>Supplier :</AppText>
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
                    {this.state.Item}
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

        <View style={styles.placeOrderBtnView}>
          <TouchableOpacity
            // onPress={this.onPressPlaceNewOrder}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
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
  },
});
