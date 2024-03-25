import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  PhotoIdentifier,
  CameraRoll,
} from '@react-native-camera-roll/camera-roll';
import imageGalleryStyles from './styles';
import styles from '../../GlobalStyles';

interface Props {}

const AlbumGallery: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [albumPhotos, setAlbumPhotos] = useState<PhotoIdentifier[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const fetchAlbumPhotos = async (after?: string) => {
    try {
      setLoading(true);
      const cameraRollPhotos = await CameraRoll.getPhotos({
        groupTypes: 'All',
        first: 10,
        after,
      });
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
      setRefreshing(false); // Set refreshing to false after fetch completes
    }
  };

  useEffect(() => {
    fetchAlbumPhotos();
  }, []);

  const loadMorePhotos = () => {
    if (!loading && nextPage) {
      fetchAlbumPhotos(nextPage);
    }
  };

  const onRefresh = () => {
    setAlbumPhotos([]); // Clear existing photos
    setNextPage(null); // Reset next page cursor
    setRefreshing(true); // Set refreshing to true
    fetchAlbumPhotos(); // Fetch photos again
  };

  const renderPhotoItem = ({item}: {item: PhotoIdentifier}) => (
    <Image
      source={{uri: item.node.image.uri}}
      style={imageGalleryStyles.photoAlbum}
    />
  );

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={albumPhotos}
        renderItem={renderPhotoItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMorePhotos}
        onEndReachedThreshold={3}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        horizontal={false}
        refreshControl={
          // Add RefreshControl component
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default AlbumGallery;
