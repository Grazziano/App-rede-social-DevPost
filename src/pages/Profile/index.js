import React, {useContext, useState} from 'react';

import {AuthContext} from '../../contexts/auth';

import Header from '../../components/Header';
import {
  Avatar,
  Button,
  ButtonText,
  Container,
  Email,
  Name,
  UploadButton,
  UploadText,
} from './styles';

export default function Profile() {
  const {signOut, user} = useContext(AuthContext);

  const [nome, setNome] = useState(user?.nome);
  const [url, setUrl] = useState(null);

  async function handleSignOut() {
    await signOut();
  }

  return (
    <Container>
      <Header />

      {url ? (
        <UploadButton onPress={() => alert('Clicou na foto!')}>
          <UploadText>+</UploadText>
          <Avatar source={{uri: url}} />
        </UploadButton>
      ) : (
        <UploadButton>
          <UploadText>+</UploadText>
        </UploadButton>
      )}

      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Button bg="#428cfd">
        <ButtonText color="#FFF">Atualizar Perfil</ButtonText>
      </Button>

      <Button bg="#DDD" onPress={handleSignOut}>
        <ButtonText color="#353840">Sair</ButtonText>
      </Button>
    </Container>
  );
}
