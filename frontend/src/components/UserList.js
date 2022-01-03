import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';

function UserList({ userList, fetchUsers }) {
  let history = useHistory();
  // console.log(userList)
  
  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/users/${id}`, {
        headers: { 'x-access-token': `${token}` },
      })
      .then((res) => {
        console.log(res);
        fetchUsers();
      });
  };

 
  return (
    <div className='list-container'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Adress</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.adress}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className='delete-user'
                  onClick={(e) => handleDelete(user._id, e)}
                >
                  Delete user
                </button>
                <button
                  className='edit-user'
                  onClick={() => history.push(`main/user/edit/${user._id}`)}
                >
                  Edit user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
