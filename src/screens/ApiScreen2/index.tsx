import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, StyleSheet, RefreshControl} from 'react-native';
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

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image
        source={{
          uri: `https://660296d89d7276a75553a45b.mockapi.io/api/img/photo${item.url}`,
        }} // Update with your API URL
        style={styles.image}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default PhotoList;
