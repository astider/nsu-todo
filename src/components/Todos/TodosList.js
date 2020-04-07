import React, { useState } from 'react';
import styled from 'styled-components';

import TodoCard from './TodoCard';

const Container = styled.div`
`;

const ConfirmContainer = styled.div`
  height: auto;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid lightgrey;
`; 

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const CreateButton = styled.div`
  width: 200px;
  height: 50px;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 16px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled(CreateButton)`
  background-color: lightgrey;
`;

const TodoList = ({ todoData, editTodo, deleteTodo }) => {
  const [target, setTarget] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmDelete = (id) => {
    const target = todoData.find(t => t._id === id);
    setTarget(target);
    setShowConfirm(true);
  };

  const deleteAction = () => {
    setShowConfirm(false);
    deleteTodo(target._id);
  }

  if (todoData && todoData.length === 0) {
    return 'No Todo right now. Create one!';
  } else if (showConfirm) {
      return (
        <ConfirmContainer>
          <TodoContainer>
            Do you want to delete {target.title}
          </TodoContainer>
          <ButtonContainer>
            <CancelButton onClick={() => setShowConfirm(false)}>Cancel</CancelButton>
            <CreateButton onClick={deleteAction}>Delete</CreateButton>
          </ButtonContainer>
        </ConfirmContainer>
    );
  }
  return (
    <Container>
      <TodoContainer>
        {todoData.map((todo, i) => (
          <TodoCard
            key={`${i}-todo.title`}
            title={todo.title}
            description={todo.description}
            date={todo.updatedAt}
            editTodo={() => editTodo(todo._id)}
            deleteTodo={() => confirmDelete(todo._id)}
          />
        ))}
      </TodoContainer>
    </Container>
  );
};

export default TodoList;