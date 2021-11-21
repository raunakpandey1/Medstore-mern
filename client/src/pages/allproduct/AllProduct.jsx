import React ,{ useContext,useEffect, useState , } from 'react'
import './allproduct.css'
import { useHistory } from 'react-router';
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
import ItemCart from '../../components/ItemCard/ItemCard'
import CardMedia from '@material-ui/core/CardMedia';
 
const AllProduct = () => {
    

    const { seller } = useContext(AppContext);
    const [errors, setErrors] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const history = useHistory();
    const [product, setProduct] = useState([{ productName: "", productDescription: "", productImage:"", productPrice: "", productDetails: "" , productQuantity: ""}])
    
    
    useEffect(() => {   
     
      
        if(seller) 
        {
            const productData = async () => {
             
            setIsFetching(true)
            setErrors(false);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("storeauthToken")}`
                }
            }
             
             
            try {
                const { data } = await axios.post(`/api/private/storedashboard/allstoreproduct`, {storeId : seller.storeId } , config).catch(err => {
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
                 
                setProduct(data.products)
                setIsFetching(false);

            } catch (err) {
                 
                setErrors(err.message)
            }
        }
        productData()
        
        }
        
  },[seller])

  
    return (
        <div>
        <div className="heading">
        <h1>All Store Product Page </h1>
        </div>
                
             
                {
                product.map((item, index) => {
                    
                return  <div className="allproductContainer">
                
                <div className="allproductWrapper">
                <div className="allproductRight" >
                    <div className="allproductBox">
                        
                            {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                            <div>
                            <CardMedia
                                className="productImg1"
                                image={
                                    item.productImage
                                }
                                title={"Image"} />
                            </div>
                         <div>
                         <h3>{item.productName}</h3>
                         <span className="productPrice">{`₹${item.productPrice}/-`}</span> <br></br><br></br>
                         <label> <b>Stock : </b><span >{item.productQuantity}</span></label>
                         <p>{item.productDescription}</p>
                          <p>{item.productDetails}</p>
                         </div>

                    </div>
                </div>
             </div>
        </div>
                })
                }
                 
        </div>
    )
}

export default AllProduct

