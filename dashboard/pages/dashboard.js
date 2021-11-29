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

const Dashboard = (() => {
   const router = useRouter()
   const cookies = new Cookies();
   const [ selectedComponentPage, setComponentPage ] = useState(0);
	const handleComponentChange = (newComponentID) => {
	setComponentPage(newComponentID);
	}

   useEffect(() => {
      api
         .get("admin/users", {
            headers: {
                "x-access-token":  cookies.get('jwt')
            },
        }).catch((err) => {
            cookies.remove('jwt');
            router.push('/')
         });
   }, []);

   


	return (
<>
<div className="main-container">
            <div className="m-auto max-width">
               <Navbar />
               <div className="rounded-main main-contents d-none mt-2 d-md-block">
               <div className="text-center m-3 rounded-main bg-white main-table">
                  {
                    
                     (selectedComponentPage === 0) ? <DesignerMan/> : <></>
                
                  }
                  {
                    
                    (selectedComponentPage === 1) ? <UsersMan/> : <></>
               
                  }
                  {
                    
                    (selectedComponentPage === 2) ? <ImageMan/> : <></>
               
                  }
                       </div>
               </div>
               <div className="w-100 roudend mb-3">
                  <div className="m-auto m-md-0" style={{ width: "317px" }}>
                     <Profile />
                  </div>
               </div>
               <div className="bg-secondary w-100 rounded-main p-3">
                  <><Menu handlingPageFunction = {handleComponentChange} selectedComponentPage={selectedComponentPage}/></>
               </div>
            </div>
         </div>
</>
	);
})

export default Dashboard;


