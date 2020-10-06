import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput, Button, Image } from "react-native";
import constants from "../utils/constants";
import { AwesomeTextInput } from "react-native-awesome-text-input";
import colors from "../config/colors";
import AppText from "../common/AppText";
import AppButton from "../common/AppButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const axios = require("axios").default;

export default class LoginComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsername = (text) => {
    this.setState({ username: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };
  handleLogin = () => {
    // axios
    //   .post(constants.ipAddress + "/siteManager/login", {
    //     username: this.state.username,
    //     password: this.state.password,
    //   })
    //   .then(function (response) {
    //     console.log(response.data.isFound);
    //     if (response.data.isFound == "true") {
    //       alert("User found");
    //       // this.props.navigation.navigate("MainDashboardScreen");
    //       this.props.navigation.navigate("MainDashboardScreen");
    //     } else {
    //       alert("User not found");
    //     }
    //   })
    //   .catch(function (error) {
    //     alert("error occurred -" + error);
    //   });

    this.props.navigation.navigate("MainDashboardScreen");
  };

  render() {
    return (
      <View>
        <View style={styles.logoImageContainer}>
          <Image
            source={require("../assets/login/logo.png")}
            style={styles.logoImageStyle}
          />
        </View>

        <View style={styles.fullContainer}>
          <View style={styles.userNameFullContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/login/usernameIcon.png")}
                style={styles.iconStyle}
              />
            </View>
            <View style={styles.usernameContainer}>
              <AwesomeTextInput
                label="Username"
                onChangeText={this.handleUsername}
                customStyles={{
                  container: {
                    borderWidth: 1,
                    borderColor: "grey",
                    borderRadius: 10,
                  },
                  title: {
                    backgroundColor: colors.light,
                  },
                }}
              />
            </View>
          </View>

          <AppText></AppText>

          <View style={styles.passwordFullContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/login/passwordIcon.png")}
                style={styles.iconStyle}
              />
            </View>
            <View style={styles.passwordContainer}>
              <AwesomeTextInput
                label="Password"
                onChangeText={this.handlePassword}
                secureTextEntry={true}
                customStyles={{
                  container: {
                    borderWidth: 1,
                    borderColor: "grey",
                    borderRadius: 10,
                  },
                  title: {
                    backgroundColor: colors.light,
                  },
                }}
              />
            </View>
          </View>
        </View>

        {/* <Button
          style={{ width: "70%" }}
          color={colors.primary}
          title={"Login"}
          onPress={this.handleLogin}
        /> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <AppButton
              widht="70%"
              title="Login"
              color="primary"
              onPress={this.handleLogin}
            />
          </TouchableOpacity>
        </View>
        {/* () => this.props.navigation.navigate("MainDashboardScreen") */}

        <View style={styles.forgotPasswordContainer}>
          <AppText style={styles.forgotPasswordTxt}>Forgot Password</AppText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  usernameContainer: {
    width: "80%",
  },

  logoImageContainer: {
    alignItems: "center",
    paddingTop: "40%",
  },
  logoImageStyle: {
    width: 200,
    height: 200,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  iconContainer: {
    padding: 10,
  },
  userNameFullContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  //
  passwordFullContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  passwordContainer: {
    width: "80%",
  },
  fullContainer: {
    marginTop: "30%",
  },
  buttonContainer: {
    paddingLeft: "20%",
    paddingTop: "5%",
  },
  forgotPasswordContainer: {
    marginTop: "5%",
    alignItems: "center",
  },
  forgotPasswordTxt: {
    fontSize: 14,
  },
});
