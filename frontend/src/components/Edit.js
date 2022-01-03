import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import axios from 'axios';

function Edit({ fetchUsers }) {
  let history = useHistory();
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [formState, setFormState] = useState({
    fullName: '',
    adress: '',
    phoneNumber: '',
    email: '',
  });
  const onInputChange = (e) => {
    e.preventDefault();
    const newFormState = { ...formState };
    newFormState[e.target.name] = e.target.value;

    setFormState(newFormState);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const body = { ...formState };
    delete body._id;
    
    axios
      .put(`http://localhost:5000/users/${id}`, body, {
        headers: { 'x-access-token': `${token}` },
      })
      .then((res) => {
        fetchUsers();
        history.push('/main');
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`, {
        headers: { 'x-access-token': `${token}` },
      })
      .then((res) => {
        const user = res.data;
        setFormState(user);
      });
  }, [id, token, setFormState]);

  return (
    <form className='user-form' onSubmit={handleUpdateUser}>
      <input
        type='text'
        name='fullName'
        placeholder='Enter a name'
        value={formState.fullName}
        onChange={onInputChange}
      />
      <input
        type='text'
        name='adress'
        placeholder='Enter an adress'
        value={formState.adress}
        onChange={onInputChange}
      />
      <input
        type='text'
        name='phoneNumber'
        placeholder='Enter a phone number'
        value={formState.phoneNumber}
        onChange={onInputChange}
      />
      <input
        type='text'
        name='email'
        placeholder='Enter an email'
        value={formState.email}
        onChange={onInputChange}
      />
      <button type='submit'>Update</button>
    </form>
  );
}

export default Edit;
