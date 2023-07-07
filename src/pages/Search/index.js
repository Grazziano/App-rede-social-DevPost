import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {AreaInput, Container, Input, List} from './styles';
import Feather from 'react-native-vector-icons/Feather';

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  return (
    <Container>
      <AreaInput>
        <Feather name="search" size={20} color="#E52246" />
        <Input
          placeholder="Procurando alguem?"
          value={input}
          onChangeText={text => setInput(text)}
          placeholderTextColor="#353840"
        />
      </AreaInput>
    </Container>
  );
}
