import React, { useState } from 'react';
import axios from 'axios';

function Post({ fetchUsers }) {
  const token = localStorage.getItem('token');
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

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (isNaN(formState.phoneNumber)) {
      alert('Invalid phone number');
    } else {
      const newUser = {
        fullName: formState.fullName,
        adress: formState.adress,
        phoneNumber: formState.phoneNumber,
        email: formState.email,
      };

      axios
        .post('http://localhost:5000/users', newUser, {
          headers: { 'x-access-token': `${token}` },
        })
        .then(() => {
          setFormState({
            fullName: '',
            adress: '',
            phoneNumber: '',
            email: '',
          });
          fetchUsers();
        });
    }
  };

  return (
    <form className='user-form' onSubmit={handleSubmitUser}>
      <input
        type='text'
        name='fullName'
        placeholder='Enter a name'
        value={formState.fullName}
        onChange={onInputChange}
        required
      />
      <input
        type='text'
        name='adress'
        placeholder='Enter an adress'
        value={formState.adress}
        onChange={onInputChange}
        required
      />
      <input
        type='text'
        name='phoneNumber'
        placeholder='Enter a phone number'
        value={formState.phoneNumber}
        onChange={onInputChange}
        required
      />
      <input
        type='text'
        name='email'
        placeholder='Enter an email'
        value={formState.email}
        onChange={onInputChange}
        required
      />
      <button type='submit' className='add-user'>
        Add User
      </button>
    </form>
  );
}

export default Post;
