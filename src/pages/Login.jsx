import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext.jsx';


function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={async (values) => {
        try {
          const response = await fetch(`http://localhost:3003/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          console.log(response.status)
          if (response.ok) {
            const data = await response.json()
            login(data)
            navigate('/', { replace: true })
          } else {
            document.querySelector('#error-login').classList.remove('visually-hidden')
          }
        } catch (error) {
          console.log(error.message)
        }
      }}
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
              <Field className="form-control" type="password" name="password" placeholder="Entrer votre mot de passe" />
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
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Login;
