import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AppText from "../common/AppText";
import DashboardCard from "../components/DashboardCard";
import Screen from "../components/Screen";

export default class MainDashboardScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      loggedUser:"aaa"
    };
  }

  componentDidMount(){
    this.setState({ loggedUser: this.props.route.params.loggedUser});

    // console.log(this.props.route.params.loggedUser);
    // this.props.route.params.itemObjId

  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <View>
          <View style={styles.siteManagerDashboardTitleView}>
            <AppText style={styles.siteManagerDashboardTitleText}>
              SiteManager Dashboard
            </AppText>
          </View>

          <ScrollView>
            <View style={styles.scrollContainer}>
              {/* 1 */}
              <View style={styles.rowStyles}>
                <View>
                  {/* 1.1 */}

                  <DashboardCard
                    navigation={this.props.navigation}
                    loggedUser={this.state.loggedUser}
                    type={"stocks"}
                    imagePath={
                      "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2FDashboard%2Fstocks.png?alt=media&token=4e544238-a416-4df0-8498-71dbbac0c541"
                    }
                  />
                </View>
                <View>
                  {/* 1.2 */}

                  <DashboardCard
                    navigation={this.props.navigation}
                    loggedUser={this.state.loggedUser}
                    type={"quickOrder"}
                    imagePath={
                      "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2FDashboard%2FquickOrder.png?alt=media&token=7d592447-02c9-4c74-9828-67f61fb62463"
                    }
                  />
                </View>
              </View>

              {/* 2 */}
              <View style={styles.rowStyles}>
                <View>
                  {/* 2.1 */}

                  <DashboardCard
                    navigation={this.props.navigation}
                    loggedUser={this.state.loggedUser}
                    type={"orderStatus"}
                    imagePath={
                      "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2FDashboard%2ForderStatus.png?alt=media&token=a575d2ae-1eed-4baf-96b0-64849b57d39b"
                    }
                  />
                </View>
                <View>
                  {/* 2.2 */}

                  <DashboardCard
                    navigation={this.props.navigation}
                    loggedUser={this.state.loggedUser}
                    type={"purchaseHistory"}
                    imagePath={
                      "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2FDashboard%2FpurchaseHistory.png?alt=media&token=e9f78cca-7dac-4e3e-946f-2b7ed94cb5c1"
                    }
                  />
                </View>
              </View>

              {/* 3 */}
              <View style={styles.insufficientRowStyles}>
                <View>
                  <DashboardCard
                    navigation={this.props.navigation}
                    loggedUser={this.state.loggedUser}
                    type={"payments"}
                    imagePath={
                      "https://firebasestorage.googleapis.com/v0/b/csseproject-5ca2c.appspot.com/o/Procurement%20System%2FDashboard%2Fpayments.png?alt=media&token=ca2ce526-3007-47a4-99cf-2949d68b095c"
                    }
                  />
                </View>
                <View></View>
              </View>
            </View>
          </ScrollView>

          {/* <Button
            title={"Stocks"}
            onPress={() => this.props.navigation.navigate("StocksScreen")}
          /> */}
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  siteManagerDashboardTitleView: {
    alignItems: "center",
    padding: 20,
  },
  siteManagerDashboardTitleText: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 10,
  },
  rowStyles: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    alignContent: "space-between",
    paddingBottom: 30,
  },
  insufficientRowStyles: {
    alignItems: "center",
  },
  scrollContainer: {
    paddingBottom: 10,
  },
});
