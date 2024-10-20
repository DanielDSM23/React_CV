import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext.jsx';

const {
  VITE_API_URL
} = import.meta.env;


function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  if(login){
    navigate('/');
  }

  const handleSubmit = async (values) => {
    console.log(values)
    try {
      const response = await fetch(`${VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      console.log(response.status)
      if (response.ok) {
        const data = await response.json()
        login(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate('/', { replace: true })
      } else {
        document.querySelector('#error-login').classList.remove('visually-hidden')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh'}} // Full page height and background color
    >
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          email: Yup.string().required('Required'),
          password: Yup.string().required('Required')
        })}>
        {({ isSubmitting }) => (
          <Form>
            <div className={'bg-white rounded shadow px-4 py-5'}>
              <div className="form-group">
                <label htmlFor="login">Adresse Mail:</label>
                <Field
                  className="form-control"
                  type="email"
                  name="email"
                  size="40"
                  placeholder="Entrer votre adresse mail"
                />
                <ErrorMessage style={{ color: 'red' }} name="email" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="login">Mot de passe:</label>
                <Field className="form-control" type="password" name="password"
                       placeholder="Entrer votre mot de passe" />
                <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
              </div>
              <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
                Se connecter
              </button>
              <br />
              <br />
              <div className={'visually-hidden alert alert-danger'} id={'error-login'} role="alert">
                Les informations renseignées sont incorrectes
              </div>
              <Link to={"/register"}>
                Creer compte
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>)
      }

      export default Login;
