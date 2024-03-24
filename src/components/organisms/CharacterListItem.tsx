import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Character} from '../types';
import {memo} from 'react';

type CharacterListItem = {
  character: Character;
};

const CharacterListItem = ({character}: CharacterListItem) => {
  return (
    <>
      <View style={cardStyles.container}>
        <Text style={cardStyles.name}>{character.name}</Text>
        <Image source={{uri: character.image}} style={cardStyles.image} />
      </View>
    </>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0C3B2E',
    width: '50%',
  },
  name: {
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFBA00',
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default memo(
  CharacterListItem,
  (prevProps, nextProps) => prevProps.character.id === nextProps.character.id,
);
