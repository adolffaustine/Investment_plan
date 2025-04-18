import React from "react";
import { View, StyleSheet, Button, SafeAreaView } from "react-native";
import SafeViewAndroid from "../SafeViewAndroid";
import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import Font from "../../hooks/font";
import Home from "../../screens/home";

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={styles.container}>
        <Home navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: "center" }}>
        <Font size={22}>My Asset</Font>
      </View>
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.toggleDrawer()}
        activeTintColor="black"
        inactiveBackgroundColor="#eee"
        activeBackgroundColor="#992"
        option={{ headerShown: true, }}
      />
      <DrawerItem
        label="Income Details"
        onPress={() => props.navigation.navigate("CreateInvestments")}
        inactiveTintColor="black"
        inactiveBackgroundColor="#fff"
        activeBackgroundColor="#992"
      />
      <DrawerItem
        label="Total Asset Portifolio"
        onPress={() => props.navigation.toggleDrawer()}
        inactiveTintColor="black"
        inactiveBackgroundColor="#fff"
        activeBackgroundColor="#992"
      />
       <DrawerItem
        label="Investment Plan"
        onPress={() => props.navigation.toggleDrawer()}
        inactiveTintColor="black"
        inactiveBackgroundColor="#fff"
        activeBackgroundColor="#992"
      />
       <DrawerItem
        label="Who fits for your Investment"
        onPress={() => props.navigation.toggleDrawer()}
        inactiveTintColor="black"
        inactiveBackgroundColor="#fff"
        activeBackgroundColor="#992"
      />
       <DrawerItem
        label="Trends in Investment"
        onPress={() => props.navigation.toggleDrawer()}
        inactiveTintColor="black"
        inactiveBackgroundColor="#fff"
        activeBackgroundColor="#992"
      />
      <Button
        title="Go somewhere"
        onPress={() => {
          props.navigation.navigate("Test");
        }}
      />
    </DrawerContentScrollView>
  );
}

function HomeDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        title: "Awesome App!!",
        headerShown: false,
        gestureEnabled: true,
        headerTitle: "Test",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "#fff",
        width: 300,
      }}
    >
      <Drawer.Screen name="Homee" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F9",
  },
});

export default HomeDrawer;
