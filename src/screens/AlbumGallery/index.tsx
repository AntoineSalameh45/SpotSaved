import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {
  PhotoIdentifier,
  CameraRoll,
} from '@react-native-camera-roll/camera-roll';
import styles from '../../GlobalStyles';
import albumGalleryStyles from './styles';

const {width} = Dimensions.get('window');
const imageWidth = (width - 20) / 3;

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
        first: 21,
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
      setRefreshing(false);
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
    setAlbumPhotos([]);
    setNextPage(null);
    setRefreshing(true);
    fetchAlbumPhotos();
  };

  const renderPhotoItem = ({item}: {item: PhotoIdentifier}) => (
    <View style={albumGalleryStyles.rowContainer}>
      <Image
        source={{uri: item.node.image.uri}}
        style={{width: imageWidth, height: imageWidth + 50}}
      />
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
          horizontal={false}
          numColumns={3}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{paddingHorizontal: 10}}
        />
      </View>
    </View>
  );
};

export default AlbumGallery;
