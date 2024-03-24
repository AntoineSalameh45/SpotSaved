import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, Pressable} from 'react-native';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {RouteProp, useNavigation} from '@react-navigation/native';
import styles from '../../GlobalStyles';
import {RootStackParamList} from '../../navigation/RootStackParamList';
import imageGalleryStyles from './styles';

interface Props {
  route: RouteProp<RootStackParamList, 'Home'>;
}

const ScreenA: React.FC<Props> = ({route}) => {
  const [albumPhotos, setAlbumPhotos] = useState<PhotoIdentifier[]>([]);
  const capturedImage = route.params?.capturedImage;
  const navigation = useNavigation();

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      try {
        const cameraRollPhotos = await CameraRoll.getPhotos({
          groupTypes: 'All',
          first: 20,
        });
        setAlbumPhotos(cameraRollPhotos.edges);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchAlbumPhotos();
  }, []);

  return (
    <View style={styles.viewContainer}>
      <View style={imageGalleryStyles.sectionContainer}>
        <Text style={imageGalleryStyles.sectionTitle}>Just Captured</Text>
        {capturedImage ? (
          <>
            <Image
              source={{uri: capturedImage}}
              style={imageGalleryStyles.newImage}
            />
          </>
        ) : (
          <Pressable onPress={openCamera}>
            <Text style={imageGalleryStyles.captureText}>
              Capture a moment!
            </Text>
          </Pressable>
        )}
      </View>

      <View style={imageGalleryStyles.sectionContainer}>
        <Text style={imageGalleryStyles.sectionTitle}>
          Browse your SpotGallery
        </Text>
        <FlatList
          data={albumPhotos}
          renderItem={({item}) => (
            <Image
              source={{uri: item.node.image.uri}}
              style={imageGalleryStyles.photoAlbum}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
    </View>
  );
};

export default ScreenA;
