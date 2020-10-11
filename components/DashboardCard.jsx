import React, { Component } from "react";
import { Text, StyleSheet, View, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class DashboardCard extends Component {
  constructor(props) {
    super();
    this.state = {
      //   type: this.props.type,
      type: "",
      imagePath: "",
      loggedUser:""
    };
    this.imagePressed = this.imagePressed.bind(this);

  }

  componentDidMount() {
    this.setState({ type: this.props.type });
    this.setState({ imagePath: this.props.imagePath });

    this.setState({
        loggedUser:this.props.loggedUser  
    }, () => {
    
    });

  }

  imagePressed = () => {
    if (this.state.type == "stocks") {
      this.props.navigation.navigate("StocksScreen",{loggedUser: this.state.loggedUser});
    } else if (this.state.type == "quickOrder") {
      this.props.navigation.navigate("QuickOrderScreen",{loggedUser: this.state.loggedUser});
    } else if (this.state.type == "orderStatus") {
      this.props.navigation.navigate("OrderStatusScreen");
    } else if (this.state.type == "purchaseHistory") {
      this.props.navigation.navigate("PurchaseHistoryScreen");
    } else if (this.state.type == "payments") {
      this.props.navigation.navigate("PaymentsScreen");
    }
  };

  render() {
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={this.imagePressed}>
          <Image
            style={styles.imageStyle}
            source={this.props.imagePath ? { uri: this.props.imagePath } : null}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
  imageContainer: {
    borderColor: "gray",
    borderWidth: 1,
    width: 150,
    borderRadius: 30,

    //
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
