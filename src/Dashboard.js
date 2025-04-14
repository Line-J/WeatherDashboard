import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:3000/data');
      if (!response.ok) throw new Error('Error fetching data');
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const topCities = [...data].sort((a, b) => b.c4 - a.c4).slice(0, 5);
  const coldestCities = [...data].sort((a, b) => a.c4 - b.c4).slice(0, 5);

  const chartData = {
    labels: topCities.map(item => item.c3),
    datasets: [{ data: topCities.map(item => item.c4) }],
  };

  const coldChartData = {
    labels: coldestCities.map(item => item.c3),
    datasets: [{ data: coldestCities.map(item => item.c4) }],
  };

  return (
    <LinearGradient
      colors={['rgb(24,30,62)', 'rgba(142,67,168,1)']}
      style={styles.gradientBackground}
    >
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#ffffff" />}
        {error && <Text style={styles.error}>Error: {error}</Text>}

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitleInsideBox}>Top 5 Hottest Cities</Text>
          {/* Use a local image */}
          <Image
            source={require('./Pictures/Hot-removebg-preview.png')}  // Replace with your local image path
            style={styles.chartImage}
          />
          {topCities.length > 0 && (
            <BarChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              yAxisSuffix="°C"
              fromZero
              chartConfig={{
                backgroundGradientFrom: '#f6cb42',
                backgroundGradientTo: '#f6cb42',
                decimalPlaces: 1,
                color: () => `rgba(0,0,0,0.5)`,
                labelColor: () => `rgba(24,30,62,1)`,
                style: {
                  borderRadius: 5,
                },
                barPercentage: 0.8,
                categoryPercentage: 0.5,
              }}
            />
          )}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitleInsideBox}>Top 5 Coldest Cities</Text>
          {/* Use a local image */}
          <Image
            source={require('./Pictures/Cold-removebg-preview.png')}  // Replace with your local image path
            style={styles.chartImage}
          />
          {coldestCities.length > 0 && (
            <BarChart
              data={coldChartData}
              width={screenWidth - 40}
              height={220}
              yAxisSuffix="°C"
              fromZero
              chartConfig={{
                backgroundGradientFrom: '#f6cb42',
                backgroundGradientTo: '#f6cb42',
                decimalPlaces: 1,
                color: () => `rgba(0,0,0,0.5)`,
                labelColor: () => `rgba(24,30,62,1)`,
                style: {
                  borderRadius: 5,
                },
                barPercentage: 0.8,
                categoryPercentage: 0.5,
              }}
            />
          )}
        </View>

        <TouchableOpacity 
          style={styles.buttonContainer} 
          onPress={() => navigation.navigate('AllCities')}
        >
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  chartContainer: {
    backgroundColor: '#f6cb42',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  chartImage: {
    position: 'absolute',
    top: 49, // Adjust position
    left: 160, // Adjust position
    width: 60, // Adjust size
    height: 60, // Adjust size
    zIndex: 1, // Ensure the image stays on top
  },
  chartTitleInsideBox: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(24,30,62,1)',
    marginBottom: 60,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#f6cb42',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(24,30,62,1)',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
