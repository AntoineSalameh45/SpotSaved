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
    backgroundColor: '#ffffffc4',
    borderRadius: 100,
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturedImageContainer: {
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  capturedImage: {
    flex: 1,
    aspectRatio: 1, // Ensures the image maintains its aspect ratio
    width: '100%',
    height: 'auto', // Sets the height to auto to maintain aspect ratio
  },
});
export default camStyles;
