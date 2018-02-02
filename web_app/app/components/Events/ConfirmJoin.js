import React from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

import './ConfirmJoin.css';

const ConfirmJoin = ({ isOpen, onClickCancel, onClickJoinme }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader className="header-modal">
        Do you want join at Event?
      </ModalHeader>
      <ModalBody className="body-modal">
        <Button outline color="danger" onClick={onClickCancel}>
          <span className="fa fa-close" /> i don't
        </Button>
        <Button outline color="success" onClick={onClickJoinme}>
          <span className="fa fa-users" /> join me
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default ConfirmJoin;
