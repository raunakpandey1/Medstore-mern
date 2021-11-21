import './userdashboard.css'
import { useHistory } from 'react-router'
import { useContext } from 'react';
import { AppContext } from '../../context/appContext/AppContext';
import Profile from '../profile/Profile';
import Addtocartpage from '../addtocartpage/Addtocartpage';
import Orderhistory from '../orderhistory/Orderhistory';
import DrawerContext from '../../context/DrawerContext';

export default function Userdashboard(props) {

    const history = useHistory();
    const {user, dispatch } = useContext(AppContext);
    const {isOpen, setOpen} = useContext(DrawerContext)

    const changePage = (e) => {
        e.preventDefault();
        setOpen();
        history.push(`/userdashboard/${e.target.id}`);
    }

    const logoutHandler = () => {
        localStorage.removeItem("authToken")
        dispatch({ type: "EMPTY_STATE" });
        history.push("/signin")
    }

    const switchComponent = () => {
        switch (props.match.params.page) {
            case 'profile':
                return <Profile />
            /* case 'profile':
              return <Profile /> */
            case 'addtocart':
                return <Addtocartpage />
            case 'orderhistory':
                return <Orderhistory />
            default:
                return (
                    <div className="notFoundDiv">
                        <h2>Sorry, Page Not Found!</h2>
                    </div>
                )
        }
    }

    return (
        <div className="userdashboard">
            <div className={"left " + (isOpen && "active")}>
                <ul className="dashboardul">
                    <li id="profile" className={"dashboardListItem"} onClick={changePage}>My Account</li>
                    <li id="orderhistory" className={"dashboardListItem"} onClick={changePage} >My Orders</li>
                    <li id="addtocart" className={"dashboardListItem"} onClick={changePage}>My Cart</li>
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