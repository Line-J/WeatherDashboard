import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart, Grid } from 'react-native-svg-charts';
import LinearGradient from 'react-native-linear-gradient';
import { G, Text as SVGText } from 'react-native-svg';

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

  const renderChart = (cities, title, icon, isHottest = false) => {
    let temperatures = cities.map(item => item.c4);
    const maxValue = Math.max(...temperatures);
    
    const scaledTemperatures = temperatures.map(temp => temp * 1.09);

    const paddedMax = isHottest ? maxValue * 1.1 : maxValue;

    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <G key={index}>
          <SVGText
            x={isHottest ? x(value) - 50 : x(value) + 10}  // Hottest x - 50, Coldest x + 10
            y={y(index) + bandwidth / 2}
            alignmentBaseline="middle"
            fontSize={12}
            fill={isHottest ? "#f6cb42" : "#f6cb42"}  // Different colors for hottest vs coldest
          >
            {`${value.toFixed(2)}°C`}
          </SVGText>
        </G>
      ));

    return (
      <View style={styles.chartContainer}>
        <View style={styles.centeredHeader}>
          <Text style={styles.chartTitle}>{title}</Text>
          <Image source={icon} style={styles.chartImage} />
        </View>

        <View style={styles.barGroup}>
          <View style={{ justifyContent: 'space-between' }}>
            {cities.map((city, index) => (
              <Text key={index} style={styles.cityLabel}>
                {city.c3}
              </Text>
            ))}
          </View>

          <BarChart
            style={{
              height: 200,
              flex: 1,
              marginLeft: 10,
              marginRight: 10, // Reduced right margin for label visibility
            }}
            data={scaledTemperatures}  // Use the scaled data here
            horizontal
            svg={{ fill: 'rgba(24,30,62,1)' }}
            spacingInner={0.4}
            contentInset={{ top: 10, bottom: 10 }}
            gridMin={0}
            gridMax={paddedMax}
          >
            <Grid direction={Grid.Direction.VERTICAL} />
            <Labels />
          </BarChart>
        </View>
      </View>
    );
  };

  const topCities = [...data].sort((a, b) => b.c4 - a.c4).slice(0, 5);
  const coldestCities = [...data].sort((a, b) => a.c4 - b.c4).slice(0, 5);

  return (
    <LinearGradient
      colors={['rgb(24,30,62)', 'rgba(142,67,168,1)']}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {loading && <ActivityIndicator size="large" color="#ffffff" />}
        {error && <Text style={styles.error}>Error: {error}</Text>}

        {topCities.length > 0 &&
          renderChart(
            topCities,
            'Top 5 Hottest Cities (2022)',
            require('./Pictures/Hot-removebg-preview.png'),
            true
          )}
        {coldestCities.length > 0 &&
          renderChart(
            coldestCities,
            'Top 5 Coldest Cities (2022)',
            require('./Pictures/Cold-removebg-preview.png'),
            false
          )}

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('AllCities')}
        >
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  chartContainer: {
    backgroundColor: '#f6cb42',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  centeredHeader: {
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(24,30,62,1)',
    marginBottom: 10,
  },
  chartImage: {
    width: 60,
    height: 60,
  },
  barGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityLabel: {
    color: 'rgba(24,30,62,1)',
    fontWeight: 'bold',
    fontSize: 13,
    height: 40,
    textAlignVertical: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#f6cb42',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'rgba(24,30,62,1)',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
