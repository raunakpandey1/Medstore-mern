import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/appContext/AppContext';
import './singleproduct.css'
import axios from 'axios';
import { useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';

export default function Singleproduct(props) {

    const { user, dispatch } = useContext(AppContext);
    const [item, setItem] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [errors, setErrors] = useState("");
    const history = useHistory();

    useEffect(() => {
        const getProductdata = async () => {
            setIsFetching(true);
            try {
                const { data } = await axios.get(`/api/private/getsingleproduct/${props.match.params.productId}`).catch(err => {
                    if (err.response.status === 404) {
                        setErrors("Product Not Found")
                        throw new Error(`Product Not Found`);
                    }
                    else {
                        setErrors("Internal Server Error")
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                });
                setItem(data)
                setIsFetching(false);
            } catch (err) {
                console.log("Error Occured");
                setIsFetching(false);
            }
        }
        getProductdata();
    }, [])

    const handleAddtocart = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }
        if (user) {
            setIsFetching(true);
            try {
                const { data } = await axios.post(`/api/private/additemtocart`, { userId: user._id, productId: props.match.params.productId }, config).catch(err => {
                    if (err.response.status === 404) {
                        setErrors("Invalid User")
                        throw new Error(`Invalid User`);
                    }
                    else {
                        setErrors("Internal Server Error")
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                });
                if (data) {
                    const getLoggedIn = async () => {
                        const res = await axios.get("/api/private/getuser", config);
                        if (res) {
                            dispatch({ type: "FETCH_SUCCESS", payload: res.data });
                        } else {
                            dispatch({ type: "EMPTY_STATE" });
                        }
                    }
                    getLoggedIn();
                    alert("Item added to cart")
                }
                setIsFetching(false);
            } catch (err) {
                setIsFetching(false);
                setErrors("Error Occured")
            }
        } else {
            alert("Please login to continue");
            history.push("/signin");
        }
    }

    return (
        <div className="singleproduct">
            <div className="singleproductWrapper">
                {
                    isFetching ?
                        <CircularProgress color="inherit" size="20px" /> :
                        <>
                            <div className="spLeft">
                                <img className="spImage" src={item.productImage} alt="Product Image" />
                            </div>
                            <div className="spRight">
                                <h2 className="spName">{item.productName}</h2>
                                <p className="spstoreName">{item.storeName}</p>
                                <span className="spPrice">₹{item.productPrice}/-</span>
                                <br></br>

                                <label className="spQuantity">Available Stock : <span >{item.productQuantity}</span></label><br></br>
                                <p className="spDescription">{item.productDescription}</p>
                                <p className="spDetails">
                                    {item.productDetails}
                                    {/* <ul>
                            <li>Brand - LAMITRA</li>
                            <li>Model - Number N-95 MASK 30</li>
                            <li>Type - Cloth Mask</li>
                            <li>Mask - Type Half Mask</li>
                            <li>Respirator Type - NA</li>
                            <li>Mounting Type - EAR</li>
                            <li>Model Name - N95 mask washable and Reusable 5 Layer Special safety Anti-Bacterial Mask (Multicolour N-95 Mask without Respiratory Valve)-Pack of 30</li>

                        </ul> */}
                                </p>
                                <button className="spAddtocart" onClick={handleAddtocart}>Add to Cart</button>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}