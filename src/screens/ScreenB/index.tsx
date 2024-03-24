/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../../GlobalStyles';
import CharacterListItem from '../../components/organisms/CharacterListItem';

const ScreenB = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const fetchItems = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const responseJson = await response.json();

    setItems(responseJson.results);
    setNextPage(responseJson.info.next);

    setLoading(false);
  };

  const loadMore = async () => {
    const response = await fetch(nextPage);
    const responseJson = await response.json();

    setItems((existingItems) => {
      return [...existingItems, ...responseJson.results];
    });

    setNextPage(responseJson.info.next);

    setLoading(false);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.viewContainer}>
      <FlatList
        data={items}
        renderItem={data => <CharacterListItem character={data.item} />}
        ListFooterComponent={() => (
          <Text
            style={{alignSelf: 'center', fontSize: 20, color: '#fff'}}
            onPress={loadMore}>
            Load More
          </Text>
        )}
      />
    </View>
  );
};

export default ScreenB;
