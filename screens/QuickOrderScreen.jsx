import React, { Component } from "react";
import { Text, StyleSheet, View, Alert, Image } from "react-native";
import Screen from "../components/Screen";
import AppText from "../common/AppText";
import QuickOrderCard from "../components/QuickOrderCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import constants from "../utils/constants";
const axios = require("axios").default;


export default class QuickOrderScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      allItems:[],
      loggedUser:"",
      isloading:false
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress(txt) {

this.props.navigation.navigate("PlaceOrderScreen",{itemObjId:txt, loggedUser:"aaa"});

  }

  componentDidMount(){

    this.setState({ isloading: true });

    if(this.props.route.params == undefined){
      this.setState({loggedUser:"aaa"});
    }else{
      this.setState({
        loggedUser: this.props.route.params.loggedUser
      }, () => {
          console.log(this.state.loggedUser);
      });
    }


    axios
    .get(constants.ipAddress + "/item/")
    .then(
      function (response) {
             
    this.setState({
      allItems: response.data
      }, () => {
        this.setState({ isloading: false });
      });

      }.bind(this)
    )
    .catch(
      function (error) {
        console.log("error occurred -" + error);
        this.setState({ isloading: false });
      }.bind(this)
    );
  }

  render() {
    return (
      <Screen navigation={this.props.navigation}>
        <View>
              <View style={styles.QuickOrderViewContainer}>
                <AppText style={styles.QuickOrderTxt}>Quick Order</AppText>
              </View>

              {/* <View style={{ flex: 1 }}> */}
              <View>

              {this.state.isloading == true && 
                <View style={styles.loadingContainer}>
                <Image
                  source={require("../assets/quickOrder/loading.gif")}
                  style={styles.loadingImg}
                />
                </View>
              }

               
                <ScrollView>
                  
                {this.state.isloading == false && 
                  this.state.allItems.map((item) =>
                      
                    <TouchableOpacity  onPress={() => this.onPress(item._id)}>
                      <QuickOrderCard 
                      key={item._id}
                      name={item.itemName} 
                      photoPath={item.photoURL21} />
                    </TouchableOpacity>
                  )  
                }

              
                </ScrollView>
              </View>
            
            

        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  QuickOrderViewContainer:{
    alignItems:"center",
    padding: 20,
  },
  QuickOrderTxt:{
    fontSize:22,
    fontWeight:"bold"
  },
  loadingContainer:{
alignItems:"center",
paddingTop:50
  },
  loadingImg:{
    width:100,
    height:100    
  }
});
