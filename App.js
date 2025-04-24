import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';  // Import LinearGradient
import WelcomeScreen from './src/WelcomeScreen'; 
import Dashboard from './src/Dashboard'; 
import AllCities from './src/AllCities';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'Weather Dashboard' }}
        />
        <Stack.Screen
          name="AllCities"
          component={AllCities}
          options={{ title: 'Historical Weather Data (2022)' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const GradientWrapper = ({ children }) => (
  <LinearGradient
    colors={['#25294a', '#25294a']} 
    locations={[0, 1]} 
    style={styles.container} 
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the gradient takes up the full screen
  },
});

