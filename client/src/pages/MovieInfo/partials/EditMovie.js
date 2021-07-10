import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Container, Button, Alert } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { FaClock, FaFilm, FaAddressCard, FaInfo, FaLink, FaImage } from 'react-icons/fa';
//components
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
//api
import { updateMovie } from '../../../api/Movie';
//context
import { useAuthContext } from '../../../contexts/AuthContext';
import { useMovieInfoContext, ADMIN_ACTIONS } from '../../../contexts/MovieInfoContext';
import "../../../styles/EditMovie.css";


const FILE_SIZE = 3 * 1000000; //3MB
const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required.'),
    genre: yup.string().required('Genre is required'),
    trailerLink: yup.string().required('Trailer link is required.'),
    hours: yup
        .number()
        .required('Hours is required.')
        .positive('Must be positive.')
        .integer('Must be an integer.')
        .min(0, 'Minimum is 0.'),
    minutes: yup
        .number()
        .required('Minutes is required.')
        .positive('Must be an intbe postive.')
        .integer('Must eger.')
        .min(0, 'Minimum is 0.')
        .max(59, 'Maximum is 59.'),
    description: yup.string().required('Description is required.'),
    image: yup
        .mixed()
        .notRequired()
        .test('fileFormat', 'Format must be jpg, jpeg, png', (value) => {
            //if file is included
            if (value) {
                return SUPPORTED_IMAGE_FORMATS.includes(value.type);
            }
            //return true if no file
            return true;
        })
        .test('fileSize', 'File is too large (max: 3MB)', (value) => {
            //if file is included
            if (value) {
                return value.size <= FILE_SIZE;
            }
            //return true if no file
            return true;
        })
});

const EditMovie = () => {
    const [serverError, setServerError] = useState(false);
    const { isAdmin } = useAuthContext();
    const { state, dispatch } = useMovieInfoContext();
    const { movie } = state;
    const { id: movieId } = useParams();

    return (
        <div className="p-5 mt-5">
            <Container>
     
                <Button
                    className="d-block editMovie"
                    onClick={() => dispatch({ type: ADMIN_ACTIONS.MOVIE_EDIT_END })}
                >
                    Cancel
                </Button>
             
            </Container>
            <h1 className="text-center mb-3">Edit Movie</h1>
            <Container>
                <Alert
                    variant="danger"
                    show={serverError}
                    onClose={() => {
                        setServerError(false);
                    }}
                    transition={false}
                >
                    An error has occurred on the server. Please try again at a later time.
                </Alert>
                <Alert variant="info" show={!isAdmin} transition={false}>
                    Only admins can update movies.
                </Alert>
                <Formik
                    initialValues={{
                        title: movie.title,
                        genre: movie.genre,
                        trailerLink: movie.trailerLink,
                        hours: movie.movieLength.hours,
                        minutes: movie.movieLength.minutes,
                        description: movie.description,
                        image: null
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        if (isAdmin) {
                            setSubmitting(true);
                            setServerError(false);
                            let mounted = true;
                            try {
                                const res = await updateMovie(values, movieId, state.movie.genre);
                                if (res.status === 200) {
                                    dispatch({ type: ADMIN_ACTIONS.MOVIE_EDIT_END });
                                    mounted = false;
                                }
                            } catch (err) {
                                setServerError(true);
                            }
                            //if update is successful, then component will unmount
                            if (mounted) setSubmitting(false);
                        }
                    }}
                >
                    {({
                        setFieldValue,
                        handleBlur,
                        errors,
                        isSubmitting,
                        handleSubmit,
                        touched
                    }) => (
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleSubmit();
                            }}
                        >
                            <Field
                                name="title"
                                type="input"
                                as={Input}
                                label="Title"
                                Icon={FaFilm}
                                placeholder="Enter title"
                                error={touched['title'] && errors['title']}
                                className="mb-1"
                            />
                            <Input
                                name="image"
                                type="file"
                                label="Cover Image (not required)"
                                Icon={FaImage}
                                onChange={(event) => {
                                    setFieldValue('image', event.target.files[0]);
                                }}
                                onBlur={handleBlur}
                                placeholder="Upload cover image"
                                error={touched['image'] && errors['image']}
                                className="mb-1"
                            />
                            <Row>
                                <Col>
                                    <Field
                                        name="genre"
                                        type="input"
                                        as={Input}
                                        label="Genre"
                                        Icon={FaAddressCard}
                                        placeholder="Enter genre"
                                        error={touched['genre'] && errors['genre']}
                                        className="mb-1"
                                    />
                                </Col>
                                <Col>
                                    <Field
                                        name="trailerLink"
                                        type="url"
                                        as={Input}
                                        label="Trailer Link"
                                        Icon={FaLink}
                                        placeholder="Enter trailer link"
                                        error={touched['trailerLink'] && errors['trailerLink']}
                                        className="mb-1"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Field
                                        name="hours"
                                        type="number"
                                        min={0}
                                        as={Input}
                                        label="Hours"
                                        Icon={FaClock}
                                        placeholder="Enter hours"
                                        error={touched['hours'] && errors['hours']}
                                        className="mb-1"
                                    />
                                </Col>
                                <Col>
                                    <Field
                                        name="minutes"
                                        type="number"
                                        min={0}
                                        max={59}
                                        as={Input}
                                        label="Minutes"
                                        Icon={FaClock}
                                        placeholder="Enter minutes"
                                        error={touched['minutes'] && errors['minutes']}
                                        className="mb-1"
                                    />
                                </Col>
                            </Row>
                            <Field
                                name="description"
                                type="text"
                                min={0}
                                rows={3}
                                as={TextArea}
                                label="Description"
                                Icon={FaInfo}
                                placeholder="Enter description"
                                error={touched['description'] && errors['description']}
                                className="mb-1"
                            />
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="danger"
                                size="lg"
                               
                                className="mt-3 editMovie"
                            >
                                Update movie
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
};

export default EditMovie;
