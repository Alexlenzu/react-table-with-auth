import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const userAdmin = {
    username: 'admin',
    password: 'admin123',
  };
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [userPassWord, setPassWord] = useState('');

  const handleReset = () => {
    setUserName('');
    setPassWord('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login', userAdmin).then((res) => {
      let data = res.data;
      localStorage.setItem('token', data.token);
      console.log(data.token);
    });

    if (
      userName === userAdmin.username &&
      userPassWord === userAdmin.password
    ) {
      history.push('/main');
    } else {
      alert('Hint: admin & admin123');
      handleReset();
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={(e) => handleSubmit(e)} className='login-form'>
        <h1 className='login-title'>Login Account</h1>
        <div className='flex-input'>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className='flex-input'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={userPassWord}
            onChange={(e) => setPassWord(e.target.value)}
            required
          />
        </div>
        <div>
          <input type='submit' value='Login' className='login-button' />
        </div>
      </form>
      <div className='login-container'></div>
    </div>
  );
}

export default Login;
