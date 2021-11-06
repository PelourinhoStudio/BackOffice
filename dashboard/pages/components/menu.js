export default function Menu() {

    return(
<>
<table className="m-auto m-md-0" style={{width: "285px"}}>
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
</>
        
    );
  }