import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProductsByCategory } from '../services/api';

export default function ProductsScreen({ route, navigation }) {
  const { categories = {}, displayCategories = [] } = route.params || {};
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(displayCategories[0]?.key);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const categoryId = categories[activeCategory];
        if (categoryId) {
          const data = await fetchProductsByCategory(categoryId);
          setProducts(data || []);
        }
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [activeCategory, categories]);

  const renderItem = ({ item }) => (
    <ProductCard 
      product={item}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B81" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        {displayCategories.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoryButton,
              activeCategory === cat.key && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(cat.key)}
          >
            <Text style={[
              styles.categoryText,
              activeCategory === cat.key && styles.activeCategoryText
            ]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#fff',
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
  },
  activeCategoryButton: {
    backgroundColor: '#FF6B81',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeCategoryText: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});