import {StyleSheet} from 'react-native';

const camStyles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#6D9773',
  },
  openCameraButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BB8A5242',
    borderRadius: 100 / 2,
    position: 'absolute',
    bottom: 100,
    borderWidth: 3,
    borderColor: '#FFBA00',
  },
  captureButton: {
    backgroundColor: '#BB8A5242',
    borderRadius: 100 / 2,
    width: 75,
    height: 75,
    borderWidth: 3,
    borderColor: '#FFBA00',
  },
  capturedImageContainer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  capturedButtonsContainer: {
    flexDirection: 'row-reverse',
    width: '65%',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cameraButtons: {
    position: 'absolute',
    top: 10,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 100,
  },
});
export default camStyles;
