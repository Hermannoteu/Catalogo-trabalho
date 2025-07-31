import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from './src/store/store';
import LoginScreen from './src/screens/LoginScreen';
import MainTabs from './src/navigation/MainTabs';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import { logout } from './src/store/slices/authSlice';

const Stack = createStackNavigator();

// Componente para o botão de logout
const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={{ marginRight: 15 }}
      onPress={() => {
        dispatch(logout());
        navigation.replace('Login');
      }}
    >
      <Text style={{ color: '#FF6B81', fontWeight: 'bold' }}>Sair</Text>
    </TouchableOpacity>
  );
};

const AppNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ 
              title: 'Catálogo de Produtos',
              headerRight: () => <LogoutButton />
            }}
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen} 
            options={{ 
              title: 'Detalhes do Produto',
              headerStyle: {
                backgroundColor: '#FF6B81',
              },
              headerTintColor: '#fff',
            }}
          />
        </>
      ) : (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}