import { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { AppContext } from '../../context/appContext/AppContext';
import axios from 'axios';

const StorePrivateRoute = ({ component: Component, ...rest }) => {

    const { dispatch } = useContext(AppContext);
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("storeauthToken")}`
        }
    }
    const getLoggedIn = async () => {
        try {
            const res = await axios.get("/api/private/getseller", config);
            if (res) {
                dispatch({ type: "FETCH_SUCCESS", seller: res.data });
            } else {
                dispatch({ type: "EMPTY_STATE" });
            }
        } catch (err) {
            /* if(err.response.status == 404){
                
            } */
        }
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <Route
            {...rest}
            render={
                (props) =>
                    localStorage.getItem("storeauthToken") ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/storesignin" />
                    )

            }
        />
    )
}

export default StorePrivateRoute;