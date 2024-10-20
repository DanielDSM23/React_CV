import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext.jsx';
import PropTypes from 'prop-types';

const { VITE_API_URL } = import.meta.env;

EduEditor.propTypes = {
  methodRequest: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
};

function EduEditor({ methodRequest, textButton }) {

  let eduInitialValue;

  if(methodRequest === 'POST'){
    eduInitialValue = [];
  }
  else{
    eduInitialValue = null;
  }


  const { id } = useParams();
  const navigate = useNavigate();
  const { login, getUserInfos } = useContext(UserContext);
  const [institution, setInstitution] = useState(eduInitialValue);
  const user = getUserInfos();

  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  }, [login, navigate]);

  useEffect(() => {
    if (methodRequest === 'POST') {
      return;
    }
    const fetchData = async () => {
      const response = await fetch(`${VITE_API_URL}/api/cv/education/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setInstitution(data);
    };
    fetchData();
  }, [user.token, id, methodRequest]);

  const handleSubmit = async (values) => {
    Object.keys(values).forEach((key) => {
      if (values[key] === undefined) {
        delete values[key];
      }
    });

    // Format dates to ISO 8601 string
    if (values.startDate) {
      values.startDate = new Date(values.startDate).toISOString(); // Converts to '2024-10-14T21:04:53.714Z'
    }
    if (values.endDate) {
      values.endDate = new Date(values.endDate).toISOString(); // Converts to '2024-10-14T21:04:53.714Z'
    }

    console.log(values);
    try {
      let idProfession = id;
      if (methodRequest === 'POST') {
        idProfession = '';
      }
      const response = await fetch(`${VITE_API_URL}/api/cv/education/${idProfession}`, {
        method: methodRequest,
        headers: {
          Authorization: `Bearer ${user.token}`,
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD for the input
  };

  if (!institution) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Formik
        initialValues={{
          title: institution.title,
          institution: institution.institution,
          startDate: formatDate(institution.startDate),
          endDate: formatDate(institution.endDate),
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          title: Yup.string().required('Requis'),
          institution: Yup.string().required('Requis'),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={'bg-white rounded shadow px-4 py-5'}>
              <div className="form-group">
                <label htmlFor="title">Titre :</label>
                <Field className="form-control" type="text" name="title" placeholder="Entrer votre titre" />
                <ErrorMessage style={{ color: 'red' }} name="title" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="institution">Etablissement :</label>
                <Field className="form-control" type="text" name="institution" placeholder="Entrer votre établissement" />
                <ErrorMessage style={{ color: 'red' }} name="institution" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Date d&#39;entrée :</label>
                <Field className="form-control" type="date" name="startDate" />
                <ErrorMessage style={{ color: 'red' }} name="startDate" component="div" />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">Date de sortie :</label>
                <Field className="form-control" type="date" name="endDate" />
                <ErrorMessage style={{ color: 'red' }} name="endDate" component="div" />
              </div>
              <button className="btn btn-primary mt-3" type="submit" disabled={isSubmitting}>
                {textButton}
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

export default EduEditor;
