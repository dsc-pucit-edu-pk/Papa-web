import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  openEventModal?: boolean | undefined;
  setOpenEventModal?: React.Dispatch<React.SetStateAction<object>> | undefined;
}

export default function EventModal({
  openEventModal,
  setOpenEventModal,
}: Props) {
  return (
    <div>
      <Modal
        open={openEventModal}
        onClose={() =>
          setOpenEventModal({
            open: false,
            event: null,
          })
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    </div>
  );
}
