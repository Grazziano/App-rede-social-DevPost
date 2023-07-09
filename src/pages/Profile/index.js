import React, {useContext, useState} from 'react';
import {Modal, Platform} from 'react-native';

import {AuthContext} from '../../contexts/auth';

import Header from '../../components/Header';
import {
  Avatar,
  Button,
  ButtonBack,
  ButtonText,
  Container,
  Email,
  Input,
  ModalContainer,
  Name,
  UploadButton,
  UploadText,
} from './styles';

import Feather from 'react-native-vector-icons/Feather';

export default function Profile() {
  const {signOut, user} = useContext(AuthContext);

  const [nome, setNome] = useState(user?.nome);
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
  }

  async function updateProfile() {
    alert('TESTE');
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

      <Button bg="#428cfd" onPress={() => setOpen(true)}>
        <ButtonText color="#FFF">Atualizar Perfil</ButtonText>
      </Button>

      <Button bg="#DDD" onPress={handleSignOut}>
        <ButtonText color="#353840">Sair</ButtonText>
      </Button>

      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpen(false)}>
            <Feather name="arrow-left" size={22} color="#121212" />
            <ButtonText color="#121212">Voltar</ButtonText>
          </ButtonBack>

          <Input
            placeholder={user?.nome}
            value={nome}
            onChangeText={text => setNome(text)}
          />

          <Button bg="#428CFD" onPress={updateProfile}>
            <ButtonText color="#FFF">Salvar</ButtonText>
          </Button>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
