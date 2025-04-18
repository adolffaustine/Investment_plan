import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView, // Added for better handling if content overflows
  Alert, // Added for simple feedback on submit
} from "react-native";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import Font from "../hooks/font"; // Assuming Font component handles text styling

const CreateInvestment = ({ navigation }) => {
  // --- State Hooks for Inputs ---
  const [savingsPerMonth, setSavingsPerMonth] = useState("");
  const [investmentCategory, setInvestmentCategory] = useState("");
  const [investmentHorizon, setInvestmentHorizon] = useState("");

  // --- Handle Submission ---
  const handleSubmit = () => {
    // Basic validation (can be expanded)
    if (!savingsPerMonth || !investmentCategory || !investmentHorizon) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    // --- Placeholder for actual submission logic ---
    // Here you would typically:
    // 1. Validate the data more thoroughly
    // 2. Send the data to an API or save it locally
    // 3. Navigate upon success
    console.log("Submitting Plan:", {
      savings: savingsPerMonth,
      category: investmentCategory,
      horizon: investmentHorizon,
    });

    Alert.alert(
      "Plan Submitted (Placeholder)",
      `Savings: ${savingsPerMonth}/month\nCategory: ${investmentCategory}\nHorizon: ${investmentHorizon} years`
    );

    // Navigate after submission (optional, maybe navigate to a confirmation screen first)
    navigation.navigate("Homes");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.top}>
            <Font size={34} weight={"bold"}>
              Welcome Adolf
            </Font>
            <Font size={30} weight={"bold"}>
              Income Details
            </Font>
          </View>

          <View style={styles.subtext}>
            <Font size={17} color={"#4F4F4F"}>
              Invest and double your income now
            </Font>
          </View>

          {/* --- Input Fields with Labels --- */}
          <View style={styles.inputGroup}>
            <Font style={styles.label} weight={"medium"} size={16}>
              Total Savings per Month ($)
            </Font>
            <Input
              holder={"e.g., 500"}
              value={savingsPerMonth}
              onChangeText={setSavingsPerMonth}
              keyboardType="numeric" // Use numeric keyboard for amounts
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Font style={styles.label} weight={"medium"} size={16}>
              Primary Investment Category
            </Font>
            <Input
              holder={"e.g., Stocks, Real Estate, Crypto"} // More descriptive placeholder
              value={investmentCategory}
              onChangeText={setInvestmentCategory}
              autoCapitalize="words" // Capitalize category names
              autoCorrect={false}
              // keyboardType="default" // Removed incorrect email type
            />
          </View>

          <View style={styles.inputGroup}>
            <Font style={styles.label} weight={"medium"} size={16}>
              Investment Horizon (Years)
            </Font>
            <Input
              holder={"e.g., 5"}
              value={investmentHorizon}
              onChangeText={setInvestmentHorizon}
              keyboardType="numeric" // Use numeric keyboard for years
              autoCapitalize="none"
              autoCorrect={false}
              // secureTextEntry={false} // Removed incorrect secure text entry
            />
          </View>

          {/* --- Submit Button --- */}
          <TouchableOpacity
            activeOpacity={0.7} // Slightly higher opacity for better feedback
            onPress={handleSubmit} // Call the submit handler
            style={styles.buttonContainer}
          >
            <CustomButton title={"Create Plan"} /> {/* Changed title slightly */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures content can scroll if needed
    justifyContent: "center", // Centers content vertically if it doesn't fill screen
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20, // Add some horizontal padding
    paddingBottom: 30, // Add padding at the bottom
  },
  top: {
    alignItems: "center",
    marginTop: 50, // Adjust as needed
    marginBottom: 15, // Reduced margin
  },
  subtext: {
    marginBottom: 40, // Adjusted margin
    alignItems: "center",
    paddingHorizontal: 10, // Padding for subtext if it wraps
  },
  inputGroup: {
    width: "90%", // Make input groups take up most of the width
    marginBottom: 25, // Space between input groups
  },
  label: {
    marginBottom: 8, // Space between label and input
    color: "#333", // Darker label color for contrast
  },
  buttonContainer: {
    width: "90%", // Make button consistent with input width
    marginTop: 20, // Space above the button
  },
  // Removed redundant styles like email, password as inputGroup handles spacing
});

export default CreateInvestment;
