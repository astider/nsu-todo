import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  width: 100%;
  min-height: 100px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  text-align: left;
  border-radius: 8px;
  border: 1px solid black;
  padding: 8px 16px;
  box-sizing: border-box;
  cursor: pointer;
`;

const Title = styled.p`
  margin-top: 0;
  font-size: 20px;
`;

const Delete = styled.p`
  font-size: 14px;
  text-align: right;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Date = styled.p`
  margin: 0;
  font-size: 10px;
  text-align: right;
`;

const TodoCard = ({ title = '', description = '', date, editTodo, deleteTodo }) => {
  return (
    <Container onClick={editTodo}>
      <Delete onClick={e => { e.stopPropagation(); deleteTodo()}}>X</Delete>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {date && <Date>{moment(date).format('DD/MM/YYYY')}</Date>}
    </Container>
  )
};

export default TodoCard;