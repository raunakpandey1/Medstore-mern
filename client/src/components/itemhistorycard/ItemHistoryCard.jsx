import react, { useEffect, useState} from 'react'
import './itemhistorycard.css'
import axios from 'axios'

export default function ItemHistoryCard(props) {

    const [item, setItem] = useState({})

    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const {data} = await axios.get(`/api/private/getsingleproduct/${props.value.productId}`).catch(err => {
                    console.log(err);
                    if (err.response.status === 404) {
                        throw new Error(`Product Not Found`);
                    }
                    else {
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                });
                setItem(data);
            }catch(err){
                console.log(err)
            }
        }
        fetchdata();
    },[props.value])

    return (
        <div className="historyCarditem">
            <div className="historyCarditemWrapper">
                <div className="hcleft">
                    <img className="historyCardHeaderImg" src={item.productImage} alt="product image" />
                    <div className="headerText">
                        <h4>{item.productName}</h4>
                        <span className="hcPrice">Price: ₹{item.productPrice}/-</span>
                    </div>
                </div>

                <div className="hcsecDiv">
                    <div className="historyTS">
                        <span className="orderTime">Ordered on {props.value.createdAt.split("T")[0]}</span>
                    </div>
                    <div className="c2">
                        <div className="sec1">
                            <div className="quanHandler">
                                <span className="itemQuan">Quantity: {props.value.quantity}</span>
                            </div>
                        </div>
                        <div className="sec2">
                            <span className="totPrice">Total: ₹{props.value.totalPrice}/-</span>
                        </div>
                        <div className="sec3">
                            <span className="statusTxt">Status: {props.value.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}