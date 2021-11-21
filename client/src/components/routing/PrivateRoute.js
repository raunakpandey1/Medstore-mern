import { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { AppContext } from '../../context/appContext/AppContext';
import axios from 'axios';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const {dispatch} = useContext(AppContext);
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    const getLoggedIn = async ()=>{
        const res = await axios.get("/api/private/getuser", config);
        if(res){
 
            dispatch({type: "FETCH_SUCCESS", payload: res.data });
        }else{
            dispatch({type: "EMPTY_STATE"});
        }
    }

    useEffect(()=>{
        getLoggedIn();
    },[]);

    return (
        <Route
            {...rest}
            render={
                (props) =>
                    localStorage.getItem("authToken") ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/signin" />
                    )

            }
        />
    )
}

export default PrivateRoute;