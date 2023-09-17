import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
// import { democontent } from "../components/demcontent.js"
import ContentCSS from "./Content.module.css";
import { createSummary,
  //  fetchSummary 
  } 
   from "../services/summaryService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.js";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Content({ content, title }) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [summary, setSummary] = useState("");
  const [open, setOpen] = useState(false);
  const apiKey = process.env.REACT_APP_CHATGPT_APIKEY;
  const aiURL = "https://api.openai.com/v1/chat/completions";
  const [user] = useAuthState(auth);

  // const checkUser = () => {
  //   console.log(user);
  // };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const genSummary = (text, title) => {
    try {
      axios
        .post(
          aiURL,
          {
            messages: [
              {
                role: "user",
                content: `Summarize the following article: ${text}`,
              },
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 250,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        )
        .then(function (response) {
          const sumText = response.data.choices[0].message.content;
          // storing to Firestore
          createSummary({ uid: user.uid, text: sumText, title: title });
          setSummary(sumText);
          handleOpenModal()
          // fetchSummary({ uid: user.uid });
        });

      // setSummary(response.data.choices[0].text);
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
  };

  return (
    <>
      {/* <div className={ContentCSS.content}>{summary}</div> */}
      <div className={ContentCSS.content}>{content}</div>
      <Button variant="contained" onClick={() => {
        genSummary(content, title)
        handleClick()
        // 
      }
    }>
        Summarize
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Generating Summary"
        action={action}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {summary}
          </Typography>
        </Box>
      </Modal>
      {/* <Button variant="contained" onClick={checkUser}>Summarize</Button> */}
      {/* <Button variant="contained" onClick={() => setSummary(democontent)}>Summarize</Button> */}
      {/* <button onClick={() => genSummary(content)}>Summarize</button> */}
    </>
  );
}
