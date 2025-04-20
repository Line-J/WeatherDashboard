import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
        colors={['rgba(24,30,62,1)', 'rgba(142,67,168,1)']}
        locations={[0, 1]} 
        angle={177} 
        style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require('./Pictures/WeatherDashLogo.png')}
          style={styles.image}
        />
        
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Weather</Text>
            <Text style={styles.title1}>Dash</Text>
        </View>
        <Text style={styles.subtitle}>Get weather updates for different cities with an easy-to-use interface. </Text>
        <TouchableOpacity 
            style={styles.buttonContainer} 
            onPress={() => navigation.navigate('Dashboard')}
            >
            <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <View style={styles.poweredByContainer}>
          <Text style={styles.poweredByText}>
            Powered by
          </Text>
          <Image
            source={require('./Pictures/Snowflake_Logo.svg.png')} // Make sure this path is correct
            style={styles.poweredByLogo}
          />
        </View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 260,
    height: 260,
    marginBottom: 20,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'white',
  },
  title1: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#f6cb42',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: '#f6cb42',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(24,30,62,1)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  poweredByContainer: {
    position: 'absolute',
    bottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  
  poweredByLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  
  poweredByText: {
    fontSize: 12,
    color: '#FAEBD7',
    fontStyle: 'italic',
  },
});


