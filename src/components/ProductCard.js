import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.brand} numberOfLines={1}>{product.brand}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          <Text style={styles.discount}>{product.discountPercentage}% OFF</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  brand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#2e8b57',
    fontSize: 14,
    marginRight: 10,
    fontWeight: 'bold',
  },
  discount: {
    color: '#ff4500',
    fontSize: 12,
    fontWeight: 'bold',
  },
});