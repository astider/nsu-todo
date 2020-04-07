import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TodoList from './TodosList';
import TodosForm from './TodosForm';

import api from '../../utils/api';

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

const MainTodo = (props) => {
  const [reloader, setReloader] = useState(false);
  const [view, setView] = useState('list'); // list, form
  const [mode, setMode] = useState('create'); // list, form

  const [todoData, setTodoData] = useState([]);
  const [targetTodo, setTargetTodo] = useState({});
  
  const getTodoData = async () => {
    const { data } = await api.get('todos/');
    setTodoData(data);
  };

  useEffect(() => {  
    getTodoData();
  }, [reloader]);

  const prepareCreateTodo = () => {
    setTargetTodo({});
    setMode('create');
    setView('form');
  };

  const prepareEditTodo = (id) => {
    const target = todoData.find(t => t._id === id);
    setTargetTodo(target);
    setMode('edit');
    setView('form');
  };

  const cancelState = () => {
    setTargetTodo({});
    setView('list');
  }

  const createTodo = async () => {
    try {
      const { title, description } = targetTodo;
      console.log('create', title, description);
      await api.post('todos/', {
        title,
        description
      });
      setView('list');
      setReloader(!reloader);
    } catch (e) {
      console.log(e);
    }
  };

  const editTodo = async (title, description) => {
    try {
      const { _id, title, description } = targetTodo;
      console.log('edit', title, description);
      await api.put(`todos/${_id}`, {
        title,
        description
      });
      setView('list');
      setReloader(!reloader);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id) => {
    const target = todoData.find(t => t._id === id);
    if (!target) return;
    await api.delete(`todos/${id}`);
    setReloader(!reloader);
  };

  if (view === 'list') {
    return (
      <div>
        <TodoList editTodo={prepareEditTodo} deleteTodo={deleteTodo} todoData={todoData} />
        <ButtonContainer>
          <CreateButton onClick={prepareCreateTodo}>+ Create new Todo</CreateButton>
        </ButtonContainer>
      </div>
    );
  }

  return (
    <div>
      <TodosForm
        todo={targetTodo}
        setTodo={setTargetTodo}
        mode={mode}
      />
      <ButtonContainer>
        <CancelButton onClick={cancelState}>Cancel</CancelButton>
        <CreateButton onClick={mode === 'create' ? createTodo : editTodo}>Done</CreateButton>
      </ButtonContainer>
    </div>
  );
}

export default MainTodo;