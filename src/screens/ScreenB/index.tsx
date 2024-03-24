/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../GlobalStyles';
import CharacterListItem from '../../components/organisms/CharacterListItem';

const ScreenB = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(
    'https://rickandmortyapi.com/api/character',
  );

  const fetchNextPage = async () => {
    if (loading) {
      return;
    }
    console.log('Fetching: ', nextPage);
    setLoading(true);
    const response = await fetch(nextPage);
    const responseJson = await response.json();

    setItems(existingItems => {
      return [...existingItems, ...responseJson.results];
    });

    setNextPage(responseJson.info.next);

    setLoading(false);
  };
  useEffect(() => {
    fetchNextPage();
  }, []);

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={items}
        renderItem={data => <CharacterListItem character={data.item} />}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={3}
        ListFooterComponent={() => loading && <ActivityIndicator />}
      />
    </View>
  );
};

export default ScreenB;
