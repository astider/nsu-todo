import React, { useState } from 'react';
import styled from 'styled-components';

import Input from './Input';

import api from '../utils/api';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
`;

const ErrorText = styled.p`
  color: red;
`;

const Button = styled.div`
  width: 128px;
  height: 50px;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 16px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const onSubmit = async () => {
    try {
      const trimUsername = username.trim();
      const trimPassword = password.trim();
      if (!trimUsername || !trimPassword) {
        setErrorText('Username or Password cannot be empty');
        return;
      }
      const data = await api.post('users/auth', {
        "username": trimUsername, 
        "password": trimPassword
      }, false);
      if (data) {
        const { token } = data.data;
        if (window) {
          window.localStorage.setItem('access-token', token);
          props.setReload(true);
        }
      }
    } catch (e) {
      setErrorText(e.message);
    }
  }

  return (
    <FormContainer>
      <Input label="Username" onChange={e => setUsername(e.target.value)} value={username} required />
      <Input label="Password" onChange={e => setPassword(e.target.value)} value={password} type="password" required />
      <Button onClick={onSubmit}>Log In</Button>
      <ErrorText>{errorText}</ErrorText>
    </FormContainer>
  );
};

export default LoginForm;