// import React from "react";
// import {  View,Text } from "react-native";

// export default function Header({ navigation, title, goBack }) {
//   return (
//     <View >
//       <Text>Proc</Text>
//     </View>
//   );
// }

import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import colors from "../config/colors";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../common/AppText";

const iconSize = 20;
const iconColor = colors.white;

export default function Header({ navigation, title, goBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.navLogo}>
        {goBack ? (
          <Ionicons
            name="ios-arrow-round-back"
            size={iconSize + 15}
            color={iconColor}
            style={styles.icon}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <Feather
            name="menu"
            style={styles.icon}
            size={30}
            color={iconColor}
            onPress={() => navigation.openDrawer()}
          />
        )}
        <AppText style={styles.title}>
          {title ? title : <React.Fragment>Procura</React.Fragment>}
        </AppText>
      </View>
      {/* <View style={styles.navSideIcons}>
        <MaterialCommunityIcons
          name="chat-outline"
          size={iconSize}
          color={iconColor}
        />
        <AntDesign name="bells" size={iconSize} color={iconColor} />
        <Entypo name="dots-three-vertical" size={iconSize} color={iconColor} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  icon: {
    left: 20,
    height: "100%",
  },
  title: {
    height: "100%",
    color: colors.white,
    fontSize: 22,
    marginLeft: 50,
  },
  navSideIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "30%",
  },
  navLogo: {
    display: "flex",
    flexDirection: "row",
  },
});
