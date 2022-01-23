import api from '../../../../services/api'
import "moment/locale/pt";
import DesignerList from "./designer-list";
import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { isEmptyObject } from 'jquery';

export default function DesignerMan() {
   const [users, setUsers] = useState([]);
   const [isEmpty, setIsEmpty] = useState([]);
   const cookies = new Cookies();

   useEffect(() => {
      api
         .get("admin/users/type/designer", {
            headers: {
               "x-access-token": cookies.get('jwt')
            },
         })
         .then((response) => {
            setUsers(response.data)
            if (response.data == '') {
               setIsEmpty(false)
            } else setIsEmpty(true)
         })
         .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
         });
   }, []);

   const updateList = (async () => {
      setUsers(() => [api.get("admin/users/type/designer", {
         headers: {
            "x-access-token": cookies.get('jwt')
         },
      }).then((response) => {
         setUsers(response.data);
         console.log(response.data)

      }).catch((error) => {
         alert(error);
      })

      ]);
   });

   return (
      <>
         <div className="col-6 px-0 py-3 p-2" style={{ placeSelf: "center" }}>
            <h5 className="text-dark m-0 font-weight-normal">Designers Management</h5>
         </div>
         <table users={users} className="table table-striped table-hover">
            <thead>
               <tr>
                  <th className="font-weight-light">Name</th>
                  <th className="font-weight-light">Last time Online</th>
                  <th className="font-weight-light">Statute</th>
                  <th className="font-weight-light">State</th>
                  <th className="font-weight-light">Email</th>
                  <th className="font-weight-light">Actions</th>
               </tr>
            </thead>

            <tbody>
               {
                  isEmptyObject(users) ? <div className='p-4'>There are no designers</div> :


                     users.map((user) => {
                        return (
                           <>
                              <DesignerList key={user._id} user={user} and updateListFunc={updateList} />
                           </>
                        )
                     })
               }
            </tbody>

         </table>

      </>

   );
}
