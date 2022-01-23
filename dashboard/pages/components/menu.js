import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
export default function Menu({ handlingPageFunction, selectedComponentPage }) {
   const router = useRouter()
   const cookies = new Cookies();

   function logout() {
      cookies.remove('jwt'); 
      router.push('/')
      toast.info("You have successfully logged out.")
   }
   return (

      <>
         <table className="m-auto m-md-0" style={{ width: "285px" }}>
            <div className="container">
               <div className="row">

                  <div className="mx-2 px-0 py-2 col-sm" onClick={(() => { if (handlingPageFunction) { handlingPageFunction(0) } })}>
                     {
                        (selectedComponentPage === 0) ?
                           <>
                              <div className="bg-white rounded dashbutton active">
                                 <div className="col-12 m-auto text-center m-0 p-1">
                                    <i className="fas fa-user-edit pt-3 text-dark m-auto"></i>
                                    <p className="text-dark mt-2 p-0">Designers <br />Management</p>
                                 </div>
                              </div>
                           </>
                           :
                           <>
                              <div className="bg-white rounded dashbutton">
                                 <div className="col-12 m-auto text-center m-0 p-1">
                                    <i className="fas fa-user-edit pt-3 text-dark m-auto"></i>
                                    <p className="text-dark mt-2 p-0">Designers <br />Management</p>
                                 </div>
                              </div>
                           </>
                     }
                  </div>

                  <div className="mx-2 px-0 py-2 col-sm" onClick={(() => { if (handlingPageFunction) { handlingPageFunction(1) } })}>
                     {
                        (selectedComponentPage === 1) ?
                           <>
                              <div className="bg-white rounded dashbutton active">
                                 <div className="col-12 m-auto text-center m-0 p-1">
                                    <i className="fas fa-user-shield pt-3 text-dark m-auto"></i>
                                    <p className="text-dark mt-2 p-0">Users <br />Management</p>
                                 </div>
                              </div>
                           </>
                           :

                           <>
                              <div className="bg-white dashbutton rounded">
                                 <div className="col-12 m-auto text-center m-0 p-1">
                                    <i className="fas fa-user-shield pt-3 text-dark m-auto"></i>
                                    <p className="text-dark mt-2 p-0">Users <br />Management</p>
                                 </div>
                              </div>
                           </>
                     }
                  </div>

               </div>
               <div className="row">

                  <div className="mx-2 px-0 py-2 col-sm" onClick={(() => { if (handlingPageFunction) { handlingPageFunction(2) } })}>
                     {
                        (selectedComponentPage === 2) ?
                           <>
                              <div className="bg-white rounded dashbutton active">
                                 <div className="col-12 m-auto text-center m-0 p-1">
                                    <i className="fas fa-palette pt-3 text-dark m-auto"></i>
                                    <p className="text-dark mt-2 p-0">Art <br />Management</p>
                                 </div>
                              </div>
                           </>
                           :
                           <>
                              <div className="bg-white rounded dashbutton">
                                 <div className="col-12 m-auto text-center m-0 p-1">
                                    <i className="fas fa-palette pt-3 text-dark m-auto"></i>
                                    <p className="text-dark mt-2 p-0">Art <br />Management</p>
                                 </div>
                              </div>
                           </>
                     }
                  </div>

                  <div className="mx-2 px-0 py-2 col-sm">
                     <div className="bg-white rounded dashbutton ">
                        <div className="col-12 m-auto text-center m-0 p-1">
                           <i className="fas fa-user-shield pt-3 m-auto" style={{ color: "#a5a5a5" }}></i>
                           <p className="mt-2 p-0" style={{ color: "#a5a5a5" }}>Categorys <br />Management</p>
                        </div>
                     </div>
                  </div>

               </div>

               <div className="row">

                  <div className="mx-2 px-0 py-2 col-sm">
                     <div className="bg-white rounded dashbutton">
                        <div className="col-12 m-auto text-center m-0 p-1">
                           <i className="fas fa-user-edit pt-3 m-auto" style={{ color: "#a5a5a5" }}></i>
                           <p className="mt-2 p-0" style={{ color: "#a5a5a5" }}>Payments <br />Management</p>
                        </div>
                     </div>
                  </div>

                  <div className="mx-2 px-0 py-2 col-sm" onClick={(() => { logout() })}>
                     <div className="bg-white rounded dashbutton">
                        <div className="col-12 m-auto text-center m-0 p-1">
                           <i className="fas fa-sign-out-alt pt-3 text-danger m-auto"></i>
                           <p className="text-dark mt-2 p-0">Logout<br />Now</p>
                        </div>
                     </div>
                  </div>

               </div>
            </div>


         </table>
      </>

   );
}
