import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchProductById } from '../services/api';

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading || !product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B81" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productBrand}>Marca: {product.brand}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
          <Text style={styles.discountBadge}>{product.discountPercentage}% OFF</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        
        <Text style={styles.sectionTitle}>Galeria</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {product.images.map((image, index) => (
            <Image 
              key={index} 
              source={{ uri: image }} 
              style={styles.galleryImage} 
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginRight: 15,
  },
  discountBadge: {
    backgroundColor: '#ff4500',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
  galleryImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
});