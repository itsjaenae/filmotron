import React from 'react';
import '../styles/TextArea.css';
const TextArea = ({ name, label, error, Icon, rows, className, ...rest }) => {
    return (
        <div className={`text-area-container ${className}`}>
            {label && <label> {label} </label>}
            {Icon && <Icon className={`text-area-icon ${label ? '' : 'no-label'}`} />}
            <textarea name={name} {...rest} rows={rows} />
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
};

export default TextArea;
