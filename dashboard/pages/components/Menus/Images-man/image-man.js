import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import ImageList from "./image-list";
import "moment/locale/pt";
import Cookies from 'universal-cookie';


export default function ImageMan() {
   const cookies = new Cookies();
   const [images, setImages] = useState([]);

   useEffect(() => {
      api
         .get("admin/images", {
            headers: {
                "x-access-token":  cookies.get('jwt')
            },
        })
         .then((response) => setImages(response.data))
         .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
         });
   }, []);

   function updateList() {
      setImages([api.get("/images").then((response) => setImages(response.data))]);
   }

   return (
      <>
      {//<i className="fas fa-redo-alt text-primary mt-2" onClick={() => updateList()}></i>
      }{}
     
            <table className="table table-striped table-hover">
               <thead>
                  <tr>
                     <th>Obra</th>
                     <th>Titulo</th>
                     <th>Descrição</th>
                     <th>Categorias</th>
                     <th>Tags</th>
                     <th>Preço</th>
                     <th>Ano</th>
                     <th>Ações</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     images.map((image) => {
                        return (
                              <ImageList key={image._id} image={image} and updateListFunc={updateList}/>
                        ) 
                     })
                  }
               </tbody>
            </table>
      
      </>

   );
}
