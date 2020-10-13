import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import AppText from "../common/AppText";

export default class RequisitionSentForApprovalComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      type: "",
      maxPriceLimit: 100000,
      loaded: false,
      referenceID: "",

    };
  }

  componentDidMount() {

    this.setState({
      type : this.props.type,
      referenceID : this.props.refId
    });


    this.timeoutHandle = setTimeout(() => {
      this.setState({ loaded: true });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.requisitionContainer}>
        <View style={styles.requisitionMessageContainer}>

        {this.state.type == 'SPECIAL_APPROVAL_ONLY' && 
          <AppText style={styles.requisitionMessageTxt}>
          You have selected an item which needs a special approval. The approval has been sent
          </AppText>
        }


        {this.state.type == 'LIMIT_PRICE_ONLY' && 
          <AppText style={styles.requisitionMessageTxt}>
            To total price is above the limit of  Rs. {this.state.maxPriceLimit}/= and approvel has been sent
          </AppText>
        }


        {this.state.type == 'SPECIAL_APPROVAL_AND_LIMIT_PRICE_ONLY' && 
            <AppText style={styles.requisitionMessageTxt}>
              The total price is greater {this.state.maxPriceLimit}/= and the selected item needs special approvel. The approval has been sent
            </AppText>
        }

          
        
        
        

       
        

        </View>
        <View style={styles.tickNoticeContainer}>
          <View style={styles.tickNoticeLeftSide}>
            {/* image start */}
            <View style={styles.tickContainer}>
              {!this.state.loaded && (
                //false
                <Image
                  source={require("../assets/finish/tick.gif")}
                  style={styles.tickImageStyle}
                />
              )}

              {this.state.loaded && (
                //true
                <Image
                  source={require("../assets/finish/tickStable.jpg")}
                  style={styles.tickImageStyle}
                />
              )}
            </View>
            {/* image end */}
          </View>
          <View style={styles.tickNoticeRightSide}>
            <AppText style={styles.sentmsg}>Requisition sent</AppText>
            <AppText style={styles.sentmsg}>for approval</AppText>
          </View>
        </View>

        <View style={styles.referenceIDContainer}>
          <AppText style={styles.refIDTitletxt}>Reference ID: </AppText>
          <AppText style={styles.refIDValuetxt}>
            {this.state.referenceID}
          </AppText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tickImageStyle: {
    width: 130,
    height: 130,
  },
  tickContainer: {},
  requisitionContainer: {
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
  requisitionMessageContainer: { padding: 25 },
  requisitionMessageTxt: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  tickNoticeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  tickNoticeLeftSide: {},
  tickNoticeRightSide: {
    paddingTop: 40,
  },
  sentmsg: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  referenceIDContainer: {
    alignItems:"center",
    padding: 30,
  },
  refIDTitletxt: {
    fontSize: 18,
  },
  refIDValuetxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
