import api from '../../../../services/api'
import "moment/locale/pt";
import DesignerList from "./designer-list";
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';


export default function DesignerMan() {
   const [users, setUsers] = useState([]);
   const cookies = new Cookies();

   useEffect(() => {
      api
         .get("admin/users/type/designer", {
            headers: {
                "x-access-token":  cookies.get('jwt')
            },
        })
         .then((response) => setUsers(response.data))
         .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
         });
   }, []);
   
   const updateList = (async () => {
      setUsers(() => [api.get("/users").then((response) => setUsers(response.data))]);
   });

   return (
      <>
            <table users={users} className="table table-striped table-hover">
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
                              <DesignerList key={user._id} user={user} and updateListFunc={updateList}/>
                        ) 
                     })
                  }
               </tbody>
            </table>
      
      </>

   );
}
