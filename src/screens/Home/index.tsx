import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../GlobalStyles';
import imageGalleryStyles from './styles';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';

const Home = () => {
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      try {
        const response = await axios.get(
          'https://660296d89d7276a75553a45b.mockapi.io/api/img/photo',
        );
        setAlbumPhotos(response.data.reverse());
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchAlbumPhotos();
  }, []);

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  const viewMoreImages = () => {
    navigation.navigate('Mock Gallery');
  };

  const renderPhotoItem = ({item}) => (
    <Image
      source={{uri: `file://${item.url}`}}
      style={imageGalleryStyles.photoAlbum}
    />
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.viewContainer}>
      <ScrollView>
        <View style={imageGalleryStyles.sectionContainer}>
          <Text style={imageGalleryStyles.sectionTitle}>
            What are you waiting for?
          </Text>
          <Pressable onPress={openCamera}>
            <Text style={imageGalleryStyles.captureText}>
              Capture the moment!
            </Text>
          </Pressable>
        </View>

        <View style={imageGalleryStyles.sectionContainer}>
          <Text style={imageGalleryStyles.sectionTitle}>
            Browse your SpotGallery
          </Text>
          <FlatList
            data={albumPhotos}
            renderItem={renderPhotoItem}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            ListFooterComponent={() => (
              <Pressable
                onPress={viewMoreImages}
                style={imageGalleryStyles.viewMoreTextContainer}>
                <Text style={imageGalleryStyles.viewMoreText}>
                  View More Images &gt;
                </Text>
              </Pressable>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>

        <View style={imageGalleryStyles.sectionContainer}>
          <Text style={imageGalleryStyles.sectionTitleMap}>
            Your Saved Spots
          </Text>
          <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            style={imageGalleryStyles.mapContainer}
            region={{
              latitude: 33.88863,
              longitude: 35.49548,
              latitudeDelta: 0.05,
              longitudeDelta: 0.06,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
