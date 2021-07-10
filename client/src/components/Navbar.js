import React from 'react';
//import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuthContext } from '../contexts/AuthContext';
import { signOutUser } from '../api/User';

const Navbar = () => {
    const { isAuth, setIsAuth } = useAuthContext();
    const handleSignOut = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (isAuth) {
                const res = await signOutUser();
                if (res.status === 200) {
                    setIsAuth(false);
                }
            }
        } catch {
            alert('An error has occured. Please try again.');
        }
    };
    return (
           <div className="header-container">
            <Link to="/movies" className="header-logo">
            <h2>FILMOTRON</h2>
            </Link>

              <div className="header-group">
                <div className="header-links">
                    <Link to='/movies/new'>
                    Upload Movie
                    </Link>
                    {isAuth ? null : (
                        <>
                            <Link to='/signin'>
                                Sign In
                            </Link>
                            <Link to='/register'>
                                Register
                            </Link>
                        </>
                    )}
                    {isAuth ? <Link to= "/signin" onClick={handleSignOut}>
                         Sign Out</Link> : null}
                </div>
                </div>
            </div>
    );
};

export default Navbar;
