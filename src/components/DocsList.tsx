import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { DELETE, stateType } from "./features/slice";
import { Button, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { modalHeader, modalStyle } from "./Styles";
// this component is responsible for view documents lisiting
// and view modal for document text content
const DocsList = ({
  updateIndex,
}: {
  updateIndex: (index: number) => void;
}) => {
  // get redux current state
  const state = useSelector((state: stateType) => state);
  //  dispatch function for call actions of reducers
  const dispatch = useDispatch();
  // responsible for content view modal
  const [open, setOpen] = React.useState(false);
  // hold document index when user click on any document
  const [index, setIndex] = useState(-1);
  // function for open modal
  const handleOpen = () => setOpen(true);
  // function for close modal and default index set
  const handleClose = () => {
    setOpen(false);
    setIndex(-1);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          pt: 0,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
        }}
      >
        {state.document.length > 0 ? (
          state.document.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                position: "relative",
                marginTop: "50px",
                marginLeft: "10px",
                marginRight: "10px",
                minWidth: "47%",
              }}
            >
              <Button
                variant="contained"
                color="warning"
                component="label"
                onClick={() => {
                  handleOpen();
                  setIndex(index);
                }}
                sx={{ minWidth: "100%", fontSize: "18px", minHeight: "60px" }}
              >
                {item.title}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  position: "absolute",
                  top: -35,
                  right: -20,
                }}
              >
                <Button>
                  <ModeEditIcon
                    onClick={() => {
                      updateIndex(index);
                    }}
                  />
                </Button>
                <Button>
                  <DeleteIcon
                    sx={{ color: "red" }}
                    onClick={() => dispatch(DELETE(index))}
                  />
                </Button>
              </Box>
            </Box>
          ))
        ) : (
          <Typography
            sx={{ textAlign: "center", width: "100%", color: "grey" }}
            id="keep-mounted-modal-title"
            variant="h6"
            component="p"
          >
            No Documents available
          </Typography>
        )}
      </Box>
      {/* modal given below to view document content */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            ...modalStyle,
            width: "50%",
            minWidth: "300px",
            minHeight: "150px",
          }}
        >
          <Box sx={modalHeader}>
            <Typography
              sx={{ display: "inline" }}
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Read Document Content
            </Typography>
            <HighlightOffIcon onClick={handleClose} color="error" />
          </Box>
          <Typography id="keep-mounted-modal-title" component="p">
            {index !== -1 && state.document[index].content}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default DocsList;
