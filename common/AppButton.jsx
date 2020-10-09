import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";

export default function AppButton({
  title,
  onPress,
  color,
  opacity,
  icon,
  iconColor,
}) {
  const buttonIcon = () => (
    <MaterialCommunityIcons
      name={icon}
      size={25}
      color={colors[iconColor]}
      style={styles.icon}
    />
  );

  const buttonText = () => <AppText style={styles.txt}>{title}</AppText>;

  return (
    <React.Fragment>
      {opacity ? (
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors[color] }]}
          onPress={onPress}
        >
          {icon && buttonIcon()}
          {buttonText()}
        </TouchableOpacity>
      ) : (
          <TouchableNativeFeedback
            style={[styles.btn, { backgroundColor: colors[color] }]}
            onPress={onPress}
          >
            {icon && buttonIcon()}
            {buttonText()}
          </TouchableNativeFeedback>
        )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "80%",
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
  },
  txt: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  icon: {
    paddingHorizontal: 10,
  },
});
