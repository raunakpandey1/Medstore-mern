import React, { useEffect, useState } from 'react'
import './signin.css'
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core'
import axios from "axios"
import { useContext } from 'react';
import { AppContext } from '../../context/appContext/AppContext';

export default function Signin() {


    const { authenticated, user, dispatch } = useContext(AppContext);
    const [errors, setErrors] = useState("");
    const [newuser, setUser] = useState({ email: "", password: ""})
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();

    /* useEffect(()=>{
        if(user){
            history.push('/') 
        }
    },[user]) */

    const gotoSignup = (e) => {
        e.preventDefault();
        history.push('/signup')
    }
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...newuser, [name]: value });
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setIsFetching(true)
        setErrors(false);
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            const {data} = await axios.post("/api/auth/signin", newuser, config);
            localStorage.setItem("authToken", data.token);
            setIsFetching(false);
            history.push('/userdashboard/profile')
        } catch (error) {
            setErrors(error.response.data.error);
            setIsFetching(false)
        }
    }
    
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <form className="loginRight" onSubmit={handleSubmit} >
                    <div className="loginBox1">
                        {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                        
                        <div className="divinput" > 
                        <input type="email" required  className="loginInput" 
                        name="email" 
                        value={newuser.email} 
                        onChange={handleChange} />
                        <label for="email">Email</label>
                        </div>
                        
                        <div className="divinput" > 
                        <input type="password" required   className="loginInput" 
                        name="password" 
                        value={newuser.password} 
                        onChange={handleChange} />
                        <label for="">Password</label>
                        </div>

                        <button type="submit" 
                        className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}</button>
                        <span className="loginForgot">Forgot password?</span>
                        <button onClick={gotoSignup} className="loginRegisterButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create New Account"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}