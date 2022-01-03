import React from 'react';
import UserList from './UserList';
import Post from './Post';



function Main({userList, fetchUsers}) {
  
  return (
    <div className="main-bg">
      <UserList userList={userList} fetchUsers={fetchUsers}/>
      <Post fetchUsers={fetchUsers}/>
      
    </div>
  );
}

export default Main;
