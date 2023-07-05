import React from 'react';
import {View, Text} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {ButtonPost, Container} from './styles';

import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Tela Home</Text>

      <ButtonPost
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" color="#FFF" size={25} />
      </ButtonPost>
    </Container>
  );
}
