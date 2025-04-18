// components/ProductCard.js (Example structure)
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Font from '../hooks/font'; // Adjust path

// Define SINGLE_CARD_PLACEHOLDER_IMAGE here or import it
const SINGLE_CARD_PLACEHOLDER_IMAGE = require('../assets/login.png');

const ProductCard = ({ item, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[styles.cardBase, style]} // Use base style + passed style
      activeOpacity={0.85}
    >
      <Image source={SINGLE_CARD_PLACEHOLDER_IMAGE} style={styles.cardTopImage} />
      <View style={styles.cardContent}>
        <Font style={styles.productName} weight="bold" numberOfLines={2}>{item.name}</Font>
        {/* ... other card details (metric rows, reason, etc.) ... */}
         <View style={styles.metricRow}>
           <Font style={styles.metricLabel}>Trend:</Font>
           <Font style={styles.trendText}>{item.trendText}</Font>
        </View>
        <View style={styles.metricRow}>
           <Font style={styles.metricLabel}>Profitability:</Font>
           <Font style={styles.profitabilityText}>{item.profitability}</Font>
        </View>
         <Font style={styles.reasonText} numberOfLines={3}>{item.reason}</Font>
         <View style={styles.detailsIndicator}>
            <Font style={styles.detailsText} weight="medium">View Details</Font>
         </View>
      </View>
    </TouchableOpacity>
  );
};

// --- Styles for ProductCard ---
const styles = StyleSheet.create({
  cardBase: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: "#405060",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginBottom: 5,
  },
  cardTopImage: {
    height: 140,
    width: '100%',
    backgroundColor: '#E0E0E0',
    resizeMode: 'cover',
  },
  cardContent: {
     padding: 15,
  },
  productName: {
    fontSize: 17,
    color: "#1C2026",
    marginBottom: 12,
    fontWeight: '600',
  },
  metricRow: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: 8,
     alignItems: 'center',
     paddingVertical: 5,
     borderBottomWidth: 1,
     borderBottomColor: '#F0F0F5',
  },
  metricLabel: {
     fontSize: 14,
     color: '#5A6470',
     flexShrink: 1,
  },
  trendText: {
    fontSize: 14,
    color: "#333",
    fontWeight: '500',
    textAlign: 'right',
    paddingLeft: 5,
  },
  profitabilityText: {
    fontSize: 14,
    color: "#27AE60",
    fontWeight: 'bold',
    textAlign: 'right',
    paddingLeft: 5,
  },
  reasonText: {
     fontSize: 13,
     color: '#5A6470',
     marginTop: 12,
     lineHeight: 18,
     minHeight: 54,
  },
  detailsIndicator: {
     marginTop: 15,
     paddingTop: 10,
     borderTopWidth: 1,
     borderTopColor: '#F0F0F5',
     alignItems: 'center',
  },
  detailsText: {
     fontSize: 14,
     color: '#3498DB',
     fontWeight: '500',
  }
  // ... other necessary styles ...
});

export default ProductCard;
