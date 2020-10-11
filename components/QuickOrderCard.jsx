import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ImageBackground } from 'react-native'
import AppText from '../common/AppText';
import colors from "../config/colors";

export default class QuickOrderCard extends Component {

    render() {
        return (
    

                    <View style={styles.fullContainerStyles}>
                        <View style={styles.cardShadow}>
                            <View style={styles.cardContainer}>


                                <ImageBackground
                                    style={{ width: "100%", height: 150 }}
                                    imageStyle={{ borderRadius: 16}}
                                    source={ this.props.photoPath ? { uri: this.props.photoPath }  : null }>

                                <View
                                    style={{
                                    position: "absolute",
                                    top: 20,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: 'center', 
                                    alignItems: 'center' 
                                    }}
                                >
                                    <AppText style={styles.centerTitle}>
                                    {" "+this.props.name+" "}
                                    </AppText>
                                </View>

                                </ImageBackground>


                             </View>
                         </View>
                     </View>


        )
    }
}

const styles = StyleSheet.create({
    centerTitle: {
        fontWeight: "bold",
        fontSize: 30,
        color: "black",
        backgroundColor:"#c9c9c9",
        borderRadius:10
      },
      cardShadow: {
        width:"93%",
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
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
       fullContainerStyles:{
        paddingLeft:10, 
        paddingRight:10, 
        paddingTop:15,
        paddingBottom:15, 
        alignItems:"center"
       }
})
