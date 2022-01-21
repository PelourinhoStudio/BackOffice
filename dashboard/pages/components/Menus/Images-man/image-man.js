import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import ImageList from "./image-list";
import ImageCategory from "./image-category";
import "moment/locale/pt";
import Cookies from 'universal-cookie';
import Masonry from 'react-masonry-css'


export default function ImageMan() {
   const cookies = new Cookies();
   //Guarda as imagens que vieram da Api
   const [images, setImages] = useState([])
   //Guarda o estado de loading da Api
   const [loading, setLoading] = useState(true)
   //Guarda o formato de vista das Imagens
   const [format, setformat] = useState('list')
   //Guarda a imagem e o titulo de Previw da Imagem
   const [modalImagePreview, setmodalImagePreview] = useState(null)
   //Guarda os dados da imagem para atualização da mesma
   const [modalImageUpdate, setModalImageUpdate] = useState(null)

   //Dá fetch a todas as imagens
   useEffect(() => {
      api
         .get("images", {
            headers: {
               "x-access-token": cookies.get('jwt')
            },
         })
         .then((response) => { setImages(response.data); setLoading(false) })
         .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
         });
   }, []);


   //Atualiza os dados do Modal que dá preview às imagens e abre o modal.
   function modalPreview(modalPreviewData) {
      setmodalImagePreview(modalPreviewData)
      document.getElementById("fakeButtonPreview").click()
   }

   //Atualiza os dados do modal de atualização de imagem e abre o mesmo.
   function updateImage(modalImageData) {
      setModalImageUpdate(modalImageData)
      document.getElementById("fakeButtonUpdate").click()
   }

   function deleteTag(id, tagName) {
      var txt;
      if (confirm("Ao clicar irá eliminar a tag " + tagName)) {
         txt = "Sim"
      } else {
         txt = "Não";
      }
   }

   function addTag() {
      let text;
      let person = prompt("Qual é a tag que deseja adicionar?", "");
      if (person == null || person == "") {
         text = "User cancelled the prompt.";
      } else {
         text = "Hello " + person + "! How are you today?";
      }
   }

   return (
      <>
         {/* Modal de Preview de Imagens */}

         <button type="button" id="fakeButtonPreview" className="d-none" data-bs-toggle="modal" data-bs-target="#modalPreview" />
         <div className="modal fade" id="modalPreview" tabIndex="-1" role="dialog" data-tipledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">{modalImagePreview !== null ? modalImagePreview.title : <></>}</h5>
                     <button type="button" className="close" data-bs-dismiss="modal" data-tip="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body p-0">
                     <img src={modalImagePreview !== null ? modalImagePreview.imageCDN : <></>} width="400px" alt="Avatar" />
                  </div>
               </div>
            </div>
         </div>

         {/* Modal de Atualização de Imagens */}

         <button type="button" id="fakeButtonUpdate" className="d-none" data-bs-toggle="modal" data-bs-target="#modalImageUpdate" />

         <div className="modal fade" id="modalImageUpdate" tabIndex="-1" role="dialog" data-tipledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">{modalImageUpdate !== null ? modalImageUpdate.title : <></>}</h5>
                     <button type="button" className="close" data-bs-dismiss="modal" data-tip="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body p-0">


                     <form className="m-4">
                        <div className="text-center ">
                           <img src={modalImageUpdate?.imageCDN} className="rounded" width="100px" alt="Avatar" />
                        </div>

                        <div className="form-group">
                           <label className="text-dark">Title</label>
                           <input type="email" className="form-control" value={modalImageUpdate?.title} placeholder="Image Title" />
                        </div>
                        <div className="form-group">
                           <label className="text-dark">Description</label>
                           <textarea type="email" className="form-control" value={modalImageUpdate?.description} placeholder="Image description"></textarea>
                        </div>

                        <div className="form-group">
                           <label className="text-dark">Categorys</label>
                           <select multiple className="form-control" id="exampleFormControlSelect2">
                              {modalImageUpdate?.category.includes("landscape") ? <option id="categoryLandscape" selected>Landscape</option> : <option id="categoryLandscape" >Landscape</option>}
                              {modalImageUpdate?.category.includes("wallpaper") ? <option id="categoryWallpaper" selected>Wallpaper</option> : <option id="categoryWallpaper" >Wallpaper</option>}
                              {modalImageUpdate?.category.includes("drawing") ? <option id="categoryDrawing" selected>Drawing</option> : <option id="categoryDrawing" >Drawing</option>}
                              {modalImageUpdate?.category.includes("nature") ? <option id="categoryNature" selected>Nature</option> : <option id="categoryNature" >Nature</option>}
                           </select>
                        </div>
                        <p className="text-dark mb-2">Tipo da imagem</p>
                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                           {modalImageUpdate?.imageType == "real" ? <option id="imageTypeReal" selected>Real</option> : <option id="imageTypeReal">Real</option>}
                           {modalImageUpdate?.imageType == "digital" ? <option id="imageTypeDigital" selected>Digital</option> : <option id="imageTypeDigital">Digital</option>}
                        </select>
                        <div className="form-group">
                           <label className="text-dark">Tags</label>
                           <div className="col-12 d-flex px-0">
                              {
                                 modalImageUpdate?.tags.map((tags) => {
                                    return <><div className="btn btn-danger mr-1" onClick={() => deleteTag(modalImageUpdate?._id, tags)}>{tags}</div></>
                                 })
                              }
                              <div className="btn btn-outline-danger" onClick={() => addTag()}><i className="fas fa-plus"></i></div>
                           </div>
                        </div>
                     </form>

                  </div>
                  <div className="modal-footer">
                     <button className="btn btn-dark">Atualizar dados</button>
                  </div>
               </div>
            </div>
         </div>

         <div className="col-12 d-flex">
            <div className="col-6 px-0 py-3" style={{ placeSelf: "center" }}>
               <h5 className="text-dark m-0 font-weight-normal">Gestão de Obras</h5>
            </div>
            <div className="col-6 pr-0">
               <div className="btn-toolbar py-3 pr-0 d-block text-right" role="toolbar" aria-label="Toolbar with button groups">
                  <div className="btn-group" role="group" aria-label="First group">
                     <button type="button" className="btn btn-dark" onClick={() => setformat('list')}><i className="fas fa-th-list"></i></button>
                     <button type="button" className="btn btn-dark" onClick={() => setformat('category')}><i className="fas fa-th"></i></button>
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
                                       <ImageList key={image._id} image={image} modalPreview={modalPreview} updateImage={updateImage} />
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
                                       <img className="item" src={image.imageCDN} onClick={() => updateImage(image)}></img>
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
