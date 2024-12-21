import React from 'react'
import {assets} from "../assets/assets_admin/assets.js";

const AdminNav = () => {
    const admin = JSON.parse(localStorage.getItem('admin'))

    return (
        <div>
            <img src={assets.admin_logo}  alt=""/>
            <p>{}</p>

        </div>
    )
}
export default AdminNav
