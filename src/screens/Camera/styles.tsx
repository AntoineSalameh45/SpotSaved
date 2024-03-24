import {StyleSheet} from 'react-native';

const camStyles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'blue',
  },
  button: ({pressed}: any) => ({
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: pressed ? '#001833' : '#007aff',
    borderRadius: 8,
    transform: [{scale: pressed ? 1.2 : 1}],
    marginTop: 24,
  }),
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
  capturedImage: {
    flex: 1,
    aspectRatio: 1,
    width: '100%',
    height: 'auto',
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
