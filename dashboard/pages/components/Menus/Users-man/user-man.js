import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import Cookies from 'universal-cookie'
import Userslist from "./users-list"
import "moment/locale/pt"

export default function Usersman() {
   const [users, setUsers] = useState([])
   const [isEmpty, setIsEmpty] = useState(true)
   const cookies = new Cookies()

   useEffect(() => {
      api
         .get("admin/users/type/user", {
            headers: {
                "x-access-token":  cookies.get('jwt')
            },
        })
         .then((response) => {
            setUsers(response.data)
            if (response.data == '') {
               setIsEmpty(false)
            } else setIsEmpty(true)
         })
         .catch((err) => {
            console.error("ops! ocorreu um erro" + err)
         })
   }, [])
   
   const updateList = (async () => {
      setUsers(() => [api.get("admin/users/type/user", {headers: {"x-access-token": cookies.get('jwt')}})
        .then((response) => {
        setUsers(response.data)   
   }).catch((err) => {
      alert(err)
   })

])
   })

   return (
      <>
         <div className="col-6 px-0 py-3 p-2" style={{placeSelf: "center"}}>
         <h5 className="text-dark m-0 font-weight-normal">Gestão de Obras</h5>
         </div>
            <table users={users} className="table table-striped table-hover">
               <thead>
                  <tr>
                     <th className="font-weight-light">Nome</th>
                     <th className="font-weight-light">Ultima vez Online</th>
                     <th className="font-weight-light">Estatuto</th>
                     <th className="font-weight-light">Estado</th>
                     <th className="font-weight-light">Email</th>
                     <th className="font-weight-light">Ações</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     users.map((user) => {
                        return (
                              <Userslist key={user._id} user={user} and updateListFunc={updateList}/>
                        ) 
                     })
                  }
               </tbody>
            </table>
      
      </>

   );
}
