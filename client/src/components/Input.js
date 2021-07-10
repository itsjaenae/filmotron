import React from 'react';
import '../styles/Input.css';

const Input = ({ name, label, error, Icon, className, ...rest }) => {
    return (
        <div className={`input-container ${className}`}>
            {label && <label> {label} </label>}
            <input name={name} {...rest} />
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Input;
