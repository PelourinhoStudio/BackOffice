import api from '../../services/api'
import Cookies from 'universal-cookie'
import React, { useEffect, useState } from "react"
export default function Profile() {
    const cookies = new Cookies();
    const [userInfo, SetuserInfo] = useState([]);


        api.get("me", {headers: {"x-access-token":  cookies.get('jwt')},
        }).then((response) => SetuserInfo(response.data))



    return(
<>
<div className="text-center mt-4">
    <img src={userInfo.avatar}></img>
</div>
<div className="mt-3 row">
    <div className="m-auto bg-white col-7 rounded text-center text-dark py-2 p-1 font-weight-bold">
        {userInfo.firstName + " " + userInfo.lastName}
    </div>
</div>
<div className="justify-content-center d-flex row">
    <div className="mt-1  mr-1 bg-white col-4 rounded text-center text-danger py-2 font-weight-bold">
    {userInfo.userType}
    </div>
    <div className="mt-1 bg-white col-4 rounded text-center text-dark py-2 font-weight-bold">
        <i className="fa fa-circle text-success fa-xs"></i> Online
    </div>
</div>
</>
        
    );
  }
