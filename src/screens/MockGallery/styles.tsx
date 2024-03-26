import {StyleSheet} from 'react-native';

const apiStyles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#6D9773',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginHorizontal: 10,
    columnGap: 10,
  },
  coordText: {fontSize: 16, color: '#FFBA00'},
  item: {
    backgroundColor: '#0C3B2E',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: '90%',
    height: 300,
  },
  image: {
    width: 200,
    height: 200,
  },
});
export default apiStyles;
