import "moment/locale/pt"
import moment from "moment";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import api from '../../../../services/api'

export default function DesignerList(user) {

  const {register, handleSubmit } = useForm()

  function deleteUser() {
    api.delete('/users/' + user.user._id);
    window.location.reload();
 }


 function updateUser(values) {
  const updateUsers = {
    firstName: values.firstName,
    lastName: values.lastName,
    userType: values.userType,
    state: values.state,
    email: values.email,
  }

  api
   .put(`/users/${user.user._id}`, updateUsers)
   
  window.location.reload();
 }

    return(
<>
<tr key={user.user.email}>
<td><a href="#"><img src={user.user.avatar} className="avatar" width="50px" alt="Avatar" />{user.user.firstName + " " + user.user.lastName}</a></td>
<td>
   {'Online ' + moment(moment(user.user.lastOnline).format('DD-MM-YYYY'), "DDMMYYYY").fromNow()}
</td>
<td>
   {String(user.user.userType).toUpperCase()}
</td>
<td>
   {
      String(user.user.state).toUpperCase() == 'ATIVO' ? <><span className="status text-success">•</span> Ativo</> : <></>
   }
   {
      String(user.user.state).toUpperCase() == 'INATIVO' ? <><span className="status text-danger">•</span> Inativo</> : <></>
   }
   {
      String(user.user.state).toUpperCase() == 'SUSPENSO' ? <><span className="status text-warning">•</span> Suspenso</> : <></>
   }
</td>
<td>{user.user.email}</td>
<td>
   <a href="#" className="settings mr-2" data-bs-toggle="modal" data-bs-target={"#change_" + user.user._id}><i className="fas fa-cog text-danger"></i></a>
   <a href="" className="delete" data-bs-toggle="modal" data-bs-target={"#delete_" + user.user._id}><i className="fas fa-times-circle text-primary"></i></a>

   <div className="modal fade" id={"delete_" + user.user._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">Eliminar Utilizador</h5>
               <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div className="modal-body" style={{ textAlignLast: "center" }}>
               <i className="far fa-engine-warning text-danger mb-4" style={{ fontSize: "6rem" }}></i>
               <h5>Tem a certeza que pretende eliminar o utilizador <span className="text-primary font-weight-bold">{user.user.firstName + " " + user.user.lastName}</span></h5>
               <h5>Com o email <span className="text-primary font-weight-bold">{user.user.email}</span> ?</h5>
            </div>
            <div className="modal-footer justify-content-center">
               <button type="button" className="btn btn-danger" onClick={() => deleteUser()} style={{ textAlignLast: "center", width: "30%" }} data-bs-dismiss="modal">Sim</button>
               <button type="button" className="btn btn-primary" style={{ textAlignLast: "center", width: "100%" }}>Não</button>
            </div>
         </div>
      </div>
   </div>

   <div className="modal fade" id={"change_" + user.user._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
         <div className="modal-content">
            <div className="modal-header">
               <h5 className="modal-title">Alterar Utilizador</h5>
               <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div className="modal-body">
               <div className="m-auto w-100" style={{textAlignLast: "center"}}>
               <img src={user.user.avatar} className="avatar-profile mb-4"/>
               </div>



            <form onSubmit={handleSubmit(updateUser)}>
            <div className="row">
                    <div className="col">
                    <label>Primeiro Nome</label>
                      <input {...register("firstName", { required: true })} type="text" className="form-control" defaultValue={user.user.firstName} placeholder="Primeiro Nome"/>
                    </div>
                    <div className="col">
                    <label>Ultimo Nome</label>
                      <input {...register("lastName", { required: true })} type="text" className="form-control" placeholder="Ultimo Nome" defaultValue={user.user.lastName}/> 
                    </div>
                  </div>
               <div className="row mt-2">
                 <div className="form-group col-6">
                   <label>Estatuto</label>
                   <select className="form-control" {...register("userType", { required: true })}>
                      {String(user.user.userType).toUpperCase() == 'ADMIN' ? <><option defaultValue="selected" className="text-danger">Admin</option></> : <><option className="text-danger">Admin</option></>}
                      {String(user.user.userType).toUpperCase() == 'DESIGNER' ? <><option defaultValue="selected" className="text-warning">Designer</option></> : <><option className="text-warning">Designer</option></>}
                      {String(user.user.userType).toUpperCase() == 'DEfAULT' ? <><option defaultValue="selected" className="text-success">Default</option></> : <><option className="text-success">Default</option></>}
                   </select>
                 </div>
                 <div className="form-group col-6">
                   <label>Estado</label>
                   <select className="form-control" {...register("state", { required: true })}>
                      {String(user.user.state).toUpperCase() == 'INATIVO' ? <><option defaultValue="selected" className="text-danger">Inativo</option></> : <><option className="text-danger">Inativo</option></>}
                      {String(user.user.state).toUpperCase() == 'SUSPENSO' ? <><option defaultValue="selected" className="text-warning">Suspenso</option></> : <><option className="text-warning">Suspenso</option></>}
                      {String(user.user.state).toUpperCase() == 'ATIVO' ? <><option defaultValue="selected" className="text-success">Ativo</option></> : <><option className="text-success">Ativo</option></>}
                   </select>
                 </div>
               </div>

               <div className="form-group">
                 <label>Email </label>
                 <input type="email" {...register("email", { required: true })}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={user.user.email} placeholder="Email"/>
               </div>
               <div className="modal-footer justify-content-center">
               <button type="submit" className="btn btn-danger" style={{ textAlignLast: "center", width: "50%" }} data-bs-dismiss="modal">Efetuar Alterações</button>
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
