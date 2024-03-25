import {StyleSheet} from 'react-native';

const imageGalleryStyles = StyleSheet.create({
  newImage: {
    marginTop: 20,
    width: '100%',
    height: 200,
  },
  photoAlbum: {
    width: 100,
    height: 100,
    margin: 5,
  },
  sectionContainer: {
    backgroundColor: '#0C3B2E',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 20,
  },
  sectionTitle: {
    color: '#FFBA00',
    fontSize: 18,
    marginBottom: 10,
  },
  sectionTitleMap: {
    color: '#FFBA00',
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'center',
  },
  captureText: {
    color: '#FFBA00',
    margin: 20,
  },
  mapContainer: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
});
export default imageGalleryStyles;
