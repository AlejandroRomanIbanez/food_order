import React from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  alignItems: "center",
  justifyContent: "center",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateFormModal = ({
  open,
  handleClose,
  formComponent: FormComponent,
  isEdit,
  cartEvent,
  setIsEdit,
  selectedCategory,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormComponent
            handleClose={handleClose}
            isEdit={isEdit}
            cartEvent={cartEvent}
            setIsEdit={setIsEdit}
            selectedCategory={selectedCategory}
          />
        </Box>
      </Modal>
    </>
  );
};

export default CreateFormModal;
