import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";
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

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.LoadingScreen} component={LoadingScreen} />
      <Stack.Screen name={routes.LoginScreen} component={LoginScreen} />
      <Stack.Screen
        name={routes.MainDashboardScreen}
        component={MainDashboardScreen}
      />

      <Stack.Screen name={routes.StocksScreen} component={StocksScreen} />
      <Stack.Screen
        name={routes.QuickOrderScreen}
        component={QuickOrderScreen}
      />

      <Stack.Screen
        name={routes.OrderStatusScreen}
        component={OrderStatusScreen}
      />
      <Stack.Screen
        name={routes.PurchaseHistoryScreen}
        component={PurchaseHistoryScreen}
      />
      <Stack.Screen
        name={routes.ViewPercentageScreen}
        component={ViewPercentageScreen}
      />
      <Stack.Screen name={routes.PaymentsScreen} component={PaymentsScreen} />
      <Stack.Screen
        name={routes.PlaceOrderScreen}
        component={PlaceOrderScreen}
      />

      <Stack.Screen
        name={routes.RequestOrOrderScreen}
        component={RequestOrOrderScreen}
      />
    </Stack.Navigator>
  );
}
