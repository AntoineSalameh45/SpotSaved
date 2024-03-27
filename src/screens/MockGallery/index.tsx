// PhotoList.js
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';
import apiStyles from './styles';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface iPhoto {
  id: string;
  url: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const PhotoList = () => {
  const [photos, setPhotos] = useState<iPhoto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    url: string;
  } | null>(null);

  const translateY = useSharedValue(0);

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

  const deleteHandler = (id: string) => {
    axios
      .delete(`https://660296d89d7276a75553a45b.mockapi.io/api/img/photo/${id}`)
      .then(response => {
        console.log(response);
        setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
    handleCloseMap();
  };

  const handleImagePress = (
    latitude: number,
    longitude: number,
    id: string,
    url: string,
  ) => {
    setSelectedLocation({latitude, longitude, url});
    translateY.value = 0;
    Alert.alert(
      'Details:',
      `Path: \n${url}\n\nCoordinates:\nLatitude: ${latitude}\nLongitude: ${longitude}`,
      [
        {
          text: 'Show on Map',
          onPress: () => {
            /* Add navigation logic here */
          },
        },
        {
          text: 'Cancel',
          onPress: () => setSelectedLocation(null),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteHandler(id),
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}: {item: iPhoto}) => (
    <TouchableOpacity
      style={apiStyles.item}
      onPress={() =>
        handleImagePress(
          item.location.latitude,
          item.location.longitude,
          item.id,
          item.url,
        )
      }>
      <Image source={{uri: `file://${item.url}`}} style={apiStyles.image} />
    </TouchableOpacity>
  );

  const handleCloseMap = () => {
    translateY.value = withSpring(-700);
    setTimeout(() => {
      translateY.value = withSpring(0);
      setSelectedLocation(null);
    }, 500);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

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
          <Animated.View style={[apiStyles.mapContainer, animatedStyle]}>
            <Image
              source={{uri: `file://${selectedLocation.url}`}}
              style={apiStyles.animatedViewStyles}
            />
            <MapView
              style={apiStyles.animatedViewStyles}
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
          </Animated.View>
          <Animated.View style={[apiStyles.buttonContainer, animatedStyle]}>
            <Button title="Close Map" onPress={handleCloseMap} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default PhotoList;
