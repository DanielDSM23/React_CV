import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext.jsx';

const { VITE_API_URL } = import.meta.env;

function ProfileEditor() {
  const navigate = useNavigate();
  const { login, getUserInfos } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const user = getUserInfos();

  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  }, [login, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${VITE_API_URL}/api/users/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log(data)
      setProfile(data);
    };
    fetchData();
  }, [user.token]);

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch(`${VITE_API_URL}/api/users/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log(response.status);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/my-cv', { replace: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!profile) {
    return <div>Loading...</div>; // Render a loading state while fetching profile
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }} // Full page height and background color
    >
      <Formik
        initialValues={{
          firstname: profile.firstname,
          lastname: profile.lastname,
          description: profile.description,
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          firstname: Yup.string().required('Requis'),
          lastname: Yup.string().required('Requis'),
          description: Yup.string().required('Requis'),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={'bg-white rounded shadow px-4 py-5'}>
              <div className="form-group">
                <label htmlFor="firstname">Prénom :</label>
                <Field
                  className="form-control"
                  type="text"
                  name="firstname"
                  placeholder="Entrer votre prenom"
                />
                <ErrorMessage style={{ color: 'red' }} name="firstname" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Nom :</label>
                <Field
                  className="form-control"
                  type="text"
                  name="lastname"
                  placeholder="Entrer votre nom"
                />
                <ErrorMessage style={{ color: 'red' }} name="lastname" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description :</label>
                <Field
                  className="form-control"
                  type="text"
                  name="description"
                  placeholder="Entrer votre description"
                />
                <ErrorMessage style={{ color: 'red' }} name="description" component="div" />
              </div>
              <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
                Modifier
              </button>
              <br />
              <br />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileEditor;
