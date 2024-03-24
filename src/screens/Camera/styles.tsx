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
});
export default camStyles;
