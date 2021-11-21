import React, { useContext, useEffect, useState, } from 'react'
import './orders.css'
import { useHistory } from 'react-router';
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { CircularProgress } from '@material-ui/core';
import Tbrow from "./Tbrow"
const Orders = () => {


  const { seller } = useContext(AppContext);
  const [errors, setErrors] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const history = useHistory();
  const [order, setOrder] = useState([])

  useEffect(() => {
    if (seller) {
      const orderData = async () => {

        setIsFetching(true)
        setErrors(false);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("storeauthToken")}`
          }
        }

        // console.log(user.storeId)
        try {
          const { data } = await axios.post(`/api/private/storedashboard/orders`, { storeId: seller.storeId, ownerId: seller._id }, config).catch(err => {
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
          setOrder(data)
          /* setProduct(data.products) */

          setIsFetching(false);

        } catch (err) {

          setErrors(err.message)
        }
      }
      orderData()
    }

  }, [seller])


  return (
    <div>
      <div className="heading">
        <h1>All Order Store  Page </h1>
      </div>
      {errors ?
        <div className="errorDiv">
          <span className="errorMessage">{errors}</span>
        </div> : null}

      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Order Id</TableCell>
              <TableCell align="left">Customer Name</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="left">Status</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ?
              <div className="crBar"><CircularProgress color="inherit" size="40px" /></div>
              :
              order.map((order) => {
                return <Tbrow value={order} />
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

      {/* {
                order.map((order, index) => {
                    
                return  <div className="storeregContainer">
                
                <div className="storeregWrapper">
                <div className="storeregRight" >
                    <div className="storeregBox">
                        
                            {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                         <div>
                         <p>{order.status}</p>
                         <p>{order.quantity}</p>
                         {product.map((item, index) => {
                            return  <div >
                
                <div >
                <div >
                    <div >
                        
                            {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                         <div>
                         <h2>{item.productName}</h2>
                          
                         <p>{item.productPrice}</p>
                          
                         </div>

                    </div>
                </div>
             </div>
        </div>
                })
                }
                         </div>

                    </div>
                </div>
             </div>
        </div>
                })
                } */}

    </div>
  )
}

export default Orders;


