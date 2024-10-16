import React, { useEffect, useState } from 'react';
import Search from '../components/Search.jsx';
import { Link } from 'react-router-dom';

function Users(props) {
  const [users, setUsers] = useState([]);
  const [criteria, setCriteria] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.name.toLowerCase().includes(criteria.toLowerCase())));
  }, [criteria, users]);

  return (
    <>
      <Search criteria={criteria} setCriteria={setCriteria} />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Users;
