import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductsScreen from '../screens/ProductsScreen';

const Tab = createMaterialTopTabNavigator();

const categoriesConfig = {
  male: {
    clothing: 'mens-shirts',
    shoes: 'mens-shoes',
    watches: 'mens-watches'
  },
  female: {
    clothing: 'womens-dresses',
    shoes: 'womens-shoes',
    watches: 'womens-watches',
    bags: 'womens-bags',
    jewelry: 'womens-jewellery'
  }
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B81',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarIndicatorStyle: {
          backgroundColor: '#FF6B81',
          height: 3,
        },
      }}
    >
      <Tab.Screen 
        name="Masculino"
        component={ProductsScreen}
        initialParams={{
          categories: categoriesConfig.male,
          displayCategories: [
            { name: 'Camisetas', key: 'clothing' },
            { name: 'Tênis', key: 'shoes' },
            { name: 'Relógios', key: 'watches' }
          ]
        }}
      />
      <Tab.Screen 
        name="Feminino"
        component={ProductsScreen}
        initialParams={{
          categories: categoriesConfig.female,
          displayCategories: [
            { name: 'Vestidos', key: 'clothing' },
            { name: 'Tênis', key: 'shoes' },
            { name: 'Relógios', key: 'watches' },
            { name: 'Bolsas', key: 'bags' },
            { name: 'Joias', key: 'jewelry' }
          ]
        }}
      />
    </Tab.Navigator>
  );
}