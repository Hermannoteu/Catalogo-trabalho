import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductsScreen from '../screens/ProductsScreen';

const Tab = createMaterialTopTabNavigator();

const CATEGORIES = {
  male: ['mens-shirts', 'mens-shoes', 'mens-watches'],
  female: ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches']
};

export default function CategoryTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B81',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarIndicatorStyle: {
          backgroundColor: '#FF6B81',
          height: 3,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: '#fff',
        }
      }}
    >
      <Tab.Screen 
        name="Masculino" 
        children={() => (
          <ProductsScreen 
            gender="male" 
            categories={CATEGORIES.male} 
            key="male" 
          />
        )} 
      />
      <Tab.Screen 
        name="Feminino" 
        children={() => (
          <ProductsScreen 
            gender="female" 
            categories={CATEGORIES.female} 
            key="female" 
          />
        )} 
      />
    </Tab.Navigator>
  );
}