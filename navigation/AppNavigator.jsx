import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import routes from "./routes";

import { AntDesign } from "@expo/vector-icons";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";

import MainDashboardScreen from "../screens/MainDashboardScreen";
import StocksScreen from "../screens/StocksScreen";
import QuickOrderScreen from "../screens/QuickOrderScreen";
import OrderStatusScreen from "../screens/OrderStatusScreen";
import PurchaseHistoryScreen from "../screens/PurchaseHistoryScreen";
import PaymentsScreen from "../screens/PaymentsScreen";
import ViewPercentageScreen from "../screens/ViewPercentageScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import RequestOrOrderScreen from "../screens/RequestOrOrderScreen";
import LoadingNavigtor from "./LoadingNavigator";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={routes.LoadingScreen}
        drawerLockMode="locked-closed"
        drawerType="front"
      >
        <Drawer.Screen
          name={routes.MainDashboardScreen}
          component={LoadingNavigtor}
          options={{
            title: "Home",
            drawerIcon: ({ focused, size }) => (
              <Feather name="home" size={24} />
            ),
          }}
        />

        <Drawer.Screen
          name={routes.StocksScreen}
          component={StocksScreen}
          options={{
            title: "Stocks",
            drawerIcon: ({ focused, size }) => (
              <Feather name="package" size={24} />
            ),
          }}
        />
        <Drawer.Screen
          name={routes.QuickOrderScreen}
          component={QuickOrderScreen}
          options={{
            title: "Quick Order",
            drawerIcon: ({ focused, size }) => (
              <Feather name="shopping-cart" size={24} />
            ),
          }}
        />
        <Drawer.Screen
          name={routes.OrderStatusScreen}
          component={OrderStatusScreen}
          options={{
            title: "Order Status",
            drawerIcon: ({ focused, size }) => (
              <Feather name="check-circle" size={24} />
            ),
          }}
        />
        <Drawer.Screen
          name={routes.PurchaseHistoryScreen}
          component={PurchaseHistoryScreen}
          options={{
            title: "Purchase History",
            drawerIcon: ({ focused, size }) => (
              <Feather name="calendar" size={24} />
            ),
          }}
        />
        <Drawer.Screen
          name={routes.PaymentsScreen}
          component={PaymentsScreen}
          options={{
            title: "Payments",
            drawerIcon: ({ focused, size }) => (
              <Feather name="dollar-sign" size={24} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
