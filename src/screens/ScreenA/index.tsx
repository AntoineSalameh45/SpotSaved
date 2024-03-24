import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {RouteProp} from '@react-navigation/native';
import styles from '../../GlobalStyles';
import {RootStackParamList} from '../../navigation/RootStackParamList';

interface Props {
  route: RouteProp<RootStackParamList, 'Home'>; // Use RouteProp with your RootStackParamList
}

const ScreenA: React.FC<Props> = ({route}) => {
  const [albumPhotos, setAlbumPhotos] = useState<PhotoIdentifier[]>([]);
  const capturedImage = route.params?.capturedImage; // Use optional chaining

  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      try {
        const cameraRollPhotos = await CameraRoll.getPhotos({
          groupTypes: 'All',
          first: 20, // Adjust the number of photos to fetch as needed
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
      <Text>Screen A</Text>
      {capturedImage && (
        <Image
          source={{uri: capturedImage}}
          style={{width: 200, height: 200}}
        />
      )}
      <FlatList
        data={albumPhotos}
        renderItem={({item}) => (
          <Image
            source={{uri: item.node.image.uri}}
            style={{width: 100, height: 100, margin: 5}}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />
    </View>
  );
};

export default ScreenA;
