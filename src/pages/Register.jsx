import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const { VITE_API_URL } = import.meta.env;

function Register() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-white rounded shadow px-4 py-5"
      style={{ height: '100vh' }}
    >
      <div className="form-container">
        <h2 className="text-center">Inscription</h2>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            description: ''
          }}
          onSubmit={async (values) => {
            const postForm = await fetch(`${VITE_API_URL}/api/auth/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            });
            const data = await postForm.json();
            console.log(data);
            navigate('/login');
          }}
          validationSchema={Yup.object({
            firstname: Yup.string().required('Requis'),
            lastname: Yup.string().required('Requis'),
            description: Yup.string().required('Requis'),
            email: Yup.string().email('Adresse email invalide').required('Requis'),
            password: Yup.string().min(10, 'Doit faire au maximum 10 caractères').required('Requis'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
              .required('Requis'),
          })}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="firstname">Prénom :</label>
                <Field className="form-control" type="text" name="firstname" />
                <ErrorMessage style={{ color: 'red' }} name="firstname" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Nom :</label>
                <Field className="form-control" type="text" name="lastname" />
                <ErrorMessage style={{ color: 'red' }} name="lastname" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description :</label>
                <Field className="form-control" type="text" name="description" />
                <ErrorMessage style={{ color: 'red' }} name="description" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email :</label>
                <Field className="form-control" type="email" name="email" />
                <ErrorMessage style={{ color: 'red' }} name="email" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe :</label>
                <Field className="form-control" type="password" name="password" />
                <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
                <Field className="form-control" type="password" name="confirmPassword" />
                <ErrorMessage style={{ color: 'red' }} name="confirmPassword" component="div" />
              </div>
              <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
                S'inscrire
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
