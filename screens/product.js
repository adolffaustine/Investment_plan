// screens/Product.js
import React, { useMemo } from "react"; // Removed unused hooks
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import Font from "../hooks/font";
import CategorySection from '../screens/CategorySection'; // Import the new component

// --- Placeholder Data ---
const aiSuggestions = [
    // ... (keep existing data)
    {
        id: "agri001",
        name: "Sustainable Cocoa Farming Initiative",
        category: "Agriculture",
        trendIcon: "arrow-up-circle-outline",
        trendText: "Strong Growth Potential",
        profitability: "+15% Est. Annual Return",
        reason: "Rising demand for ethical chocolate, climate-resilient practices.",
        imageUrl: "https://via.placeholder.com/150/92c952/ffffff?text=Cocoa",
      },
      {
        id: "stock001",
        name: "Global Tech ETF (GTE)",
        category: "Stocks",
        trendIcon: "trending-up",
        trendText: "Positive Momentum",
        profitability: "+12% Projected (1yr)",
        reason: "Diversified exposure to leading technology companies worldwide.",
        imageUrl: "https://via.placeholder.com/150/4287f5/ffffff?text=Tech+ETF",
      },
      {
        id: "re001",
        name: "Urban Logistics Warehouses",
        category: "Real Estate",
        trendIcon: "arrow-top-right-thick",
        trendText: "High Demand",
        profitability: "7% Cap Rate (Est.)",
        reason: "E-commerce boom driving need for last-mile delivery hubs.",
        imageUrl: "https://via.placeholder.com/150/f5a623/ffffff?text=Warehouse",
      },
      {
        id: "agri002",
        name: "Vertical Farming Technology",
        category: "Agriculture",
        trendIcon: "rocket-launch-outline",
        trendText: "Emerging Opportunity",
        profitability: "High Risk / High Reward",
        reason: "Addresses food security in urban areas, resource efficient.",
        imageUrl: "https://via.placeholder.com/150/7ed321/ffffff?text=Vertical+Farm",
      },
      {
        id: "stock002",
        name: "Dividend Aristocrats Fund",
        category: "Stocks",
        trendIcon: "shield-check-outline",
        trendText: "Stable Income",
        profitability: "~4% Dividend Yield",
        reason: "Focuses on companies with long history of increasing dividends.",
        imageUrl: "https://via.placeholder.com/150/bd10e0/ffffff?text=Dividends",
      },
      {
        id: "re002",
        name: "Multi-Family Residential REIT",
        category: "Real Estate",
        trendIcon: "home-group",
        trendText: "Consistent Demand",
        profitability: "5-6% Yield + Appreciation",
        reason: "Ongoing need for housing, potential for rent growth.",
        imageUrl: "https://via.placeholder.com/150/d0021b/ffffff?text=REIT",
      },
      {
        id: "stock003",
        name: "Renewable Energy Index Fund",
        category: "Stocks",
        trendIcon: "leaf",
        trendText: "Long-Term Growth",
        profitability: "Variable / Growth Focused",
        reason: "Global shift towards sustainable energy sources.",
        imageUrl: "https://via.placeholder.com/150/50e3c2/ffffff?text=Renewables",
      },
];
// --- --- --- --- --- ---

// No longer need card widths or margins defined here

const Product = ({ navigation }) => {

  const groupedSuggestions = useMemo(() => {
    // ... (grouping logic remains the same)
    return aiSuggestions.reduce((acc, suggestion) => {
      const category = suggestion.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(suggestion);
      return acc;
    }, {});
  }, []);

  const handleProductPress = (product) => {
    Alert.alert("View Product Details", `Displaying details for: ${product.name}`);
    // navigation.navigate('ProductDetail', { productId: product.id, productData: product });
  };

  const categoryOrder = ["Stocks", "Agriculture", "Real Estate"];

  // --- Removed refs and state specific to Stocks ---

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Font size={28} weight={"bold"} style={styles.title}>
            Trends In Investment
          </Font>
          <Font size={16} color={"#444"} style={styles.subtitle}>
            Top trending opportunities in investment
          </Font>
        </View>

        {/* --- Category Sections --- */}
        {categoryOrder.map((category) => {
          const items = groupedSuggestions[category];
          if (!items || items.length === 0) return null;

          // --- Use the CategorySection component ---
          return (
            <CategorySection
              key={category}
              category={category}
              items={items}
              onPressItem={handleProductPress} // Pass the handler
            />
          );
        })}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

// --- Styles for Product.js (Simplified) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  title: {
    marginBottom: 5,
    color: '#1C2026',
    textAlign: 'center',
    fontSize: 28, // Ensure Font component uses this
    fontWeight: 'bold', // Ensure Font component uses this
  },
  subtitle: {
    color: '#5A6470',
    textAlign: 'center',
    fontSize: 16, // Ensure Font component uses this
  },
  // Removed styles related to arrows, specific card widths, etc.
  // They are now handled within CategorySection.js
});

export default Product;
