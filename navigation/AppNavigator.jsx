import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import routes from "./routes";

import HomeNavigator from "./HomeNavigator";

import { AntDesign } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={routes.Home}
        drawerLockMode="locked-closed"
        drawerType="front"
      >
        <Drawer.Screen
          name={routes.MainDashboardScreen}
          component={HomeNavigator}
          options={{
            title: "Home",
            drawerIcon: ({ focused, size }) => (
              <Feather name="home" size={24} />
            ),
          }}
        />

        <Drawer.Screen
          name={routes.StocksScreen}
          component={HomeNavigator}
          options={{
            title: "Stocks",
            drawerIcon: ({ focused, size }) => (
              <Feather name="package" size={24} />
            ),
          }}
        />
        <Drawer.Screen
          name={routes.QuickOrderScreen}
          component={HomeNavigator}
          options={{
            title: "Quick Order",
            drawerIcon: ({ focused, size }) => (
              <Feather name="shopping-cart" size={24} />
            ),
          }}
        />
        <Drawer.Screen
          name={routes.OrderStatusScreen}
          component={HomeNavigator}
          options={{
            title: "Order Status",
            drawerIcon: ({ focused, size }) => (
              <Feather name="check-circle" size={24} />
            ),
          }}
        />
        <Drawer.Screen
          name={routes.PurchaseHistoryScreen}
          component={HomeNavigator}
          options={{
            title: "Purchase History",
            drawerIcon: ({ focused, size }) => (
              <Feather name="calendar" size={24} />
            ),
          }}
        />
        <Drawer.Screen
          name={routes.PaymentsScreen}
          component={HomeNavigator}
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
