import './home.css'
import Homemap from '../../components/maps/Homemap'
import useGeoLocation from "../../components/maps/useGeoLocation";
import { useState, useEffect } from 'react';
import axios from 'axios'
import Itemdata from '../../components/ItemCard/Itemdata'
import ItemCard from '../../components/ItemCard/ItemCard'
import Product from '../addproduct/Product';
import { CircularProgress } from '@material-ui/core';

export default function Home() {

    const [userAddress, setUserAddress] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const [selected, setSelected] = useState("N/A")
    const [locallowed, setLocallowed] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const location = useGeoLocation();

    // console.log(Itemdata.productData)

    useEffect(() => {
        const getUserLocation = async () => {
            let list = [];
            if (!location.error) {
                setLocallowed(true)
                const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.coordinates.lng},${location.coordinates.lat}.json?access_token=${process.env.REACT_APP_MAPBOX}`);
                const address = res.data.features;
                for (let j = 1; j < address.length; j++) {
                    let pair = { id: address[j].place_type[0], name: address[j].text };
                    list.push(pair)
                    /* list = { ...list, ...pair } */

                }
                setUserAddress(list)
            } else {
                setLocallowed(false)
            }
        }
        getUserLocation();
    }, [location.coordinates])

    useEffect(() => {
        const getallProduct = async () => {
            try {
                const res = await axios.get("/api/private/getrandomproducts");
                setProducts(res.data);
                /* setIsLoading(false); */
            } catch (err) {
                /* setIsLoading(false);
                console.log("Error in fetching products") */
            }
        }
        getallProduct();
    }, [])

    const handleChange = (e) => {
        e.preventDefault();
        setSelected(e.target.value)
    }
    // console.log(Itemdata.productData);

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }
        try {
            for (let i = 0; i < userAddress.length; i++) {
                if (userAddress[i].id === selected) {
                    console.log(selected, userAddress[i].name)
                    const res = await axios.post("/api/private/searchproduct", { "locationName": selected, "location": userAddress[i].name, "searchValue": searchValue }, config);
                    if (res.data.message) {
                        setProducts([]);
                        setStores([]);
                    }else{
                        setProducts(res.data.product);
                        console.log(res.data.product)
                        setStores(res.data.stores);
                    }
                }
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            console.log("Error in fetching products")
        }
    }

    return (
        <div className="home">
            {
                locallowed ? null :
                    <div className="locError">
                        <span className="locErrorSpan">Please allow the location permission and refresh the page again.</span>
                    </div>
            }
            <div className="homeWrapper">
                <div className="homeLeft">
                    <div className="leftWrapper">
                        <div className="inputItem">
                            <i className="fas fa-search"></i>
                            <input onChange={handleInputChange} value={searchValue} className="inputProduct" placeholder="Search products here..." />
                        </div>
                        <div className="selectItem">
                            <select id="dropdown" onChange={handleChange}>
                                <option value="N/A">Select Location</option>
                                {
                                    userAddress.map((data) => {
                                        return (
                                            <option key={data.id} value={data.id} name={data.name}>{data.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <button onClick={handleSearch} className="searchButton" disabled={!locallowed}>Search</button>
                        </div>

                        <div className="productsDiv">
                            {
                                isLoading ? <CircularProgress color="grey" size="40px" /> :
                                    products && products.length>0 ? products.map((item, key) => {
                                        return <><ItemCard value={item} key={key} /></>
                                    }) : "No Product Found"
                            }

                        </div>
                    </div>
                </div>
                <div className="homeRight">
                    <Homemap value={stores} />
                </div>
            </div>
        </div >
    )
}