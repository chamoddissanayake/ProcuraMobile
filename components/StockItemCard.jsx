import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "../common/AppText";

export default class StockItemCard extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      imagePath: "",
      availableQty: "",
    };
  }

  componentDidMount() {
    this.setState({ name: this.props.name });
    this.setState({ imagePath: this.props.imagePath });
    this.setState({ availableQty: this.props.availableQty });
  }

  imagePressed = () => {};

  render() {
    return (
      <View style={styles.constainer}>
        <View style={styles.shadowContainer}>
          <View style={styles.fullRow}>
            {/* row start */}
            {/* 1 */}
            <View style={{ paddingLeft: 15 }}>
              <Image
                style={styles.imageStyle}
                source={
                  this.state.imagePath ? { uri: this.state.imagePath } : null
                }
              />
            </View>
            {/* 2 */}
            <View style={{ width: 150, paddingTop: 10 }}>
              <AppText style={{ fontSize: 20 }}>{this.state.name}</AppText>
            </View>

            {/* 3 */}
            <View style={{ paddingTop: 10 }}>
              <AppText style={{ fontSize: 20 }}>
                {this.state.availableQty}
              </AppText>
            </View>

            {/* 4 */}
            <View style={{ paddingRight: 20, paddingTop: 10 }}>
              <Image
                source={require("../assets/criticalItemsCard/right-arrow.png")}
                style={styles.showStyles}
              />
            </View>
            {/* row end */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    alignItems: "center",

    borderRadius: 3,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  imageStyle: {
    width: 60,
    height: 60,
    borderRadius: 13,
  },
  fullRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 10,
  },
  showStyles: {
    width: 40,
    height: 40,
  },
  shadowContainer: {
    width: "95%",
  },
});
