import React, { useContext, useEffect, useState } from 'react'
import './createstore.css'
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core'
import axios from "axios"
import CreateStoreMap from '../../components/maps/CreateStoreMap';
import { AddContext, AddContextProvider } from '../../context/storemapcontext/AddContext';
import { AppContext } from '../../context/appContext/AppContext';

export default function Createstore(props) {

    const { user, seller } = useContext(AppContext);
    const { latitude, longitude } = useContext(AddContext);
    const [errors, setErrors] = useState("");
    const [myStore, setMyStore] = useState({ storeName: "", ownerName: "", ownerEmail: "", storeAddress: "" })
    const [addressList, setAddressList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();


    useEffect(()=>{
        if(seller && seller.storeId){
            history.push('/storedashboard/analytics')
        }
    },[seller])
    const getUserLocation = async (long, lati) => {
        let list = [];
        let placeName = "";
        if (latitude != null && longitude != null) {
            const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lati}.json?access_token=${process.env.REACT_APP_MAPBOX}`);
            const address = res.data.features;
            for (let j = 1; j < address.length; j++) {
                let pair = { [address[j].place_type[0]]: address[j].text };
                list.push(pair)
                j === address.length - 1 ? placeName = placeName.concat(`${address[j].text}`) : placeName = placeName.concat(`${address[j].text}, `)
            }
            setMyStore({ ...myStore, storeAddress: placeName });

            setAddressList(list);
        }
    }

    useEffect(() => {
        getUserLocation(longitude, latitude);
    }, [latitude, longitude])

    const gotoLogin = (e) => {
        e.preventDefault();
        history.push('/signin')
    }
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
            const { data } = await axios.post(`/api/private/createstore/${props.match.params.userid}`, { ...myStore, addressList, userId: seller._id, latitude:latitude, longitude:longitude}, config).catch(err => {
                if (err.response.status === 409) {
                    setErrors("Invalid User")
                    throw new Error(`Invalid User`);
                } else if (err.response.status === 400) {
                    setErrors("User can create only one store")
                    throw new Error(`Each user can register only one store`);
                }
                else {
                    setErrors("Internal Server Error")
                    throw new Error(`Internal Server Error`);
                }
                throw err;
            });
            setIsFetching(false);
            if(data){
                window.location.reload();
            }
        } catch (err) {
            setIsFetching(false);
            setErrors(err.message)
        }
    }
// console.log("Hello World")
    return (
        <div className="storeregContainer">
            <div className="storeregWrapper">
                <form className="storeregRight" onSubmit={handleSubmit} >
                    <div className="storeregBox">
                        <h1>Store Registration</h1>
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
                                value={myStore.storeAddress}
                                disabled='true'
                                placeholder="Search Address in below input field" />
                        </div>
                        <div className="addressMap">
                            <CreateStoreMap />
                        </div>


                        <button type="submit"
                            className="storeregButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Register"}</button>

                    </div>
                </form>
            </div>
        </div>
    )
}