import React from 'react';
import {View, Text, Image} from 'react-native';
import {Character} from '../types';
import {memo} from 'react';
import cardStyles from '../../GlobalStyles/cardStyles';

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

export default memo(
  CharacterListItem,
  (prevProps, nextProps) => prevProps.character.id === nextProps.character.id,
);
