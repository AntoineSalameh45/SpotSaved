import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  Text,
} from 'react-native';
import axios from 'axios';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://660296d89d7276a75553a45b.mockapi.io/api/img/photo',
      );
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <Image source={{uri: `file://${item.url}`}} style={styles.image} />
      <Text style={{fontSize: 16, color: '#000'}}>
        Lattitude {item.location.latitude}
      </Text>
      <Text style={{fontSize: 16, color: '#000'}}>
        Longitude {item.location.longitude}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: '90%',
    height: 300,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default PhotoList;
