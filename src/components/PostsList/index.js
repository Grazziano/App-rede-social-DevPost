import {View, Text} from 'react-native';
import React from 'react';
import {
  Actions,
  Avatar,
  Container,
  Content,
  ContentView,
  Header,
  Like,
  LikeButton,
  Name,
  TimePost,
} from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PostsList() {
  return (
    <Container>
      <Header>
        <Avatar source={require('../../assets/avatar.png')} />
        <Name numberOfLines={1}>Sujeito Programador</Name>
      </Header>

      <ContentView>
        <Content>Conteudo</Content>
      </ContentView>

      <Actions>
        <LikeButton>
          <Like>12</Like>
          <MaterialCommunityIcons
            name="heart-plus-outline"
            size={20}
            color="#E52246"
          />
        </LikeButton>

        <TimePost>há um minuto</TimePost>
      </Actions>
    </Container>
  );
}
