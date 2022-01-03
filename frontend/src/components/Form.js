import React from 'react';
import { useState } from 'react';
import Post from './Post';
import Edit from './Edit';

function Form({ fetchUsers, editId }) {
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

  return (
    <>
      {editId ? (
        <Edit
          fetchUsers={fetchUsers}
          formState={formState}
          onInputChange={onInputChange}
          editId={editId}
          setFormState={setFormState}
        />
      ) : (
        <Post
          fetchUsers={fetchUsers}
          formState={formState}
          onInputChange={onInputChange}
        />
      )}
    </>
  );
}

export default Form;
