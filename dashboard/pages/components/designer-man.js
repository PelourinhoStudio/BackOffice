import React, { useEffect, useState } from "react"
import api from '../../services/api'
import Image from "next/dist/client/image";
import moment from "moment";
import "moment/locale/pt";

export default function DesignerMan() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        api
            .get("/users")
            .then((response) => setUsers(response.data))
            .catch((err) => {

                console.error("ops! ocorreu um erro" + err);
            });
    }, []);


    return (
<>
<div className="text-center m-3 rounded-main bg-white main-table">
   <table className="table table-striped table-hover">
      <thead>
         <tr>
            <th>Nome</th>
            <th>Ultima vez Online</th>
            <th>Estatuto</th>
            <th>Estado</th>
            <th>Email</th>
            <th>Ações</th>
         </tr>
      </thead>
      <tbody>
         {
         users.map((user) => {
         return (
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
               String(user.state).toUpperCase() == 'ATIVO' ? <><span className="status text-success">•</span> Ativo</> : <></>
               }
               {
               String(user.state).toUpperCase() == 'INATIVO' ? <><span className="status text-danger">•</span> Inativo</> : <></>
               }
               {
               String(user.state).toUpperCase() == 'SUSPENSO' ? <><span className="status text-warning">•</span> Suspenso</> : <></>
               }
            </td>
            <td>{user.email}</td>
            <td>
               <a href="#" className="settings mr-2"><i className="fas fa-cog text-danger"></i></a>
               <a href="#" className="delete" data-bs-toggle="modal" data-bs-target={"#id" + user._id}><i className="fas fa-times-circle text-primary"></i></a>
               <div className="modal fade" id={"id"+user._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title">Eliminar Utilizador</h5>
                           <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                           </button>
                        </div>
                        <div className="modal-body" style={{textAlignLast: "center"}}>
                        <i className="far fa-engine-warning text-danger mb-4" style={{fontSize: "6rem"}}></i>
                        <h5>Tem a certeza que pretende eliminar o utilizador <span className="text-primary font-weight-bold">{user.firstName + " " + user.lastName}</span></h5> 
                        
                        <h5>Com o email <span className="text-primary font-weight-bold">{user.email}</span> ?</h5>

                     </div>
                     <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-danger" style={{textAlignLast: "center", width: "30%"}} data-bs-dismiss="modal">Sim</button>
                        <button type="button" className="btn btn-primary" style={{textAlignLast: "center", width: "100%"}}>Não</button>
                     </div>
                  </div>
               </div>
</div>
</td>
</tr>
)
})
}
</tbody>
</table>
</div>
</>

    );
}
