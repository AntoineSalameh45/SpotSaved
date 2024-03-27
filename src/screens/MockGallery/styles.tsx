import {StyleSheet} from 'react-native';

const apiStyles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#6D9773',
  },
  item: {
    backgroundColor: '#0C3B2E',
    padding: 0,
    marginVertical: 8,
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: 300,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  animatedViewStyles: {flex: 0.5},
  trashStyles: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 999,
  },
  trashContainer: {padding: 10, zIndex: 999, top: -70, marginRight: 5},
});
export default apiStyles;
