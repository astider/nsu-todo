import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 8px;
`;

const Label = styled.span`
  text-align: left;
  margin-bottom: 8px;
`;

const ModInput = styled.input`
  padding: 8px;
  height: 25px;
  font-size: 14px;
`;

const Input = (props) => {
  const { label = '', onChange, value } = props;
  return (
    <Container>
      <Label>{label}</Label>
      <ModInput onChange={onChange} value={value} {...props} />
    </Container>
  )
};

export default Input;
