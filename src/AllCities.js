import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

function AllCities() {
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState('alphabetical');
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/data');
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortData = (option) => {
    let sortedData;
    if (option === 'alphabetical') {
      sortedData = [...data].sort((a, b) => a.c1.localeCompare(b.c1));
    } else if (option === 'temperature') {
      sortedData = [...data].sort((a, b) => b.c4 - a.c4);
    }
    setData(sortedData);
    setSortOption(option);
  };

  const getTempColor = (temp) => {
    const t = parseFloat(temp);
    if (t >= 35) return 'red';
    if (t >= 30) return 'orange';
    if (t >= 25) return 'green';
    return 'blue';
  };

  return (
    <LinearGradient
      colors={['rgb(24,30,62)', 'rgba(142,67,168,1)']}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, padding: 10 }}>

        {/* Rounded Picker Container */}
        <View style={styles.roundedPickerWrapper}>
          <Picker
            selectedValue={sortOption}
            onValueChange={(itemValue) => sortData(itemValue)}
            style={styles.roundedPicker}
            dropdownIconColor="rgba(24,30,62,1)"
          >
            <Picker.Item label="Alphabetical (Country)" value="alphabetical" />
            <Picker.Item label="Highest Temperature" value="temperature" />
          </Picker>
        </View>

        {/* Header Row */}
        <View style={styles.limitedContainer}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell, { width: 60, color: 'rgba(24,30,62,1)' }]}>Country</Text>
            <Text style={[styles.cell, styles.headerCell, { width: 50, color: 'rgba(24,30,62,1)' }]}>Region</Text>
            <Text style={[styles.cell, styles.headerCell, { width: 75, color: 'rgba(24,30,62,1)' }]}>City</Text>
            <Text style={[styles.cell, styles.headerCell, { width: 45, color: 'rgba(24,30,62,1)' }]}>Temp</Text>
            <Text style={[styles.cell, styles.headerCell, { width: 55, color: 'rgba(24,30,62,1)' }]}>Long</Text>
            <Text style={[styles.cell, styles.headerCell, { width: 80, color: 'rgba(24,30,62,1)' }]}>Date</Text>
          </View>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={[styles.limitedContainer, { backgroundColor: 'rgba(255, 255, 255, 0.8)' }]}>
              <View style={styles.row}>
                <Text style={[styles.cell, { width: 60, color: 'rgba(24,30,62,1)' }]}>{item.c1}</Text>
                <Text style={[styles.cell, { width: 50, color: 'rgba(24,30,62,1)' }]}>{item.c2}</Text>
                <Text style={[styles.cell, { width: 75, color: 'rgba(24,30,62,1)' }]}>{item.c3}</Text>
                <Text style={[styles.cell, { width: 45, color: getTempColor(item.c4) }]}>{parseFloat(item.c4).toFixed(2)}</Text>
                <Text style={[styles.cell, { width: 55, color: 'rgba(24,30,62,1)' }]}>{parseFloat(item.c5).toFixed(2)}</Text>
                <Text style={[styles.cell, { width: 75, color: 'rgba(24,30,62,1)' }]}>{item.c6}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  roundedPickerWrapper: {
    backgroundColor: '#f6cb42',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  roundedPicker: {
    height: 50,
    color: 'black',
    paddingHorizontal: 10,
  },
  limitedContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 8,
  },
  headerRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 2,
    borderColor: '#999',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cell: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  headerCell: {
    fontWeight: 'bold',
  },
});

export default AllCities;
