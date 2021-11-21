import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppContext } from '../../context/appContext/AppContext';
import axios from 'axios'
import '../../pages/addtocartpage/addtocartpage.css'

export default function Orderconfirm(props) {

    const { user } = useContext(AppContext);
    const [open, setOpen] = React.useState(false);
    const [myUser, setMyUser] = useState(user? user: {})
    const [selectedValue, setSelectedValue] = useState(false)

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setMyUser({ ...myUser, [name]: value })
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }
        try {
            const { data } = await axios.post(`/api/private/buyproduct`, {items: props.value, address: myUser.userAddress}, config).catch(err => {
                if (err.response.status === 404) {
                    throw new Error(`Invalid User`);
                }
                else {
                    throw new Error(`Internal Server Error`);
                }
                throw err;
            });
            alert("Order Successful")
            handleClose();
        } catch (err) {
            alert("Order failed due to some error")
            handleClose();
        }
    }

    const handleClose = async () => {
        setOpen(false);
    };

    return (

        <div>
            {
                props.signal ?
                    <>
                        <button className="ckButton" onClick={handleClickOpen}>Check Out</button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
                            <DialogTitle id="form-dialog-title">Confirm Order</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                </DialogContentText>
                                <RadioGroup
                                    aria-label="cod"
                                    defaultValue='true'
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="cod" control={<Radio onChange={()=>setSelectedValue(true)}/>} label="Cash on Delivery" />
                                    <FormControlLabel value="other" control={<Radio onChange={()=>setSelectedValue(false)}/>} label="Other Payment" />
                                </RadioGroup>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="userAddress"
                                    name="userAddress"
                                    onChange={handleChange}
                                    value={myUser.userAddress}
                                    label="Confirm Delivery Address"
                                    type="text"
                                    fullWidth />

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} color="primary" disabled={!selectedValue}>
                                    Confirm Order
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                    : null
            }

        </div>
    );
}
