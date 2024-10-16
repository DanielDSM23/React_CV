import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserProfile(props) {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await response.json();
      console.log(data);
      setUser(data);
    };
    fetchData();
  }, []);

  if (!user) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="card" style={{ width: '18rem' }}>
        <img src="" className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{user?.name}</h5>
          <p className="card-text">{user?.email}</p>
          <p className="card-text">{user?.address.city}</p>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
