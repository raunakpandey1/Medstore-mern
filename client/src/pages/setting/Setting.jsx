import React ,{ useContext,useEffect, useState , } from 'react'
import './setting.css'
import { useHistory } from 'react-router';
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
import { CircularProgress } from '@material-ui/core'; 
const Setting = () => {


    const { seller } = useContext(AppContext);
    const [errors, setErrors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();
    const [myStore, setMyStore] = useState({ storeName: "", ownerName: "", ownerEmail: "", storeAddress: "" })
    
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setMyStore({ ...myStore, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFetching(true)
        setErrors(false);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("storeauthToken")}` 
            }
        }

        try {
            const { data } = await axios.post(`/api/private/storedashboard/setting`, { ...myStore ,storeId : seller.storeId}, config).catch(err => {
                if (err.response.status === 409) {
                    setErrors("Invalid User")
                    throw new Error(`Invalid User`);
                } 
                else {
                    setErrors("Internal Server Error")
                    throw new Error(`Internal Server Error`);
                }
                throw err;
            });
            setIsFetching(false);
        } catch (err) {
            setIsFetching(false);
            setErrors(err.message)
        }
        alert('Store Updated Successfully')
         

    } 

    useEffect(() => {   
     
      
        if(seller) 
        {
            const settingData = async () => {
             
            setIsFetching(true)
            setErrors(false);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("storeauthToken")}`
                }
            }
       
            try {
                const { data } = await axios.post(`/api/private/storedashboard/setting`, { storeId : seller.storeId} , config).catch(err => {
                    if (err.response.status === 409) {
                        setErrors("Invalid User")
                        throw new Error(`Invalid User`);
                    }  
                    else {
                        setErrors("Internal Server Error")
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                });
                 
                setMyStore(data.store)
                setIsFetching(false);
            } catch (err) {
                 
                setErrors(err.message)
            }
        }
        settingData()
        }
       
  },[seller])

  
    return ( 
            <div className="storeregContainer">
            <div className="storeregWrapper">
                <form className="storeregRight" onSubmit={handleSubmit}>
                    <div className="storeregBox">
                        <h1>Update Store Page</h1>
                        {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                        <div className="divinput" >
                            <input type="text" required
                                className="storeregInput"
                                name="storeName"
                                value={myStore.storeName}
                                onChange={handleChange} />
                            <label for="">Store Name</label>
                        </div>

                        <div className="divinput" >
                            <input type="text" required
                                className="storeregInput"
                                name="ownerName"
                                value={myStore.ownerName}
                                onChange={handleChange} />
                            <label for="">Store Owner Name</label>
                        </div>

                        <div className="divinput" >
                            <input type="email" required className="storeregInput"
                                name="ownerEmail"
                                value={myStore.ownerEmail}
                                onChange={handleChange} />
                            <label for="email">Store Owner Email</label>
                        </div>

                        <div className="divinput" >
                            <input type="text" required className="storeregInput"
                                name="storeAddress"
                                value={myStore.storeAddress} />
                            <label for="">Store Address</label>
                        </div>
                        
                        <button type="submit"  className="storeUpdateButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Update Store"}</button>

                    </div>
                </form>
            </div>
        </div>

    )
}

export default Setting
