import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CharacterListItem from '../../components/organisms/CharacterListItem';

const initialPage = 'https://rickandmortyapi.com/api/character';

const ScreenB = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState('');

  const fetchPage = async (url: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();

    setItems(existingItems => {
      return [...existingItems, ...responseJson.results];
    });

    setNextPage(responseJson.info.next);

    setLoading(false);
  };

  const onRefresh = () => {
    setItems([]);
    setNextPage(initialPage);
    fetchPage(initialPage);
  };
  useEffect(() => {
    fetchPage(initialPage);
  }, []);

  const renderCharacterItem = ({item, index}: {item: any; index: number}) => {
    if (index % 2 === 0) {
      return (
        <View style={styles.rowContainer}>
          <CharacterListItem character={item} />
          {items[index + 1] && (
            <CharacterListItem character={items[index + 1]} />
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={items}
        renderItem={renderCharacterItem}
        onEndReached={() => fetchPage(nextPage)}
        onEndReachedThreshold={3}
        ListFooterComponent={() => loading && <ActivityIndicator />}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    </View>
  );
};
const styles = StyleSheet.create({
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
});

export default ScreenB;
