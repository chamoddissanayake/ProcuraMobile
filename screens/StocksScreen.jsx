import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AppText from "../common/AppText";
import Screen from "../components/Screen";
import StockItemCard from "../components/StockItemCard";
import constants from "../utils/constants";

const axios = require("axios").default;

export default class StocksScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      criticalPrecentage: 0,
      limitPrice: 0,
      normalItems: [],
      criticalItems: [],
      isLoadingCritical: false,
      isLoadingNormal: false,
      loggedUser:""
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress(txt) {
    // Alert.alert("Alert Title", "My Alert Msg " + txt);
    //load View percentage screen

    this.props.navigation.navigate("ViewPercentageScreen", { itemObjId: txt, loggedUser:this.state.loggedUser });
  }

  componentDidMount() {
    this.setState({ isLoadingCritical: true });
    this.setState({ isLoadingNormal: true });
   //this.setState({ loggedUser: this.props.route.params.loggedUser});

    console.log(this.props);

      if(this.props.route.params == undefined){
        this.setState({loggedUser: "aaa"});
      }else{
        this.setState({
          loggedUser: this.props.route.params.loggedUser
         }, () => {
         });
      }
      


    axios
      .get(constants.ipAddress + "/item/critical")
      .then(
        function (response) {
          this.setState({ criticalItems: response.data });
          this.setState({ isLoadingCritical: false });
        }.bind(this)
      )
      .catch(
        function (error) {
          this.setState({ isLoadingCritical: false });
          console.log("error occurred -" + error);
        }.bind(this)
      );

    axios
      .get(constants.ipAddress + "/item/normal")
      .then(
        function (response) {
          this.setState({ normalItems: response.data });
          this.setState({ isLoadingNormal: false });
        }.bind(this)
      )
      .catch(
        function (error) {
          this.setState({ isLoadingNormal: false });
          console.log("error occurred -" + error);
        }.bind(this)
      );
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <ScrollView>
          <View style={styles.stocksScreenTitleView}>
            <AppText style={[styles.stocksScreenTitleText, { color: "red" }]}>
              Critical Items
            </AppText>
          </View>

          <View>
            {this.state.isLoadingCritical == true && (
              <View style={styles.criticalGearContainer}>
                <Image
                  source={require("../assets/itemsCriticalOrOther/gear.gif")}
                  style={styles.criticalGearStyle}
                />
              </View>
            )}

            {this.state.criticalItems.length > 0 &&
              this.state.criticalItems.map((item) => (
                <View key={item._id}>
                  {/* <Text>{item._id}</Text>
                  <Text>{item.availableQty}</Text>
                  <Text>{item.category}</Text>
                  <Text>{item.itemName}</Text>
                  <Text>{item.maxQty}</Text>
                  <Text>{item.photoURL11}</Text>
                  <Text>{item.photoURL21}</Text>
                  <Text>{item.price}</Text>
                  <Text>{item.supplierId}</Text>
                  <Text>{item.weightPerItem}</Text>
                  <Text></Text> */}

                  <TouchableOpacity
                    onPress={() => this.onPress(<Text>{item._id}</Text>)}
                  >
                    <StockItemCard
                      name={item.itemName}
                      imagePath={item.photoURL11}
                      availableQty={item.availableQty}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>

          <View style={styles.stocksScreenTitleView}>
            <AppText style={styles.stocksScreenTitleText}>Other Items</AppText>
          </View>

          {this.state.isLoadingCritical == true && (
            <View style={styles.normalGearContainer}>
              <Image
                source={require("../assets/itemsCriticalOrOther/gear.gif")}
                style={styles.normalGearStyle}
              />
            </View>
          )}

          <View>
            {this.state.normalItems.length > 0 &&
              this.state.normalItems.map((item) => (
                <View key={item._id}>
                  {/* <Text>{item._id}</Text>
                  <Text>{item.availableQty}</Text>
                  <Text>{item.category}</Text>
                  <Text>{item.itemName}</Text>
                  <Text>{item.maxQty}</Text>
                  <Text>{item.photoURL11}</Text>
                  <Text>{item.photoURL21}</Text>
                  <Text>{item.price}</Text>
                  <Text>{item.supplierId}</Text>
                  <Text>{item.weightPerItem}</Text>
                  <Text></Text> */}

                  <TouchableOpacity
                    onPress={() => this.onPress(<Text>{item._id}</Text>)}
                  >
                    <StockItemCard
                      name={item.itemName}
                      imagePath={item.photoURL11}
                      availableQty={item.availableQty}
                    />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  stocksScreenTitleView: {
    alignItems: "center",
    padding: 20,
  },
  stocksScreenTitleText: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 10,
  },
  criticalGearStyle: {
    width: 80,
    height: 80,
  },
  criticalGearContainer: {
    paddingTop: "10%",
    alignItems: "center",
  },
  normalGearStyle: {
    width: 80,
    height: 80,
  },
  normalGearContainer: {
    paddingTop: "10%",
    alignItems: "center",
  },
});
