import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import ImageList from "./image-list";
import ImageCategory from "./image-category";
import "moment/locale/pt";
import Cookies from 'universal-cookie';
import Masonry from 'react-masonry-css'


export default function ImageMan() {
   const cookies = new Cookies();
   const [images, setImages] = useState([])
   const [loading, setLoading] = useState(true)
   const [format, setformat] = useState('list')
   const [arrayImage, setArrayImage] = useState([])

   useEffect(() => {
      api
         .get("admin/images", {
            headers: {
                "x-access-token":  cookies.get('jwt')
            },
        })
         .then((response) => {setImages(response.data); setLoading(false)})
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
      <div className="col-12 d-flex">
         <div className="col-6 px-0 py-3" style={{placeSelf: "center"}}>
         <h5 className="text-dark m-0 font-weight-normal">Gestão de Utilizadores</h5>
         </div>
         <div className="col-6 pr-0">
         <div className="btn-toolbar py-3 pr-0 d-block text-right" role="toolbar" aria-label="Toolbar with button groups">
         <div className="btn-group" role="group" aria-label="First group">
           <button type="button" className="btn btn-dark" onClick={() => setformat('list')}><i class="fas fa-th-list"></i></button>
           <button type="button" className="btn btn-dark" onClick={() => setformat('category')}><i class="fas fa-th"></i></button>
         </div>
      </div>
         </div>
      </div>


            <table className="table table-striped table-hover">
               {(loading === true) ?
               <i className="fas fa-spinner text-dark loading-effect center-absolute fa-2x"></i>
               :
               <>
                  {format === 'list' 
                        ? 
                        <>
                        <thead>
                        <tr>
                           <th className="font-weight-light">Obra</th>
                           <th className="font-weight-light">Titulo</th>
                           <th className="font-weight-light">Categorias</th>
                           <th className="font-weight-light">Tags</th>
                           <th className="font-weight-light">Preço</th>
                           <th className="font-weight-light">Ano</th>
                           <th className="font-weight-light">Ações</th>
                        </tr>
                     </thead>
                     <tbody>
                     {
                        images.map((image) => {
                           return (
                              <>
                                 <ImageList key={image._id} image={image} and updateListFunc={updateList}/>
                              </>
                           ) 
                        })
                     }
                                    </tbody>
                     </>
                        :
                        <>
                        <div className="masonry">
                        {
                           images.map((image) => {
                              return (
                                 <>
                                 <img className="item" src={image.imageCDN}></img>
                                 </>
                              ) 
                           })
                        }
                        </div>
                        </>


                  }
               </>

               }


            </table>
      
      </>

   );
}
