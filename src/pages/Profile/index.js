import React, {useContext, useState} from 'react';
import {Modal, Platform} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
  const {signOut, user, setUser, storageUser} = useContext(AuthContext);

  const [nome, setNome] = useState(user?.nome);
  const [url, setUrl] = useState(null);
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
  }

  // atualizar o perfil
  async function updateProfile() {
    if (nome === '') {
      return;
    }

    await firestore().collection('users').doc(user?.uid).update({
      nome: nome,
    });

    // buscar todos os posts desse user e atualizar o nome dele
    const postDocs = await firestore()
      .collection('posts')
      .where('userId', '==', user.uid)
      .get();

    // percorrer todos os posts desse user e atualizar
    postDocs.forEach(async doc => {
      await firestore().collection('posts').doc(doc.id).update({
        autor: nome,
      });
    });

    let data = {
      uid: user.uid,
      nome: nome,
      email: user.email,
    };

    setUser(data);
    storageUser(data);
    setOpen(false);
  }

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Cancelou');
      } else if (response.error) {
        console.log('Ops parece que deu algum erro');
      } else {
        // subir parao firebase
        // console.log('Enviar pro firebase');
        uploadFileFirebase(response).then(() => {
          uploadAvatarPosts();
        });

        console.log('URI DA FOTO: ', response.assets[0].uri);
        setUrl(response.assets[0].uri);
      }
    });
  };

  const getFileLocalPath = response => {
    // extrair e retornar a url da foto
    return response.assets[0].uri;
  };

  const uploadFileFirebase = async response => {
    const fileSource = getFileLocalPath(response);
    // console.log(fileSource);
    const storageRef = storage().ref('users').child(user?.uid);

    return await storageRef.putFile(fileSource);
  };

  const uploadAvatarPosts = async () => {
    const storageRef = storage().ref('users').child(user?.uid);
    const url = await storageRef
      .getDownloadURL()
      .then(async image => {
        console.log('URL RECEBIDA: ', image);

        // atualizar todas as imagens dos posts desse usuario
        const postDocs = await firestore()
          .collection('posts')
          .where('userId', '==', user.uid)
          .get();

        // percorrer todos os posts e trocar a url da imagem
        postDocs.forEach(async doc => {
          await firestore().collection('posts').doc(doc.id).update({
            avatarUrl: image,
          });
        });
      })
      .catch(error => {
        console.log('ERROR AO ATUALIZAR FOTO DOS POSTS', error);
      });
  };

  return (
    <Container>
      <Header />

      {url ? (
        <UploadButton onPress={() => uploadFile()}>
          <UploadText>+</UploadText>
          <Avatar source={{uri: url}} />
        </UploadButton>
      ) : (
        <UploadButton onPress={() => uploadFile()}>
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
