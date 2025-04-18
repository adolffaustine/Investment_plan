import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView, // Added for potential content overflow
  Alert, // For placeholder button actions
} from "react-native";
import CustomButton from "../components/CustomButton"; // Assuming you have this
import Font from "../hooks/font"; // Assuming you have this

// --- Placeholder Data (Replace with actual data source later) ---
const planData = {
  availableAmount: 10000.00,
  category: "Balanced Growth Portfolio (AI Suggested)", // Example category
  years: 5,
  timeToProfitEst: "6-12 Months", // Example estimation
  approxProfit: 2500.00, // Example profit
  totalAmountEst: 12500.00, // Example total
};
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

const InvestmentPlan = ({ navigation }) => {

  // --- Placeholder Action Handlers ---
  const handleImplementPlan = () => {
    Alert.alert(
      "Implement Plan",
      "This action would typically initiate the investment process."
    );
    // Add logic to start the investment, navigate, etc.
    // navigation.navigate('InvestmentProgress'); // Example navigation
  };

  const handleChangePlan = () => {
    Alert.alert(
      "Change Plan",
      "This action would allow the user to modify or select a different plan."
    );
    // Add logic to go back to selection/creation screen
    // navigation.navigate('PlanSelection'); // Example navigation
    // Or maybe: navigation.goBack();
  };
  // --- --- --- --- --- --- --- --- ---

  // Helper to format currency
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`; // Basic formatting
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* --- Header --- */}
        <View style={styles.top}>
          <Font size={30} weight={"bold"}>
            Your Investment Plan
          </Font>
        </View>

        <View style={styles.subtext}>
          <Font size={17} color={"#4F4F4F"}>
            Review the details of your generated plan.
          </Font>
        </View>

        {/* --- Plan Details Section --- */}
        <View style={styles.planDetailsContainer}>
          <View style={styles.detailRow}>
            <Font style={styles.detailLabel} weight={"medium"}>Available Amount:</Font>
            <Font style={styles.detailValue} weight={"bold"}>{formatCurrency(planData.availableAmount)}</Font>
          </View>

          <View style={styles.detailRow}>
            <Font style={styles.detailLabel} weight={"medium"}>Category:</Font>
            <Font style={styles.detailValue} numberOfLines={2} ellipsizeMode="tail">{planData.category}</Font>
          </View>

          <View style={styles.detailRow}>
            <Font style={styles.detailLabel} weight={"medium"}>Investment Horizon:</Font>
            <Font style={styles.detailValue}>{planData.years} Years</Font>
          </View>

          <View style={styles.detailRow}>
            <Font style={styles.detailLabel} weight={"medium"}>Est. Time to Profit:</Font>
            <Font style={styles.detailValue}>{planData.timeToProfitEst}</Font>
          </View>

          <View style={styles.detailRow}>
            <Font style={styles.detailLabel} weight={"medium"}>Est. Profit:</Font>
            <Font style={[styles.detailValue, styles.profitValue]}>
              {formatCurrency(planData.approxProfit)}
            </Font>
          </View>

          <View style={[styles.detailRow, styles.totalRow]}>
            <Font style={styles.detailLabel} weight={"bold"}>Est. Total Value:</Font>
            <Font style={[styles.detailValue, styles.totalValue]} weight={"bold"}>
              {formatCurrency(planData.totalAmountEst)}
            </Font>
          </View>
        </View>

        {/* --- Action Buttons --- */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleImplementPlan}
            style={styles.buttonWrapper}
          >
            <CustomButton title={"Implement Plan"} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleChangePlan}
            style={styles.buttonWrapper}
          >
            {/* You might want a different style for secondary actions */}
            <CustomButton title={"Change Investment Plan"} type="SECONDARY" />
            {/* Assuming CustomButton can take a type prop for styling */}
            {/* If not, use a regular Button or style it differently */}
            {/* <View style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Change Investment Plan</Text>
            </View> */}
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures content can scroll
    justifyContent: 'space-between', // Pushes buttons towards bottom if content is short
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 30, // Add padding at the bottom
  },
  top: {
    alignItems: "center",
    marginTop: 50, // Adjust as needed
    marginBottom: 10,
  },
  subtext: {
    marginBottom: 40,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  planDetailsContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9', // Light background for the details section
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
    flex: 1, // Allow label to take available space
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    flexShrink: 1, // Allow value text to shrink if needed
    paddingLeft: 10, // Add space between label and value
  },
  profitValue: {
    color: 'green', // Style profit distinctly
    fontWeight: 'bold',
  },
  totalRow: {
    borderBottomWidth: 0, // No border for the last row
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1, // Add a separator line above total
    borderTopColor: '#ddd',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005A9C', // Distinct color for total
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '100%',
    marginBottom: 15, // Space between buttons
  },
  // Example style if CustomButton doesn't support types
  // secondaryButton: {
  //   backgroundColor: '#e0e0e0', // Lighter background
  //   paddingVertical: 15,
  //   borderRadius: 25, // Match CustomButton style if possible
  //   alignItems: 'center',
  // },
  // secondaryButtonText: {
  //   color: '#333', // Darker text
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // }
});

export default InvestmentPlan;
