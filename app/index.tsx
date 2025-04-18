import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, Text } from "react-native";
import { registerRootComponent } from "expo";

import SafeViewAndroid from "../components/SafeViewAndroid";
import SignUp from "../screens/signUp";
import App from "../main";
import CreateAccount from "../screens/createAccount";
import Login from "../screens/login";
import CreateInvestment from "../screens/createInvestment";
import InvestmentPlan from "../screens/InvestmentPlan"

const Stack = createStackNavigator();

const Onboard = ({ navigation }) => {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <SignUp navigation={navigation} />
    </SafeAreaView>
  );
};

function Main() {
  return (
    
      <Stack.Navigator>
        <Stack.Screen 
          name="Sign Up" 
          component={Onboard} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Account" 
          component={CreateAccount} 
          options={{ headerTitle: "Create Account", headerShown: true }} 
        />
        <Stack.Screen 
          name="Homes" 
          component={App} 
          options={{ headerTitle: "Welcome Home", headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerTitle: "Login", headerShown: true }} 
        />
        <Stack.Screen
          name="CreateInvestments"
          component={CreateInvestment}
          options={{ headerTitle: "Financial Income Details", headerShown: true}}

        />
        <Stack.Screen
          name="InvestmentPlan"
          component={InvestmentPlan}
          options={{ headerTitle: "Investment Plan", headerShown: true}}

        />
      </Stack.Navigator>

  );
}

export default Main;

registerRootComponent(Main);
