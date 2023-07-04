import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  Button,
  ButtonText,
  Container,
  Input,
  SignUpButton,
  SignUpText,
  Title,
} from './styles';

export default function Login() {
  const [login, setLogin] = useState(true);

  function toggleLogin() {
    setLogin(!login);
  }

  if (login) {
    return (
      <Container>
        <Title>
          Dev<Text style={{color: '#E52246'}}>Post</Text>
        </Title>

        <Input placeholder="seuemail@teste.com" />
        <Input placeholder="******" />

        <Button>
          <ButtonText>Acessar</ButtonText>
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

      <Input placeholder="seuemail@teste.com" />
      <Input placeholder="Seu nome" />
      <Input placeholder="******" />

      <Button>
        <ButtonText>Cadastrar</ButtonText>
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tenho uma conta</SignUpText>
      </SignUpButton>
    </Container>
  );
}
