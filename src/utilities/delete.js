const deleteComponentCode = () => `
    import React, { useState } from "react";
    import axios from "axios";
    import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

    const Delete = ({ isOpen, toggle, getData, id }) => {

      const handleSubmit = () => {
        axios
        .delete(process.env.REACT_APP_BASE_URL + "deletecruds/" + id)
          .then(() => {
            getData();
            toggle();
          })
          .catch((error) => console.log(687, error));
      };
      return(
        <>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete this record?</ModalBody>
          <ModalFooter>
          <Button color="danger" onClick={toggle}>No</Button>
          <Button color="success" onClick={handleSubmit}>Yes</Button>
          </ModalFooter>
        </Modal>
        </>
          );
          };
        export default Delete;
  `;
export default deleteComponentCode;
