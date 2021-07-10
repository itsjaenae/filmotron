import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { Alert } from 'react-bootstrap';
import '../styles/Register.css';
import {Link} from "react-router-dom"
import Input from '../components/Input';
import { addUser } from '../api/User';


const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required.')
        .max(20, 'Username cannot be longer than 20 characters.'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must have at least 6 characters.'),
    confirmPassword: yup
        .string()
        .required('Confirm password is required.')
        .oneOf([yup.ref('password'), null], 'Passwords must match.')
});

const Register = () => {
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();

    return (
        <div className="register-bcg">
        <div className="register-container" >
            <h1 className="register-title">Create Account</h1>

            <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    setSubmitting(true);
                    try {
                        const res = await addUser(values.username, values.password);
                        if (res.status === 201) {
                            history.push('/signin');
                        }
                    } catch (err) {
                        if (err.response.data.userExists) {
                            setStatus({ username: 'Username already exists.' });
                        } else {
                            setShowAlert(true);
                        }
                    }
                    setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting, touched, status, handleSubmit }) => (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit();
                        }}
                        className="register-form"
                    >
                        <Alert className="error"
                            variant="danger"
                            show={showAlert}
                            onClose={() => setShowAlert(false)}
                            dismissible
                            transition={false}
                        >
                            <Alert.Heading>Server Error</Alert.Heading>
                            An error occured has occured on the server. Please try again at a later
                            time.
                        </Alert> 
                        {/* <label htmlFor="name">username</label> */}
                     <Field
                            name="username"
                            type="input"
                            label="Username"
                            as={Input}
                            placeholder="Enter username"
                           
                            error={
                                (status && status.username) ||
                                (touched['username'] && errors['username'])
                            }
                            className="register-input"
                        />
                           {/* <label htmlFor="email">Password</label> */}
                        <Field
                            name="password"
                            type="password"
                            label="Password"
                            as={Input}
                            placeholder="Enter password"
                            error={touched['password'] && errors['password']}
                            className="register-input"
                        />
                          {/* <label htmlFor="email">Password</label> */}
                        <Field
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            as={Input}
                            placeholder="Confirm password"
                            error={touched['confirmPassword'] && errors['confirmPassword']}
                            className="register-input"
                        />
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            variant="danger"
                            size="lg"
                            className="register-submit"
                        >
                            Register
                        </button>
                        
          <p className="register-text">
            Already a user?
             <Link to='/signin' className="register-link register-text">Sign in now.</Link>
          </p>
          <p className="register-textSmall">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </p>
                    </Form>
                )}
            </Formik>
        </div>
         </div>
    );
};

export default Register;
