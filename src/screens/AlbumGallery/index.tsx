import React, {useState, useCallback} from 'react';
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import {
  PhotoIdentifier,
  CameraRoll,
} from '@react-native-camera-roll/camera-roll';
import {useFocusEffect} from '@react-navigation/native';
import styles from '../../GlobalStyles';
import albumGalleryStyles from './styles';
import apiStyles from '../OnlineGallery/styles';

const {width} = Dimensions.get('window');
const imageWidth = (width - 20) / 3;

const AlbumGallery = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [albumPhotos, setAlbumPhotos] = useState<PhotoIdentifier[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const fetchAlbumPhotos = async (after?: string) => {
    try {
      setLoading(true);
      const cameraRollPhotos = await CameraRoll.getPhotos({
        groupTypes: 'All',
        first: 21,
        after,
      });
      if (!after) {
        setAlbumPhotos([]);
      }
      setAlbumPhotos(existingPhotos => [
        ...existingPhotos,
        ...cameraRollPhotos.edges,
      ]);
      setNextPage(
        cameraRollPhotos.page_info.has_next_page
          ? cameraRollPhotos.page_info.end_cursor
          : null,
      );
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadMorePhotos = () => {
    if (!loading && nextPage) {
      fetchAlbumPhotos(nextPage);
    }
  };

  const imageDetails = () => {
    navigation.navigate('Online Gallery');
  };

  const onRefresh = () => {
    setNextPage(null);
    setRefreshing(true);
    fetchAlbumPhotos();
  };

  useFocusEffect(
    useCallback(() => {
      fetchAlbumPhotos();
      return () => {};
    }, []),
  );

  const renderPhotoItem = ({item}: {item: PhotoIdentifier}) => (
    <View style={albumGalleryStyles.rowContainer}>
      <Pressable onPress={() => imageDetails()}>
        <Image
          source={{uri: item.node.image.uri}}
          style={{width: imageWidth, height: imageWidth + 50}}
        />
      </Pressable>
    </View>
  );

  const renderEmptyMessage = () => (
    <View style={apiStyles.emptyMessageContainer}>
      <Text style={apiStyles.emptyMessageText}>No images available yet.</Text>
    </View>
  );

  return (
    <View style={styles.viewContainer}>
      <View style={albumGalleryStyles.viewContainer}>
        <FlatList
          data={albumPhotos}
          renderItem={renderPhotoItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={loadMorePhotos}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          ListEmptyComponent={renderEmptyMessage}
          horizontal={false}
          numColumns={3}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{paddingHorizontal: 8}}
        />
      </View>
    </View>
  );
};

export default AlbumGallery;
