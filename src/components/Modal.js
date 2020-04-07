import React from 'react';
import styled from 'styled-components'


const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Modal = ({ isVisible = false, children}) => {
  if (!isVisible) return null;
  console.log('sdsdsddsds');
  return (
    <ModalContainer>
      {children}
    </ModalContainer>
  )
};

export default Modal;