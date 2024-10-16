import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function Register() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        login: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={async (values) => {
        const postForm = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          data: values
        });
        const data = await postForm.json();
        console.log(data);
        navigate('/');
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .max(10, 'Must be 15 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        login: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        password: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required')
      })}>
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <Field className="form-control" type="name" name="name" />
            <ErrorMessage style={{ color: 'red' }} name="name" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <Field className="form-control" type="email" name="email" />
            <ErrorMessage style={{ color: 'red' }} name="email" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="login">Login:</label>
            <Field className="form-control" type="login" name="login" />
            <ErrorMessage style={{ color: 'red' }} name="login" component="div" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <Field className="form-control" type="password" name="password" />
            <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
          </div>

          <div className="form-group">
            <label htmlFor="confirPassword">Confirm Password:</label>
            <Field className="form-control" type="confirPassword" name="confirPassword" />
            <ErrorMessage style={{ color: 'red' }} name="password" component="div" />
          </div>
          <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
