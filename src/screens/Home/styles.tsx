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
    marginVertical: 20,
    marginRight: 35,
    alignSelf: 'flex-end',
  },
  mapContainer: {
    height: 300,
    width: 300,
    alignSelf: 'center',
  },
  viewMoreText: {
    color: '#FFBA00',
  },
  viewMoreTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    margin: 5,
    backgroundColor: '#6D977342',
  },
  rightSwipeAction: {
    backgroundColor: '#6D9773',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row',
    width: '90%',
  },
});
export default imageGalleryStyles;
