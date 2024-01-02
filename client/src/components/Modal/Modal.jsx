import React from 'react';
import ReactModal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, contentLabel, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      className="custom-modal" 
      overlayClassName="custom-modal-overlay" 
    >
      {children}
    </ReactModal>
  );
};

export default CustomModal;
