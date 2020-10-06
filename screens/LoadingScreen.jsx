import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import Screen from "../components/Screen";

export default class LoadingScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      progress: 0.0,
    };
  }

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.loading();
    }, 20);
  }

  loading() {
    var prg = this.state.progress;
    this.setState({
      progress: prg + 0.01,
    });
    if (this.state.progress >= 1) {
      this.props.navigation.navigate("LoginScreen");
    } else {
      this.timeoutHandle = setTimeout(() => {
        this.loading();
      }, 20);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/loading/logo.png")}
            style={styles.loadingImgStyle}
          />
        </View>

        <View style={styles.loadingProgressContainer}>
          <Image
            source={require("../assets/loading/Spinner.gif")}
            style={styles.loadingProgressImgStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingImgStyle: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: "40%",
  },
  loadingProgressImgStyle: {
    width: 100,
    height: 100,
  },
  loadingProgressContainer: {
    alignItems: "center",
    paddingTop: "50%",
  },
});
