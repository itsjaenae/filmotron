import React from 'react';
//import './styles/styles.scss';
//import { BrowserRouter} from 'react-router-dom';
//components
 import Routes from './routes/Routes';
import Footer from './components/Footer';
//contexts
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MoviesContext';
import { MovieInfoProvider } from './contexts/MovieInfoContext';

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <MovieProvider>
                    <MovieInfoProvider>
                        <Routes />
                        <Footer />
                    </MovieInfoProvider>
                </MovieProvider>
            </AuthProvider>
        </div>

       );
  };

  export default App;


