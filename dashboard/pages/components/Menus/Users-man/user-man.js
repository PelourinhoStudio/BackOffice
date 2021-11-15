import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import Image from "next/dist/client/image";
import moment from "moment";
import { useForm } from "react-hook-form"
import "moment/locale/pt";



export default function UsersMan() {

   const [users, setUsers] = useState([]);

   useEffect(() => {
      api
         .get("/users")
         .then((response) => setUsers(response.data))
         .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
         });
   }, []);

   function updateList() {
   setUsers([api.get("/users").then((response) => setUsers(response.data))]);
   }

   return (
      <>
      {//<i className="fas fa-redo-alt text-primary mt-2" onClick={() => updateList()}></i>
      }{}
     
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
               </tbody>
            </table>
      
      </>

   );
}
