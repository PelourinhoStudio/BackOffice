import api from './../services/api'
import Menu from './components/menu'
import Cookies from 'universal-cookie'
import { useRouter } from 'next/router'
import Profile from './components/profile'
import Navbar from './components/Layout/navbar'
import React, { useEffect, useState } from "react";
import ImageMan from './components/Menus/Images-man/image-man'
import DesignerMan from './components/Menus/Designers-man/designer-man'
import UsersMan from './components/Menus/Users-man/user-man'

const Dashboard = () => {
   const router = useRouter()
   const cookies = new Cookies();
   const [selectedComponentPage, setComponentPage ] = useState(0);
	const handleComponentChange = (newComponentID) => {
	setComponentPage(newComponentID);
	}
   const [userInfo, SetuserInfo] = useState([]);

   useEffect(() => {
      api.get("me", {headers: {"x-access-token":  cookies.get('jwt')},
   })
   .then((response) => {
      SetuserInfo(response.data)
     if (!(response.data.userType === 'admin')) {
      cookies.remove('jwt')
      router.push('/')
     }
   })
   .catch((err) => {
      cookies.remove('jwt')
      router.push('/')
         });
   }, []);

   


	return (
<>
<div className="main-container">
            <div className="m-auto max-width">
               <Navbar />
               <div className="rounded-main main-contents d-none mt-2 d-md-block">
               <div className="m-3 rounded-main bg-white main-table">
               {
                    
                    (selectedComponentPage === 0) ? <DesignerMan/> : 
                 
                    (selectedComponentPage === 1) ? <UsersMan/> : 
                     
                    (selectedComponentPage === 2) ? <ImageMan/> : <></>
                
                   }
                       </div>
               </div>
               <div className="w-100 roudend mb-3">
                  <div className="m-auto m-md-0" style={{ width: "317px" }}>
                  <div className="text-center mt-4">
                      <img src={userInfo.avatar}></img>
                  </div>
                  <div className="mt-3 row">
                      <div className="m-auto bg-white col-7 rounded text-center text-dark py-2 p-1 font-weight-bold">
                          {userInfo.firstName + " " + userInfo.lastName}
                      </div>
                  </div>
                  <div className="justify-content-center d-flex row">
                      <div className="mt-1  mr-1 bg-white col-4 rounded text-center text-danger py-2 font-weight-bold text-capitalize">
                      {userInfo.userType}
                      </div>
                      <div className="mt-1 bg-white col-4 rounded text-center text-dark py-2 font-weight-bold">
                          <i className="fa fa-circle text-success fa-xs"></i> Online
                      </div>
                  </div>
                  </div>
               </div>
               <div className="bg-secondary w-100 rounded-main p-3">
                  <><Menu handlingPageFunction = {handleComponentChange} selectedComponentPage={selectedComponentPage}/></>
               </div>
            </div>
         </div>
</>
	);
}

export default Dashboard;


