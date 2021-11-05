import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
<>
<Head>
   <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous"/>
</Head>
<div className="main-container">
   <div className="m-auto max-width">
      <div className="rounded-main main-contents">as</div>
      <div className="w-100 roudend" style={{height: "340px"}}>
      <nav className="navbar navbar-expand-lg navbar-light">
         <a className="navbar-brand" href="#">PSTUDIO</a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse mt-2" id="navbarSupportedContent">
            <form className="form-inline my-0" style={{marginLeft: "176px"}}>
            <div className="searchForm">
               <button className="btn search-btn" type="submit"><i className="fas fa-search text-primary"></i></button>
               <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            </div>
            </form>
            <ul className="navbar-nav ml-auto" style={{marginRight: "97px"}}>
            <li className="nav-item active">
               <a className="nav-link" href="#">Exposições</a>
            </li>
            <li className="nav-item active">
               <a className="nav-link" href="#">Artistas</a>
            </li>
            <li className="nav-item active">
               <a className="nav-link" href="#">Contactos</a>
            </li>
            <li className="nav-item">
               <a className="nav-link" href="#">Loja Online</a>
            </li>
            <li className="nav-item dropdown">
               <a className="nav-link dropdown-toggle p-0 ml-2" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <img src="avatar-nav.png"></img>
               </a>
               <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
               </div>
            </li>
            </ul>
         </div>
      </nav>
      <div style={{width: "315px"}}>
      <div className="text-center mt-4">
         <img src="avatar.png"></img>
      </div>
      <div className="mt-3">
         <div className="m-auto bg-white col-8 rounded text-center text-dark py-2 p-1 font-weight-bold">
            Carlos Moreira
         </div>
         <div className="justify-content-center d-flex">
            <div className="mt-1  mr-1 bg-white col-4 rounded text-center text-danger py-2 font-weight-bold">
               ADMIN
            </div>
            <div className="mt-1 bg-white col-4 rounded text-center text-dark py-2 font-weight-bold">
               <i className="fa fa-circle text-success fa-xs"></i> Online
            </div>
         </div>
      </div>
   </div>
</div>
<div className="bg-secondary w-100 rounded-main p-3" style={{minHeight: "calc(100vh - 270px);"}}>
<table style={{width: "285px"}}>
<div className="container">
   <div className="row">
      <div className="col-sm bg-white rounded m-2 px-0 py-2 dashbutton active">
         <div className="col-12 m-auto text-center m-0 p-1">
            <i className="fas fa-user-edit pt-2 text-dark m-auto"></i>
            <p className="text-dark mt-2 p-0">Gestão <br/>de Designers</p>
         </div>
      </div>
      <div className="col-sm bg-white rounded m-2 px-0 py-2 dashbutton">
         <div className="col-12 m-auto text-center m-0 p-1">
            <i className="fas fa-user-shield pt-2 text-dark m-auto"></i>
            <p className="text-dark mt-2 p-0">Gestão <br/>de Permissões</p>
         </div>
      </div>
   </div>
   <div className="row">
      <div className="col-sm bg-white rounded m-2 px-0 py-2 dashbutton">
         <div className="col-12 m-auto text-center m-0 p-1">
            <i className="fas fa-th-list pt-2 text-dark m-auto"></i>
            <p className="text-dark mt-2 p-0">Gestão <br/>de Categorias</p>
         </div>
      </div>
      <div className="col-sm bg-white rounded m-2 px-0 py-2 dashbutton">
         <div className="col-12 m-auto text-center m-0 p-1">
            <i className="fas fa-palette pt-2 text-dark m-auto"></i>
            <p className="text-dark mt-2 p-0">Gestão <br/>de Obras</p>
         </div>
      </div>
   </div>
   <div className="row">
      <div className="col-sm bg-white rounded m-2 px-0 py-2 dashbutton">
         <div className="col-12 m-auto text-center m-0 p-1">
            <i className="fas fa-shopping-cart pt-2 text-dark m-auto"></i>
            <p className="text-dark mt-2 p-0">Gestão <br/>de Pagamentos</p>
         </div>
      </div>
      <div className="col-sm bg-white rounded m-2 px-0 py-2 dashbutton">
         <div className="col-12 m-auto text-center m-0 p-1">
            <i className="fas fa-sign-out-alt pt-2 text-danger m-auto"></i>
            <p className="text-dark mt-2 p-0">Sair <br/>da Conta</p>
         </div>
      </div>
   </div>
</div>
</table>
</div>
</div>
</div>
</>
  )
}
