import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import LoginForm from './components/LoginForm';
import MainTodo from './components/Todos';

const getUserData = () => {
  return !!window.localStorage.getItem('access-token');
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(31, 200, 219);
  background-image: linear-gradient(141deg, rgb(159, 184, 173) 0%, rgb(31, 200, 219) 51%, rgb(44, 181, 232) 75%);
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 32px;
  width: 45%;
  background-color: white;
  border-radius: 8px;
`;

const Header = styled.h1`
  font-weight: 400;
`;


function App() {
  const [, setReload] = useState(false);
  const user = getUserData();

  if (!user) {
    return (
      <MainContainer>
        <InnerContainer>
          <Header>Log in</Header>
          <LoginForm setReload={setReload} />
        </InnerContainer>
      </MainContainer>
    );
  }
  return (
    <Fragment>
      <MainContainer>
        <InnerContainer>
          <MainTodo />
        </InnerContainer>
      </MainContainer>
    </Fragment>
  );
}

export default App;
