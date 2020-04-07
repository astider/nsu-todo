import React from 'react';
import styled from 'styled-components';

import Input from '../Input';

const Container = styled.div`
  width: 100%;
  padding: 8px;
`;

const TodosForm = (props) => {
  const { todo, setTodo } = props;

  const setTitle = (newTitle) => {
    setTodo({
      ...todo,
      title: newTitle
    })
  };

  const setDescription = (newDescription) => {
    setTodo({
      ...todo,
      description: newDescription
    })
  };
  
  return (
    <Container>
      <Input label="Title" onChange={e => setTitle(e.target.value)} value={todo ? todo.title : ''} required />
      <Input label="Description" onChange={e => setDescription(e.target.value)} value={todo ? todo.description : ''} required />
    </Container>
  )
};

export default TodosForm;