import "moment/locale/pt"
import moment from "moment";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify';
export default function Userslist({ user, updateListFunc }) {

   const { register, handleSubmit } = useForm()
   const cookies = new Cookies();

   function deleteUser() {
      api.delete('admin/users/' + user._id, { headers: { "x-access-token": cookies.get('jwt') } }).then(()=> {
         toast.success("User deleted with success.")
         window.location.reload();
      });

   }


   function updateUser(values) {
      const updateUsers = {
         firstName: values.firstName,
         lastName: values.lastName,
         userType: values.userType,
         state: values.state,
         email: values.email,
      }

      api.put(`admin/users/${user._id}`, updateUsers, { headers: { "x-access-token": cookies.get('jwt') } }).then(() => {
         toast.success("User updated with success.")
         if (updateListFunc) {
            updateListFunc();
         }
      })
         .catch((err) => {
            alert("erro é " + err)
         })



   }

   return (
      <>
         <tr key={user.email}>
            <td><a href="#"><img src={user.avatar} className="avatar" width="50px" alt="Avatar" />{user.firstName + " " + user.lastName}</a></td>
            <td>
               {'Online ' + moment(moment(user.lastOnline).format('DD-MM-YYYY'), "DDMMYYYY").fromNow()}
            </td>
            <td>
               {String(user.userType).toUpperCase()}
            </td>
            <td>
            {
                  String(user.state).toUpperCase() === 'ATIVO' ? <><span className="status text-success">•</span> Ativo</> : <></>
               }
               {
                  String(user.state).toUpperCase() === 'INATIVO' ? <><span className="status text-danger">•</span> Inativo</> : <></>
               }
               {
                  String(user.state).toUpperCase() === 'SUSPENSO' ? <><span className="status text-warning">•</span> Suspenso</> : <></>
               }
            </td>
            <td>{user.email}</td>
            <td>
               <a href="#" className="settings mr-2" data-bs-toggle="modal" data-bs-target={"#change_" + user._id}><i className="fas fa-cog text-danger"></i></a>
               <a href="" className="delete" data-bs-toggle="modal" data-bs-target={"#delete_" + user._id}><i className="fas fa-times-circle text-primary"></i></a>

               <div className="modal fade" id={"delete_" + user._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title">Delete User</h5>
                           <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                           </button>
                        </div>
                        <div className="modal-body" style={{ textAlignLast: "center" }}>
                           <i className="far fa-engine-warning text-danger mb-4" style={{ fontSize: "6rem" }}></i>
                           <h5>Are you sure you want to delete the user <span className="text-primary font-weight-bold">{user.firstName + " " + user.lastName}</span></h5>
                           <h5>with email <span className="text-primary font-weight-bold">{user.email}</span> ?</h5>
                        </div>
                        <div className="modal-footer justify-content-center">
                           <button type="button" className="btn btn-danger" onClick={() => deleteUser()} style={{ textAlignLast: "center", width: "30%" }} data-bs-dismiss="modal">Yes</button>
                           <button type="button" className="btn btn-primary" style={{ textAlignLast: "center", width: "100%" }}>No</button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="modal fade" id={"change_" + user._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title">Change User Data</h5>
                           <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                           </button>
                        </div>
                        <div className="modal-body">
                           <div className="m-auto w-100" style={{ textAlignLast: "center" }}>
                              <img src={user.avatar} className="avatar-profile mb-4" />
                           </div>
                           <form onSubmit={handleSubmit(updateUser)}>
                              <div className="row">
                                 <div className="col">
                                    <label>First Name</label>
                                    <input {...register("firstName", { required: true })} type="text" className="form-control" defaultValue={user.firstName} placeholder="First Name" />
                                 </div>
                                 <div className="col">
                                    <label>Last Name</label>
                                    <input {...register("lastName", { required: true })} type="text" className="form-control" placeholder="Last Name" defaultValue={user.lastName} />
                                 </div>
                              </div>
                              <div className="row mt-2">
                                 <div className="form-group col-6">
                                    <label>Statute</label>
                                    <select className="form-control" {...register("userType", { required: true })}>
                                       {String(user.userType).toUpperCase() === 'ADMIN' ? <><option selected className="text-danger">Admin</option></> : <><option className="text-danger">Admin</option></>}
                                       {String(user.userType).toUpperCase() === 'DESIGNER' ? <><option selected className="text-warning">Designer</option></> : <><option className="text-warning">Designer</option></>}
                                       {String(user.userType).toUpperCase() === 'DEFAULT' ? <><option selected className="text-success">Default</option></> : <><option className="text-success">Default</option></>}
                                    </select>
                                 </div>
                                 <div className="form-group col-6">
                                    <label>State</label>
                                    <select className="form-control" {...register("state", { required: true })}>
                                       {String(user.state).toUpperCase() === 'INATIVO' ? <><option selected className="text-danger">Inativo</option></> : <><option className="text-danger">Inativo</option></>}
                                       {String(user.state).toUpperCase() === 'SUSPENSO' ? <><option selected className="text-warning">Suspenso</option></> : <><option className="text-warning">Suspenso</option></>}
                                       {String(user.state).toUpperCase() === 'ATIVO' ? <><option selected className="text-success">Ativo</option></> : <><option className="text-success">Ativo</option></>}
                                    </select>
                                 </div>
                              </div>

                              <div className="form-group">
                                 <label>Email </label>
                                 <input type="email" {...register("email", { required: true })} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={user.email} placeholder="Email" />
                              </div>
                              <div className="modal-footer justify-content-center">
                                 <button type="submit" className="btn btn-danger" style={{ textAlignLast: "center", width: "50%" }} data-bs-dismiss="modal">Update data</button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </td>

         </tr>
      </>

   );
}
