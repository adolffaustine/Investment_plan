// screens/Account.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Font from '../hooks/font'; // Adjust path if needed
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons'; // Import icons

// --- Placeholder Data (Replace with actual user data later) ---
const userData = {
  name: 'Adolf Example', // Using a placeholder name
  email: 'adolf.example@email.com',
  profilePicUrl: 'https://via.placeholder.com/100/31A063/FFFFFF?text=AE', // Placeholder image with initials
  portfolioValue: 15230.75, // Example portfolio value
};
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

// Helper to format currency (copied from InvestmentPlan.js)
const formatCurrency = (amount) => {
  return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};

const Account = ({ navigation }) => {
  // --- Placeholder Action Handlers ---
  const handleEditProfile = () => {
    Alert.alert('Navigate', 'Go to Edit Profile Screen (Not Implemented)');
    // navigation.navigate('EditProfile');
  };

  const handleSettings = () => {
    Alert.alert('Navigate', 'Go to Settings Screen (Not Implemented)');
    // navigation.navigate('Settings');
  };

  const handleSecurity = () => {
    Alert.alert('Navigate', 'Go to Security Screen (Not Implemented)');
    // navigation.navigate('Security');
  };

  const handleHelp = () => {
    Alert.alert('Navigate', 'Go to Help/Support Screen (Not Implemented)');
    // navigation.navigate('Help');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: () => {
            console.log('Logout Action Triggered');
            // Add actual logout logic here (e.g., clear auth tokens, navigate to Login screen)
            // navigation.navigate('Login');
          },
          style: 'destructive',
        },
      ]
    );
  };
  // --- --- --- --- --- --- --- --- ---

  // --- Reusable Menu Item Component ---
  const MenuItem = ({ iconName, iconType, label, onPress }) => {
    const IconComponent = iconType === 'Ionicons' ? Ionicons : Feather; // Choose icon library
    return (
      <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.6}>
        <View style={styles.menuItemContent}>
          <IconComponent name={iconName} size={22} color="#5A6470" style={styles.menuIcon} />
          <Font style={styles.menuLabel}>{label}</Font>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#B0B0B0" />
      </TouchableOpacity>
    );
  };
  // --- --- --- --- --- --- --- --- ---

  return (
    <ScrollView style={styles.container}>
      {/* --- Header Section --- */}
      <View style={styles.header}>
        <Image source={{ uri: userData.profilePicUrl }} style={styles.profilePic} />
        <Font size={22} weight="bold" style={styles.userName}>{userData.name}</Font>
        <Font size={16} color="#5A6470" style={styles.userEmail}>{userData.email}</Font>
        <View style={styles.portfolioValueContainer}>
          <Font size={14} color="#5A6470">Total Portfolio Value</Font>
          <Font size={24} weight="bold" color="#31A063">{formatCurrency(userData.portfolioValue)}</Font>
        </View>
      </View>

      {/* --- Menu Section --- */}
      <View style={styles.menuContainer}>
        <MenuItem
          iconType="Feather"
          iconName="user"
          label="Edit Profile"
          onPress={handleEditProfile}
        />
        <MenuItem
          iconType="Ionicons"
          iconName="settings-outline"
          label="Settings"
          onPress={handleSettings}
        />
        <MenuItem
          iconType="Feather"
          iconName="shield"
          label="Security"
          onPress={handleSecurity}
        />
        <MenuItem
          iconType="Feather"
          iconName="help-circle"
          label="Help & Support"
          onPress={handleHelp}
        />
      </View>

      {/* --- Logout Button Section --- */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Feather name="log-out" size={20} color="#E74C3C" style={styles.logoutIcon} />
          <Font style={styles.logoutText} weight="medium">Logout</Font>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8', // Consistent background
  },
  // --- Header Styles ---
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: '#E0E0E0', // Placeholder bg
  },
  userName: {
    color: '#1C2026',
    marginBottom: 5,
  },
  userEmail: {
    marginBottom: 20,
  },
  portfolioValueContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  // --- Menu Styles ---
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden', // Clip items to rounded corners
    elevation: 1,
    shadowColor: "#405060",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
    width: 24, // Ensure consistent icon alignment
    textAlign: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: '#333',
  },
  // --- Logout Styles ---
  logoutContainer: {
    marginTop: 40,
    marginBottom: 40, // Add space at the bottom
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background like menu
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 1, // Subtle shadow
    shadowColor: "#E74C3C", // Reddish shadow hint
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#F5D7D7', // Light red border
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#E74C3C', // Red color for logout
  },
});

export default Account;
