import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router-dom";
import {ImCross} from 'react-icons/im'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DailogBox(props) {
  const [open, setOpen] = React.useState(false);
  const navigate= useNavigate()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('otdisplay',true)
    navigate("/login")
  };
  const handleCrossClose = () => {
    localStorage.setItem('otdisplay',true)
    setOpen(false);
  };

  React.useEffect(() => {
    handleClickOpen(); // Open the dialog when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <React.Fragment>
      {/* Remove the button if you want the dialog to open automatically */}
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please Login"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Welcome back, champion! Your presence empowers us.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Login</Button>
          <Button onClick={handleCrossClose}><ImCross/></Button>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
