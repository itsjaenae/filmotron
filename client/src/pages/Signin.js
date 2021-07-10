import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { Alert } from 'react-bootstrap';
import '../styles/Signin.css';
import { signInUser } from '../api/User';
import Input from '../components/Input';
import { useAuthContext } from '../contexts/AuthContext';
import {Link} from "react-router-dom"


const SERVER_ERROR_MESSAGE = {
    heading: 'Server Error',
    message: 'An error occured has occured on the server. Please try again at a later time'
};
const CREDENTIAL_ERROR_MESSAGE = {
    message: 'The username or password you entered is incorrect.'
};

const Signin = () => {
    const { setIsAuth, setCurrentUserId } = useAuthContext();
    const [showAlert, setShowAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const history = useHistory();

    const handleSignIn = async (username, password) => {
        try {
            const res = await signInUser(username, password);
            if (res.status === 200) {
                setIsAuth(true);
                setCurrentUserId(res.data.userId);
                history.push('/');
            }
        } catch (err) {
            if (err.response.data.incorrectCredentials) {
                setErrorMsg(CREDENTIAL_ERROR_MESSAGE);
            } else {
                setErrorMsg(SERVER_ERROR_MESSAGE);
            }
            setShowAlert(true);
        }
    };

    return (
      <div className="register-bcg">
        <div className="signin-container">
            <h1 className="signin-title">Sign in</h1>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await handleSignIn(values.username, values.password);
                    //solution for memory leak when setSubmitting : https://github.com/formium/formik/issues/2430
                    if (window.location.pathname === '/signin') setSubmitting(false);
                }}
            >
                {({ isSubmitting, handleSubmit }) => (
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit();
                        }}
                        className="signin-form"
                    >
                        <Alert
                            variant="danger"
                            show={showAlert}
                            onClose={() => setShowAlert(false)}
                            dismissible
                            transition={false}
                        >
                            {errorMsg && errorMsg.heading ? (
                                <Alert.Heading>{errorMsg.heading}</Alert.Heading>
                            ) : null}
                            {errorMsg && errorMsg.message}
                        </Alert>
                        <Field
                            name="username"
                            type="input"
                            as={Input}
                            label="Username"
                            placeholder="Enter username"
                            className="signin-input"
                        />
                        <Field
                            name="password"
                            type="password"
                            as={Input}
                            label="Password"
                            placeholder="Enter password"
                            className="signin-input"
                        />
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            variant="danger"
                            size="lg"
                            className="signin-submit"
                        >
                            Sign in
                        </button>

                        <p className="signin-text">
  New to Filmotron? <Link to='/signin' className="signin-link signin-text">Sign up now.</Link>
</p>
<p className="signin-textSmall">
  This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
</p>
                    </Form>
                )}
            </Formik>
        </div>
        </div>
    );
};

export default Signin;
