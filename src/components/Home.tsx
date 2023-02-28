import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, TextField, Typography } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DocsList from "./DocsList";
import { modalFooter, modalHeader, modalStyle } from "./Styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { ADD, setAll, stateType, UPDATE } from "./features/slice";
import usePrimaryKey from "./custom_hooks/usePrimaryKey";
export const Home = () => {
  // initial local object for controlled input and an index s9ituated here 
  // which is only use for update functionality
  const initialObj = { title: "", content: "", index: -1 };
  // here is object state
  const [object, setObject] = useState(initialObj);
  // responsible for modal open close
  const [open, setOpen] = React.useState(false);
  // function for open modal
  const handleOpen = () => setOpen(true);
  // function for close modal and reset object value
  const handleClose = () => {
    setOpen(false);
    setObject(initialObj);
  };
  // get current state from redux
  const state = useSelector((state: stateType) => state);
  // dispatch function to call reducer actions init
  const dispatch = useDispatch();
  // for generate uniqe id for each document
  const { keyGenerator } = usePrimaryKey();

  //check data exist in local storage or not  
  useEffect(() => {
    if (localStorage.getItem("google_doc") != null) {
      let x: string | null = localStorage.getItem("google_doc");
      if (x != null)
        dispatch(
          setAll([...JSON.parse(x)])
        );
    }
  }, []);

    // update localstorage when redux state change
    useEffect(() => {
      setTimeout(() => {
        if(state.document)
        localStorage.setItem("google_doc", JSON.stringify(state.document));
      }, 100);
    }, [state.document]);

    // handle submit functionality for add and update also
  const HandleSubmit = () => {
    const { title, content } = object;
    const index = object.index;
    if (title && content) {
      if (index === -1) {
        dispatch(ADD({id:keyGenerator(state.document), title: object.title, content: object.content }));
        setObject(initialObj);
        handleClose();
      } else {
        dispatch(
          UPDATE({
            object: {...state.document[object.index], title: object.title, content: object.content },
            index: object.index,
          })
        );
        setObject(initialObj);
        handleClose();
      }
    }
  };

  // for update index hold when user want update
  const updateIndex = (index: number) => {
    
    handleOpen();
    setObject({ ...state.document[index], index: index });
  };


  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            minHeight: "50vh",
            margin: "20px 0px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ padding: "10px", marginBottom: "20px" }}
          >
            Google Docs
          </Typography>
          <Button
            onClick={handleOpen}
            variant="contained"
            endIcon={<NoteAddIcon />}
          >
            ADD NEW FILE
          </Button>

          <DocsList updateIndex={updateIndex} />
        </Box>
      </Container>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={modalHeader}>
            <Typography
              sx={{ display: "inline" }}
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              {object.index !== -1 ? "Update" : "Create"} Document
            </Typography>
            <HighlightOffIcon onClick={handleClose} color="error" />
          </Box>

          <Box sx={modalFooter}>
            <TextField
              helperText="Please enter document title"
              id="demo-helper-text-aligned"
              label="Title"
              multiline
              sx={{ m: 1, width: "95%", marginBottom: "10px" }}
              maxRows={1}
              onChange={(e) => {
                console.log(e.target.value);
                setObject({ ...object, title: e.target.value });
              }}
              value={object.title}
            />
            <TextField
              helperText="Please enter document content"
              id="demo-helper-text-aligned"
              label="Content"
              multiline
              sx={{ m: 1, width: "95%", marginBottom: "10px" }}
              maxRows={4}
              onChange={(e) => {
                console.log(e.target.value);
                setObject({ ...object, content: e.target.value });
              }}
              value={object.content}
            />
            <Button
              onClick={() => HandleSubmit()}
              variant="contained"
              sx={{marginLeft:'10px'}}
              endIcon={<UploadFileIcon />}
            >
              {object.index !== -1 ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
