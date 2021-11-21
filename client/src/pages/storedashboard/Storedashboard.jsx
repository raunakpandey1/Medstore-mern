import './storedashboard.css'
import { useHistory } from 'react-router'
import { useContext } from 'react';
import { AppContext } from '../../context/appContext/AppContext';
import Analytics from '../analytics/Analytics';
import Orders from '../orders/Orders';
import Setting from '../setting/Setting';
import AllProduct from '../allproduct/AllProduct';
import Product from '../addproduct/Product';
import DrawerContext from '../../context/DrawerContext';

export default function Storedashboard(props) {

    const history = useHistory();
    const {dispatch} = useContext(AppContext);
    const {isOpen, setOpen} = useContext(DrawerContext)

    const changePage = (e) => {
        e.preventDefault();
        setOpen();
        history.push(`/storedashboard/${e.target.id}`);
    }
    const logoutHandler = () => {
        localStorage.removeItem("storeauthToken")
        dispatch({ type: "EMPTY_STATE" });
        history.push("/storesignin")
    }

    const switchComponent = () => {
        switch (props.match.params.page) {
            case 'analytics':
                return <Analytics />
            /* case 'profile':
              return <Profile /> */
            case 'addstoreproduct':
                return <Product />
            case 'allstoreproduct':
                return <AllProduct />
            case 'orders':
                return <Orders />
            case 'setting':
                return <Setting />
            default:
                return (
                    <div className="notFoundDiv">
                        <h2>Sorry, Page Not Found!</h2>
                    </div>
                )
        }
    }

    return (
        <div className="storedashboard">
            <div className={"left " + (isOpen && "active")}>
                <ul className="dashboardul">
                    <li id="analytics" className={"dashboardListItem"} onClick={changePage}>Analytics</li>
                    <li id="addstoreproduct" className={"dashboardListItem"} onClick={changePage} >Add Product</li>
                    <li id="allstoreproduct" className={"dashboardListItem"} onClick={changePage}>All Product</li>
                    <li id="orders" className={"dashboardListItem"} onClick={changePage}>Orders</li>
                    <li id="setting" className={"dashboardListItem"} onClick={changePage}>Setting</li>
                    <hr className="dashHr"></hr>
                    <li id="logout" className="dashListItemLogout" onClick={logoutHandler}>Logout</li>
                </ul>
            </div>
            <div className="right">
                {
                    switchComponent()
                }
            </div>
        </div>
    )
}