import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const ModalComponent = ({ header, message, onHide, onConfirm, ...props }) => {
    return (
        <Modal
            {...props}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{header || ''}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message || ''}</p>
            </Modal.Body>
            <Modal.Footer>
              
                <Button variant="secondary" onClick={onHide}>
                    {onConfirm ? 'Cancel' : 'Close'}
                </Button>
            
                {onConfirm ? (
                    
                    <Button variant="primary" onClick={onConfirm}>
                        Confirm
                    </Button>
                   
                ) : null}
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComponent;
