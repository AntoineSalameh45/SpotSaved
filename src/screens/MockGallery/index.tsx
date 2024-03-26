import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import apiStyles from './styles';

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

  const handleImagePress = (
    latitude: number,
    longitude: number,
    url: string,
  ) => {
    Alert.alert(
      'Details:',
      `Path: \n${url}\n\nCoordinates:\nLatitude: ${latitude}\nLongitude: ${longitude}`,
    );
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={apiStyles.item}
      onPress={() =>
        handleImagePress(
          item.location.latitude,
          item.location.longitude,
          item.url,
        )
      }>
      <Image source={{uri: `file://${item.url}`}} style={apiStyles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={apiStyles.viewContainer}>
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

export default PhotoList;
