import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Edit from './components/Edit';
import Post from './components/Post';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [userList, setUserlist] = useState([]);

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:5000/users', {
        headers: { 'x-access-token': `${token}` },
      })
      .then((res) => {
        const users = res.data;

        setUserlist(users);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/main'>
            <Main fetchUsers={fetchUsers} userList={userList} />
          </Route>
          <Route exact path='/main/user/edit/:id'>
            <Edit fetchUsers={fetchUsers} />
          </Route>
          <Route exact path='/main/user/post'>
            <Post fetchUsers={fetchUsers} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
