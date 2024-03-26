import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
} from 'react-native';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import apiStyles from './styles'; // Import your styles from the appropriate file

interface Photo {
  id: number;
  url: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const PhotoList = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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
    setSelectedLocation({latitude, longitude});
    Alert.alert(
      'Details:',
      `Path: \n${url}\n\nCoordinates:\nLatitude: ${latitude}\nLongitude: ${longitude}`,
      [
        {
          text: 'Show on Map',
          onPress: () => {},
        },
        {
          text: 'Cancel',
          onPress: () => setSelectedLocation(null),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}: {item: Photo}) => (
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
  const handleCloseMap = () => {
    setSelectedLocation(null);
  };

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
      {selectedLocation && (
        <>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
            />
          </MapView>
          <Button title="Close Map" onPress={handleCloseMap} />
        </>
      )}
    </View>
  );
};

export default PhotoList;
