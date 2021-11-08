import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DesignerMan from './components/designer-man'
import Navbar from './components/Layout/navbar'
import Profile from './components/profile'
import Menu from './components/menu'
import Head from 'next/head'

export default function Home() {
  return (
<>
<Head>
   <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
</Head>

<div className="main-container">
   <div className="m-auto max-width">
      <Navbar/>
      <div className="rounded-main main-contents d-none mt-2 d-md-block">
         <DesignerMan/>
      </div>
      <div className="w-100 roudend mb-3">
         <div className="m-auto m-md-0" style={{width: "317px"}}>
         <Profile/>
      </div>
   </div>
   <div className="bg-secondary w-100 rounded-main p-3">
   <Menu></Menu>
</div>
</div>
</div>

</>
  )
}
