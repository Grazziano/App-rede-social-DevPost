import React, {useContext, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {
  Button,
  ButtonText,
  Container,
  Input,
  SignUpButton,
  SignUpText,
  Title,
} from './styles';

import {AuthContext} from '../../contexts/auth';

export default function Login() {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signUp, signIn, loadingAuth} = useContext(AuthContext);

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setEmail('');
    setPassword('');
  }

  async function handleSignIn() {
    if (email === '' || password === '') {
      console.log('PREENCHA TODOS OS CAMPOS');
      return;
    }

    await signIn(email, password);
  }

  async function handleSignUp() {
    if (name === '' || email === '' || password === '') {
      console.log('PREENCHA TODOS OS CAMPOS');
      return;
    }

    await signUp(email, password, name);
  }

  if (login) {
    return (
      <Container>
        <Title>
          Dev<Text style={{color: '#E52246'}}>Post</Text>
        </Title>

        <Input
          placeholder="seuemail@teste.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Input
          placeholder="******"
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Button onPress={handleSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>

        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        Dev<Text style={{color: '#E52246'}}>Post</Text>
      </Title>

      <Input
        placeholder="Seu nome"
        value={name}
        onChangeText={text => setName(text)}
      />

      <Input
        placeholder="seuemail@teste.com"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Input
        placeholder="******"
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button onPress={handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tenho uma conta</SignUpText>
      </SignUpButton>
    </Container>
  );
}
