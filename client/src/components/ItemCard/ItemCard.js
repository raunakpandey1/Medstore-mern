import React from 'react'
import './ItemCard.css'
import { NavLink } from "react-router-dom";
 
const ItemCart = (props) => {
    return (
        <>
            <div className="productCards">
                <a exact className="links-hidden" href={`product/${props.value._id}`} target="_blank" style={{ textDecoration: 'none', color:'black'}}>
                    <div className="productCardWrapper">
                        <img src={props.value.productImage} alt="product_image" className="productImg" />
                        <h4 className="productTitle">{props.value.productName}</h4>
                        <span className="cardstorename">by {props.value.storeName}</span>
                        <h4 className="productPrice">{`Rs ${props.value.productPrice}/-`}</h4>
                    </div>
                </a>
            </div>
        </>
    )
}
export default ItemCart;