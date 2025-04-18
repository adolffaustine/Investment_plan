// screens/Transaction.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Image, // For implementer profile pic
} from 'react-native';
import Font from '../hooks/font'; // Adjust path if needed
import CustomButton from '../components/CustomButton'; // Assuming you have this
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'; // Import icons

// --- Placeholder Data (Combine user balance and plan details) ---
const userData = {
  availableBalance: 5000.00, // Example available balance
};

// Reuse plan data structure from InvestmentPlan.js
const planData = {
  availableAmount: 10000.00, // This might be the target amount for the plan, not current balance
  category: "Balanced Growth Portfolio (AI Suggested)",
  years: 5,
  timeToProfitEst: "6-12 Months",
  approxProfit: 2500.00,
  totalAmountEst: 12500.00,
};

// Placeholder for AI-suggested implementer
const aiSuggestedImplementer = {
  id: 'user123',
  name: 'Expert Investor Alice',
  profilePicUrl: 'https://via.placeholder.com/80/8E44AD/FFFFFF?text=AI', // Placeholder pic
  rating: 4.8, // Example rating
};
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

// Helper to format currency
const formatCurrency = (amount) => {
  if (isNaN(amount) || amount === null) return '$0.00';
  return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};

const Transaction = ({ navigation }) => {
  const [amountToAllocate, setAmountToAllocate] = useState('');

  // --- Action Handler: Allocate Funds for Self-Implementation ---
  const handleAllocateSelf = () => {
    Keyboard.dismiss();
    const numericAmount = parseFloat(amountToAllocate);

    // Validation
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid positive amount to allocate.');
      return;
    }
    if (numericAmount > userData.availableBalance) {
      Alert.alert('Insufficient Funds', `Your available balance is only ${formatCurrency(userData.availableBalance)}.`);
      return;
    }

    // Confirmation
    Alert.alert(
      'Confirm Allocation',
      `Allocate ${formatCurrency(numericAmount)} from your available balance to start implementing your investment plan?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Allocate',
          onPress: () => {
            console.log('Allocating Funds for Self:', {
              amount: numericAmount,
              planCategory: planData.category, // Include plan context
            });
            // --- TODO: Add actual API call / allocation logic ---
            // 1. Call backend to move funds from 'available' to 'invested/allocated'.
            // 2. Update user balance state.
            // 3. Potentially trigger plan implementation steps.
            // 4. Show success message.
            // 5. Clear amount field.
            Alert.alert('Success (Placeholder)', `${formatCurrency(numericAmount)} allocated successfully.`);
            setAmountToAllocate('');
          },
        },
      ]
    );
  };

  // --- Action Handler: Share Plan with Implementer ---
  const handleSharePlan = () => {
    Keyboard.dismiss();
    if (!aiSuggestedImplementer) {
        Alert.alert("No Implementer", "No suggested implementer found.");
        return;
    }

    // Confirmation
    Alert.alert(
      'Confirm Plan Sharing',
      `Share the details of your "${planData.category}" plan with ${aiSuggestedImplementer.name}? \n\n(This does NOT send funds yet.)`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Share Plan',
          onPress: () => {
            console.log('Sharing Plan Details:', {
              implementerId: aiSuggestedImplementer.id,
              implementerName: aiSuggestedImplementer.name,
              planDetails: planData, // Send relevant plan details
            });
            // --- TODO: Add actual API call / sharing logic ---
            // 1. Call backend to create a notification/request for the implementer.
            // 2. Include necessary plan details.
            // 3. Maybe update UI state to show "Plan Shared" or similar.
            // 4. Show success message.
            Alert.alert('Success (Placeholder)', `Plan shared with ${aiSuggestedImplementer.name}. They will be notified.`);
          },
        },
      ]
    );
  };
  // --- --- --- --- --- ---

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Font size={26} weight="bold" style={styles.title}>
            Plan Implementation
          </Font>
          <Font size={16} color="#5A6470" style={styles.subtitle}>
            Allocate funds or share your plan
          </Font>
        </View>

        {/* --- Available Balance --- */}
        <View style={styles.balanceContainer}>
          <Font size={15} color="#5A6470">Available Balance</Font>
          <Font size={28} weight="bold" color="#31A063">{formatCurrency(userData.availableBalance)}</Font>
        </View>

        {/* --- Current Plan Summary --- */}
        <View style={styles.sectionContainer}>
            <Font style={styles.sectionTitle} weight="medium">Your Current Plan</Font>
            <View style={styles.planSummary}>
                <View style={styles.planDetailRow}>
                    <Font style={styles.planLabel}>Category:</Font>
                    <Font style={styles.planValue} numberOfLines={1}>{planData.category}</Font>
                </View>
                <View style={styles.planDetailRow}>
                    <Font style={styles.planLabel}>Horizon:</Font>
                    <Font style={styles.planValue}>{planData.years} Years</Font>
                </View>
                <View style={styles.planDetailRow}>
                    <Font style={styles.planLabel}>Est. Profit:</Font>
                    <Font style={[styles.planValue, styles.profitValue]}>{formatCurrency(planData.approxProfit)}</Font>
                </View>
                 <TouchableOpacity onPress={() => navigation.navigate('InvestmentPlan')} /* Navigate to full plan */>
                    <Font style={styles.viewPlanLink}>View Full Plan Details</Font>
                 </TouchableOpacity>
            </View>
        </View>

        {/* --- Section 1: Implement Myself --- */}
        <View style={styles.sectionContainer}>
          <Font style={styles.sectionTitle} weight="medium">Implement Plan Myself</Font>
          <View style={styles.actionBox}>
            <Font style={styles.actionDescription}>Allocate funds from your balance to start this plan.</Font>
            {/* Amount Input */}
            <View style={styles.inputGroup}>
              <Font style={styles.label} weight="medium">Amount to Allocate</Font>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="currency-usd" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  value={amountToAllocate}
                  onChangeText={setAmountToAllocate}
                  keyboardType="numeric"
                />
              </View>
            </View>
            {/* Allocate Button */}
            <View style={styles.buttonWrapper}>
              <CustomButton title="Allocate Funds" onPress={handleAllocateSelf} />
            </View>
          </View>
        </View>

        {/* --- Section 2: Share with Implementer --- */}
        <View style={styles.sectionContainer}>
          <Font style={styles.sectionTitle} weight="medium">Find an Implementer</Font>
          <View style={styles.actionBox}>
            <Font style={styles.actionDescription}>Share your plan with an expert suggested by AI.</Font>
            {aiSuggestedImplementer ? (
              <View style={styles.implementerBox}>
                <Image source={{ uri: aiSuggestedImplementer.profilePicUrl }} style={styles.implementerPic} />
                <View style={styles.implementerInfo}>
                    <Font weight="bold" style={styles.implementerName}>{aiSuggestedImplementer.name}</Font>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#F1C40F" />
                        <Font style={styles.implementerRating}> {aiSuggestedImplementer.rating} / 5.0</Font>
                    </View>
                </View>
                {/* Share Button */}
                <View style={[styles.buttonWrapper, styles.sharebuttonWrapper]}>
                    <CustomButton
                        title={`Share Plan`}
                        onPress={handleSharePlan}
                        type="SECONDARY" // Use secondary style if available
                    />
                </View>
              </View>
            ) : (
              <Text style={styles.noImplementerText}>No implementer suggestions available right now.</Text>
            )}
          </View>
        </View>

      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  title: {
    color: '#1C2026',
    marginBottom: 5,
  },
  subtitle: {
    color: '#5A6470',
  },
  balanceContainer: {
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: '#FFFFFF',
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#405060",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionContainer: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 10,
    marginLeft: 5, // Slight indent for section title
  },
  planSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    elevation: 1,
    shadowColor: "#405060",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  planDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 2,
  },
  planLabel: {
    fontSize: 15,
    color: '#5A6470',
  },
  planValue: {
    fontSize: 15,
    color: '#1C2026',
    fontWeight: '500',
    textAlign: 'right',
    flexShrink: 1, // Allow text to shrink
    paddingLeft: 10,
  },
  profitValue: {
      color: '#27AE60', // Green for profit
      fontWeight: 'bold',
  },
  viewPlanLink: {
      color: '#3498DB',
      marginTop: 10,
      textAlign: 'center',
      fontSize: 15,
      fontWeight: '500',
  },
  actionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    elevation: 1,
    shadowColor: "#405060",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionDescription: {
    fontSize: 14,
    color: '#5A6470',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#5A6470',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDE2E7',
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1C2026',
  },
  buttonWrapper: {
    marginTop: 10, // Space above button within the action box
  },
  sharebuttonWrapper: {
    flex: 1, // Allow button to take space
    marginLeft: 15, // Space between info and button
  },
  implementerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // Slightly different background
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  implementerPic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  implementerInfo: {
    flex: 2, // Allow info to take more space
  },
  implementerName: {
    fontSize: 16,
    color: '#1C2026',
  },
  ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
  },
  implementerRating: {
    fontSize: 14,
    color: '#5A6470',
    marginLeft: 4,
  },
  noImplementerText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default Transaction;
