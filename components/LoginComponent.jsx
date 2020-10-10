import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  Alert,
 
} from "react-native";
import constants from "../utils/constants";
import { AwesomeTextInput } from "react-native-awesome-text-input";
import colors from "../config/colors";
import AppText from "../common/AppText";
import AppButton from "../common/AppButton";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const axios = require("axios").default;

export default class LoginComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      isLoading: false,
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    // this.storeData = this.storeData(this);
  }

  handleUsername = (text) => {
    this.setState({ username: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };

  // storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('@loggedUser', "value")
  //   } catch (e) {
  //     // saving error
  //     console.log("jfyfvhnvhv",e)
  //   }
  // }
 
  
  handleLogin = () => {
    if (this.state.username == "") {
      Alert.alert("Empty", "Please fill username");
    } else if (this.state.password === "") {
      Alert.alert("Empty", "Please fill password");
    } else {
      //
      this.setState({ isLoading: true });
      axios
        .post(constants.ipAddress + "/siteManager/login", {
          username: this.state.username,
          password: this.state.password,
        })
        .then(
          function (response) {
            this.setState({ isLoading: false });
            if (response.data.isFound == "true") {
            console.log(response.data.username);

            //  AsyncStorage.setItem(
            //   'loggedUser',response.data.username
            // );
              
            // this.storeData("aa");


              this.props.navigation.navigate("MainDashboardScreen",{loggedUser: this.state.username});
            } else {
              Alert.alert("User not found", "Please check credentials");
            }
          }.bind(this)
        )
        .catch(
          function (error) {
            this.setState({ isLoading: false });
            // alert("error occurred -" + error);
            console.log(error);
          }.bind(this)
        );
      //
    }
  };

  render() {
    return (
      <View>
        <ScrollView>
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

          {this.state.isLoading && (
            <View style={styles.waitContainer}>
              <Image
                source={require("../assets/login/wait.gif")}
                style={styles.lognWaitStyle}
              />
            </View>
          )}

          <View style={styles.forgotPasswordContainer}>
            <AppText style={styles.forgotPasswordTxt}>Forgot Password</AppText>
          </View>
        </ScrollView>
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
    marginTop: "1%",
    alignItems: "center",
  },
  forgotPasswordTxt: {
    fontSize: 14,
  },
  lognWaitStyle: {
    width: 50,
    height: 50,
  },
  waitContainer: {
    alignItems: "center",
  },
});
