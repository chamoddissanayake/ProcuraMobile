import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import AppText from "../common/AppText";
import colors from "../config/colors";
import status from "../config/status";

export default class PurchasedItemComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      referenceID: "#45678933",
      itemName: "Cement",
      status: status.paid,
      orderDate: "20/09/2020",
      receivedDate: "01/10/2020",
      quantity: 100,
      totPrice: 10000,
      imagePath:
        "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2Ftemp%2Fcement.jpg?alt=media&token=307a3304-b12c-4f55-b1c4-8643aea5d2d4",
    };
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.cardShadow}>
          <View style={styles.cardContainer}>
            <View style={styles.cardInsider}>
              {/* Card Inside start */}

              <View style={styles.itemNameView}>
                <AppText style={styles.itemNameTxt}>
                  {this.state.itemName}
                </AppText>
              </View>

              <View style={styles.ImageAndDetailsContainer}>
                <View style={styles.ImageAndDetailsLeftSide}>
                  {/* LeftSide start */}
                  <Image
                    style={styles.itemImageStyle}
                    source={
                      this.state.imagePath
                        ? { uri: this.state.imagePath }
                        : null
                    }
                  />
                  {/* Left side end */}
                </View>
                <View style={styles.ImageAndDetailsRightSide}>
                  {/* Right side start */}
                  {/* #1 */}
                  <View style={styles.rightSideRow}>
                    <View style={styles.rightSideRowTitleView}>
                      <AppText style={styles.rightSideRowTitleText}>
                        Reference ID:
                      </AppText>
                    </View>
                    <View style={styles.rightSideRowValueView}>
                      <AppText style={styles.rightSideRowValueText}>
                        {this.state.referenceID}
                      </AppText>
                    </View>
                  </View>

                  {/* #2 */}
                  <View style={styles.rightSideRow}>
                    <View style={styles.rightSideRowTitleView}>
                      <AppText style={styles.rightSideRowTitleText}>
                        Status:
                      </AppText>
                    </View>
                    <View style={styles.rightSideRowValueView}>
                      <AppText style={styles.rightSideRowValueText}>
                        {this.state.status}
                      </AppText>
                    </View>
                  </View>

                  {/* #3 */}
                  <View style={styles.rightSideRow}>
                    <View style={styles.rightSideRowTitleView}>
                      <AppText style={styles.rightSideRowTitleText}>
                        Order Date:
                      </AppText>
                    </View>
                    <View style={styles.rightSideRowValueView}>
                      <AppText style={styles.rightSideRowValueText}>
                        {this.state.orderDate}
                      </AppText>
                    </View>
                  </View>

                  {/* #4 */}
                  <View style={styles.rightSideRow}>
                    <View style={styles.rightSideRowTitleView}>
                      <AppText style={styles.rightSideRowTitleText}>
                        Received Date:
                      </AppText>
                    </View>
                    <View style={styles.rightSideRowValueView}>
                      <AppText style={styles.rightSideRowValueText}>
                        {this.state.receivedDate}
                      </AppText>
                    </View>
                  </View>

                  {/* #5 */}
                  <View style={styles.rightSideRow}>
                    <View style={styles.rightSideRowTitleView}>
                      <AppText style={styles.rightSideRowTitleText}>
                        Quantity
                      </AppText>
                    </View>
                    <View style={styles.rightSideRowValueView}>
                      <AppText style={styles.rightSideRowValueText}>
                        {this.state.quantity}
                      </AppText>
                    </View>
                  </View>

                  {/* #6 */}
                  <View style={styles.rightSideRow}>
                    <View style={styles.rightSideRowTitleView}>
                      <AppText style={styles.rightSideRowTitleText}>
                        Price:
                      </AppText>
                    </View>
                    <View style={styles.rightSideRowValueView}>
                      <AppText style={styles.rightSideRowValueText}>
                        {this.state.totPrice}
                      </AppText>
                    </View>
                  </View>

                  {/* Right side end */}
                </View>
              </View>

              {/* Card Inside end */}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },

  cardShadow: {
    width: "90%",
    borderRadius: 16,
    backgroundColor: "transparent",
    shadowColor: "#000",
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
  cardInsider: {
    padding: 10,
  },
  itemImageStyle: {
    width: 120,
    height: 120,
    borderRadius: 30,
  },
  itemNameView: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
  },
  itemNameTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },

  ImageAndDetailsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  ImageAndDetailsLeftSide: {},
  ImageAndDetailsRightSide: {
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  rightSideRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  //
  rightSideRowTitleView: {
    width: 115,
  },
  rightSideRowTitleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rightSideRowValueView: {},
  rightSideRowValueText: {
    fontSize: 16,
  },
  //
});
