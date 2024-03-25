import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {
  PhotoIdentifier,
  CameraRoll,
} from '@react-native-camera-roll/camera-roll';
import imageGalleryStyles from './styles';

interface Props {}

const AlbumGallery: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [albumPhotos, setAlbumPhotos] = useState<PhotoIdentifier[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const fetchAlbumPhotos = async (after?: string) => {
    try {
      setLoading(true);
      const cameraRollPhotos = await CameraRoll.getPhotos({
        groupTypes: 'All',
        first: 30,
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

  const renderPhotoItem = ({item}: {item: PhotoIdentifier}) => (
    <Image
      source={{uri: item.node.image.uri}}
      style={imageGalleryStyles.photoAlbum}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={albumPhotos}
        renderItem={renderPhotoItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMorePhotos}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        horizontal={false} // Change to true if you want horizontal scrolling
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Adjust background color as needed
  },
});

export default AlbumGallery;
