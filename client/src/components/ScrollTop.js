import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = (props) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location.pathname]);

    return null;
};

export default ScrollTop;
