import React, { useContext, useEffect, useState, } from 'react'
import './analytics.css'
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from '../../context/appContext/AppContext';
import { Line, Doughnut } from "react-chartjs-2";
const Analytics = () => {



  const { seller } = useContext(AppContext);
  const [errors, setErrors] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const history = useHistory();
  const [order, setOrder] = useState([{ ownerId: "", storeId: "", productId: "", status: "", quantity: "", totalPrice: "" }])
  const [product, setProduct] = useState([{ productName: "abcdd", productDescription: "", productImage: "", productPrice: NaN, productDetails: "", productQuantity: "" }])
  const [storename , setStorename] = useState();
  const [jan, setJan] = useState();
  const [feb, setFeb] = useState();
  const [march, setMarch] = useState();
  const [april, setApril] = useState();
  const [may, setMay] = useState();
  const [june, setJune] = useState();
  const [july, setJuly] = useState();
  const [aug, setAug] = useState();
  const [sept, setSept] = useState();
  const [oct, setOct] = useState();
  const [nov, setNov] = useState();
  const [dec, setDec] = useState();

  useEffect(() => {
    if (seller) {
      if (!seller.storeId) {
        history.push(`/createstore/${seller._id}`);
      }
    }
    if (seller) {
      const analytics = async () => {
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
          setIsFetching(true);
          const { data } = await axios.post(`/api/private/storedashboard/analytics`, { storeId: seller.storeId }, config).catch(err => {
            if (err.response.status === 409) {
              setErrors("Invalid seller")
              throw new Error(`Invalid seller`);
            }
            else {
              setErrors("Internal Server Error")
              throw new Error(`Internal Server Error`);
            }
            throw err;
          });
          setOrder(data.orders)
          setProduct(data.products)
          setStorename(data.storename)
          setJan(data.jan);
          setFeb(data.feb);
          setMarch(data.march);
          setApril(data.april);
          setMay(data.may);
          setJune(data.june);
          setJuly(data.july);
          setAug(data.aug);
          setSept(data.sept);
          setOct(data.oct);
          setNov(data.nov);
          setDec(data.dec);
          setIsFetching(false);
        } catch (err) {
          setIsFetching(false);
          setErrors(err.message)
        }
      }
      analytics()
    }

  }, [seller])

  let totalSalesPrice = 0;
  order &&
    order.forEach((item) => {
      totalSalesPrice += parseFloat(item.totalPrice);
    });


  let outOfStock = 0;

  product &&
    product.forEach((item) => {
      if (item.productQuantity === "0") {
        outOfStock += 1;
      }
    });


  const lineState = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "SALES",
        lineTension: 0.5,
        backgroundColor: ["blue"],
        borderColor: 'blue',
        color: '#666',
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [jan, feb, march, april, may, june, july, aug, sept, oct, nov, dec],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, product.length - outOfStock],
      },
    ],
  };

  return (

    <div className="dashboard">

      <div className="dashboardContainer">
      <h1><b className="storename">{storename}</b></h1>  
        <h1><b>Analytics</b></h1>
        {errors ?
          <div className="errorDiv">
            <span className="errorMessage">{errors}</span>
          </div> : null}
        {
          isFetching ? <h2>Loading...</h2> :
            <>
              <div className="dashboardSummary">
                <div className="dashboardSummaryBox2">
                  <div className="dsbCard">
                    <p>Total Sales Price</p>
                    <p>₹{totalSalesPrice}</p>
                  </div>
                  <div className="dsbCard">
                    <p>Total Products ordered</p>
                    <p>{product && product.length}</p>
                  </div>
                  <div className="dsbCard">
                    <p>Orders Delivered</p>
                    <p>{order && order.length}</p>
                  </div>

                </div>
              </div>
              <div className="lineChart">
                <Line data={lineState} />
              </div>

              <div className="doughnutChart">
                <h2>Product Stock</h2>
                <Doughnut data={doughnutState} />
              </div>
            </>
        }


      </div>
    </div>
  )
}

export default Analytics;

