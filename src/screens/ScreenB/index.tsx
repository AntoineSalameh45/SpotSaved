/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../../GlobalStyles';
import CharacterListItem from '../../components/organisms/CharacterListItem';

const ScreenB = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(
    'https://rickandmortyapi.com/api/character',
  );

  const fetchNextPage = async () => {
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
        ListFooterComponent={() => (
          <View>
            {loading && <ActivityIndicator />}
            <Text
              style={{alignSelf: 'center', fontSize: 20, color: '#fff'}}
              onPress={fetchNextPage}>
              Load More
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ScreenB;
