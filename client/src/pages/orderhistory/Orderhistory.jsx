import axios from 'axios'
import react from 'react'
import { useEffect, useContext } from 'react'
import { useState } from 'react'
import { CircularProgress } from '@material-ui/core';
import ItemHistoryCard from '../../components/itemhistorycard/ItemHistoryCard'
import { AppContext } from '../../context/appContext/AppContext'
import './orderhistory.css'

export default function Orderhistory() {

    const { user } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchdata = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
            try {
                setIsLoading(true);
                const { data } = await axios.post('/api/private/getorderhistory', { userId: user._id }, config).catch(err => {
                    console.log(err);
                    if (err.response.status === 404) {
                        throw new Error(`Product Not Found`);
                    }
                    else {
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                });
                setOrders(data);
                setIsLoading(false);
            } catch (err) {
                console.log("Error Occured")
                setIsLoading(false);
            }
        }
        fetchdata();
    }, [user])

    return (
        <div className="orderhistory">
            {
                isLoading ?
                    <CircularProgress color="inherit" size="30px" />
                    :
                    <div className="orderHistoryWrapper">
                        {
                            orders.length == 0 ? <h2>No history to show</h2> :
                                orders.map((obj, key) => {
                                    return (
                                        <ItemHistoryCard value={obj} />
                                    )
                                })
                        }
                    </div>

            }

        </div>
    )
}