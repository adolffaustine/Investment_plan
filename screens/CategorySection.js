// components/CategorySection.js (Create this new file)
import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Font from '../hooks/font'; // Adjust path if needed
import ProductCard from './ProductCard'; // Assuming ProductCard is moved or imported correctly

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth; // Full width for paging

const CategorySection = ({ category, items, onPressItem }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null); // Ref to store interval ID

  // --- Cleanup interval on unmount ---
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // --- Auto Scroll Effect ---
  useEffect(() => {
    // Clear any existing interval before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (items.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % items.length; // Loop back to 0
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex; // Return the new index for the state update
        });
      }, 3000); // Scroll every 3 seconds (adjust as needed)
    }

    // Cleanup function for this specific effect run
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [items.length]); // Rerun effect if number of items changes

  // --- Stop auto-scroll on manual interaction (optional but recommended) ---
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Indicate that auto-scroll is stopped
    }
  };

  // --- Arrow Navigation Handlers ---
  const handleNext = () => {
    stopAutoScroll(); // Stop auto-scroll on manual navigation
    if (currentIndex < items.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      // setCurrentIndex(nextIndex); // Let onViewableItemsChanged handle state update
    } else {
      // Optional: Loop back to start when pressing next on last item
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
      // setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    stopAutoScroll(); // Stop auto-scroll on manual navigation
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      // setCurrentIndex(prevIndex);
    } else {
      // Optional: Loop to end when pressing prev on first item
      flatListRef.current?.scrollToIndex({ index: items.length - 1, animated: true });
      // setCurrentIndex(items.length - 1);
    }
  };

  // --- Update index based on visible items (for manual swipe) ---
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const newIndex = viewableItems[0].index ?? 0;
      if (newIndex !== currentIndex) {
        // Only stop auto-scroll if the index actually changed due to swipe
        stopAutoScroll();
        setCurrentIndex(newIndex);
      }
    }
  }, [currentIndex]); // Depend on currentIndex to avoid unnecessary calls

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  // Don't render arrows if only one item
  const showArrows = items.length > 1;

  return (
    <View style={styles.categorySectionContainer}>
      <Font style={styles.sectionTitle} weight="bold">{category}</Font>
      <View style={styles.listWrapper}>
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={onPressItem}
              style={{ width: CARD_WIDTH }} // Ensure full width
            />
          )}
          keyExtractor={(item) => `${category}-${item.id}`} // Make key unique across categories
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          bounces={false}
          // --- Add touch handlers to stop auto-scroll ---
          onTouchStart={stopAutoScroll}
        />
        {/* --- Absolutely Positioned Arrows --- */}
        {showArrows && (
          <>
            <TouchableOpacity
              onPress={handlePrev}
              // disabled={currentIndex === 0} // Disable only if not looping
              style={[styles.arrowButton, styles.arrowLeft]}
            >
              <Text style={styles.arrowText}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              // disabled={currentIndex === items.length - 1} // Disable only if not looping
              style={[styles.arrowButton, styles.arrowRight]}
            >
              <Text style={styles.arrowText}>{">"}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categorySectionContainer: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#2C3E50',
    fontWeight: '600',
    marginLeft: 20, // Indent title slightly
    marginBottom: 15,
  },
  listWrapper: {
    position: 'relative', // Needed for absolute positioning of children (arrows)
    height: 350, // Adjust height based on your ProductCard height + image
                 // Example: cardTopImage.height + cardContent padding + text heights
                 // You might need to calculate this more precisely or set a fixed card height
  },
  arrowButton: {
    position: 'absolute',
    top: '40%', // Position vertically (adjust percentage as needed)
    // transform: [{ translateY: -20 }], // Adjust based on arrow size if needed
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // Semi-transparent background
    borderRadius: 20, // Circular
    zIndex: 1, // Ensure arrows are on top
  },
  arrowLeft: {
    left: 15, // Position from left edge
  },
  arrowRight: {
    right: 15, // Position from right edge
  },
//   arrowDisabled: { // No longer needed if looping arrows
//     opacity: 0.2,
//   },
  arrowText: {
    color: '#FFFFFF', // White arrow text
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20, // Ensure text is centered vertically in circle
  },
  // --- Product Card Styles (Should be defined in ProductCard.js or passed) ---
  // These are duplicated here for context, ideally import/pass them
  cardBase: { // Example base style if needed in ProductCard.js
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
  cardTopImage: { // Example style if needed in ProductCard.js
    height: 140,
    width: '100%',
    backgroundColor: '#E0E0E0',
    resizeMode: 'cover',
  },
  cardContent: { // Example style if needed in ProductCard.js
     padding: 15,
  },
  productName: { // Example style if needed in ProductCard.js
    fontSize: 17,
    color: "#1C2026",
    marginBottom: 12,
    fontWeight: '600',
  },
  
  // ... other card content styles
});

export default CategorySection;
