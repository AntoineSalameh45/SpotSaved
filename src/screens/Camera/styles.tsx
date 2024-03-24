import {StyleSheet} from 'react-native';

const camStyles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'blue',
  },
  openCameraButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 100 / 2,
    position: 'absolute',
    bottom: 100,
  },
  captureButton: {
    backgroundColor: '#00000042',
    borderRadius: 100 / 2,
    width: 75,
    height: 75,
    borderWidth: 3,
    borderColor: '#fff',
  },
  capturedImageContainer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  otherButtons: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 30,
  },
});
export default camStyles;
