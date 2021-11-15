import Image from 'next/image'
import DesignerMan from './components/Menus/Designers-man/designer-man'
import UsersMan from './components/Menus/Users-man/user-man'
import Navbar from './components/Layout/navbar'
import Profile from './components/profile'
import Menu from './components/menu'
import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'


export default function Home() {
   const [ selectedComponentPage, setComponentPage ] = useState(0);

	const handleComponentChange = (newComponentID) => {
		setComponentPage(newComponentID);
	}




   return (
      <>
         <Head>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />

         </Head>
         <body>

         <div className="main-container">
            <div className="m-auto max-width">
               <Navbar />
               <div className="rounded-main main-contents d-none mt-2 d-md-block">
               <div className="text-center m-3 rounded-main bg-white main-table">
                  {
                    
                     (selectedComponentPage === 0) ? <DesignerMan/> : <></>
                
                  }
                  {
                    
                    (selectedComponentPage === 1) ? <DesignerMan/> : <></>
               
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
 
         <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></Script>
      </body>
                  
      </>
   )
}
