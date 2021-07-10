import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
//components
import Navbar from '../components/Navbar';
import ScrollTop from '../components/ScrollTop';
//contexts
import { useAuthContext } from '../contexts/AuthContext';
//pages
import Movies from '../pages/Movies/Movies';
import AddMovie from '../pages/AddMovie/AddMovie';
import Register from '../pages/Register';
import Signin from '../pages/Signin';
import MovieInfo from '../pages/MovieInfo/MovieInfo';


const NotAuthRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (!isAuth ? <Component {...props} /> : <Redirect  to="/movies"  />)}
        />
    );
};

const PageRoutes = () => {
    const { isAuth } = useAuthContext();

    return (
        <div className="background-container">
            <Router>
                <Navbar />
                <ScrollTop />
                <Switch>
                    <Route exact path="/movies/new" render={(props) => <AddMovie {...props} />} />
                    <Route exact path="/movies" render={(props) => <Movies {...props} />} />
                    <Route path="/movies/:id" render={(props) => <MovieInfo {...props} />} />
                    <NotAuthRoute exact path="/register" component={Register} isAuth={isAuth} />
                    <NotAuthRoute exact path="/signin" component={Signin} isAuth={isAuth} />;
                    <Redirect to="/movies" />
                </Switch>
            </Router>
        </div>
    );
};

export default PageRoutes;
