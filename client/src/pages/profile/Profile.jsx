import './profile.css'
import emptyprofile from '../../images/emptyprofile.png'
import { useState, useContext } from 'react'
import Editdetailform from '../../components/form/Editdetailform'
import { AppContext } from '../../context/appContext/AppContext'

export default function Profile() {
    const { user } = useContext(AppContext);
    
    return (
        <div className="profile">
            {
                user ?
                    <div className="profileWrapper">
                        <h1 className="profileHeading">Profile</h1>
                        <div className="profileImgDiv"><img className="profileImg" src={user.profileImg} /></div>
                        <Editdetailform signal={true} />
                        <div className="pInfo">
                            <h2>Personal Infomation</h2>
                            <p>First Name: {user.firstname}</p>
                            <p>Last Name: {user.lastname}</p>
                        </div>

                        <div className="pInfo">
                            <h2>Email</h2>
                            <p>Email: {user.email}</p>
                        </div>

                        <div className="pInfo">
                            <h2>Address</h2>
                            <p>Delivery Address: {user.userAddress}</p>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}