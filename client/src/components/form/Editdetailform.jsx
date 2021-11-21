import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppContext } from '../../context/appContext/AppContext';
import axios from 'axios'

export default function Editdetailform(props) {

  const { user } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [myUser, setMyUser] = useState(user)

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setMyUser({ ...myUser, [name]: value })
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    const updateUser = async () => {
      try {
        const { data } = await axios.post('/api/auth/updateuserdata', { userId: user._id, ...myUser });
        if(data){
          handleClose();
          alert("Profile Updated Successfully")
        }
      } catch (err) {
        console.log("Error in updating user");
      }
    }
    updateUser();
  }

  const handleClose = async () => {
    setOpen(false);
  };

  return (

    <div>
      {
        props.signal ?
          <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Edit Details
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
              <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="profileImg"
                  name="profileImg"
                  onChange={handleChange}
                  value={myUser.profileImg}
                  label="Profile Image Url"
                  type="text"
                  fullWidth />
                <TextField
                  autoFocus
                  margin="dense"
                  id="firstname"
                  name="firstname"
                  onChange={handleChange}
                  value={myUser.firstname}
                  label="First Name"
                  type="text"
                  fullWidth />
                <TextField
                  autoFocus
                  margin="dense"
                  id="lastname"
                  name="lastname"
                  onChange={handleChange}
                  value={myUser.lastname}
                  label="Last Name"
                  type="text"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="userAddress"
                  name="userAddress"
                  onChange={handleChange}
                  value={myUser.userAddress}
                  label="Delivery Address"
                  type="text"
                  fullWidth
                />

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>
          </>
          : null
      }

    </div>
  );
}
