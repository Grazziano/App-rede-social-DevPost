import React, {useState} from 'react';
import {View, Text} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import {ButtonPost, Container, ListPosts} from './styles';

import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';

export default function Home() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([
    {id: 1, content: 'TESTE123'},
    {id: 2, content: 'TESTE123'},
    {id: 3, content: 'TESTE123'},
  ]);

  return (
    <Container>
      <Header />

      <ListPosts data={posts} renderItem={({item}) => <Text>TESTE</Text>} />

      <ButtonPost
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" color="#FFF" size={25} />
      </ButtonPost>
    </Container>
  );
}
