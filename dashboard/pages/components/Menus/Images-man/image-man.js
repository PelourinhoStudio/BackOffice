import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import ImageList from "./image-list";
import "moment/locale/pt";
import Cookies from 'universal-cookie';
import $ from 'jquery';
import { ref, storage, uploadBytesResumable, getDownloadURL } from '../../../../services/firebase'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';


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

   const [tags, setTags] = useState(null)

   const [savedtags, setSavedTags] = useState(null)


   const { register, handleSubmit } = useForm()

   //Dá fetch a todas as imagens
   useEffect(() => {
      fetchImages()
   }, []);

   function fetchImages() {
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
   }

   function updateImage() {
      console.log( document.getElementById('imageUpload').files[0])
      const storageRef = ref(storage, 'images/' + document.getElementById('imageUpload').files[0].name);
      uploadBytesResumable(storageRef, document.getElementById('imageUpload').files[0]);

      getDownloadURL(storageRef)
         .then((res) => {
            const newImage = {
               title: document.getElementById('imageTitle').value,
               description: document.getElementById('imageDescription').value,
               categorys: document.getElementById('imageCategory').value,
               tags: savedtags,
               imageType: document.getElementById('imageType').value,
               imageCDN: res,
            }
            api.put(`/admin/images/${modalImageUpdate._id}`, newImage, {
               headers: {
                  "x-access-token": cookies.get('jwt')
               },
            })
               .then(res => {
                  toast.success("Imagem enviada com sucesso!")
               })
               .catch(err => {
                  if (err) {
                     toast.error("Erro ao enviar a imagem. Tenta novamente mais tarde.")
                  }
               })
         })
   }


   //Atualiza os dados do Modal que dá preview às imagens e abre o modal.
   function modalPreview(modalPreviewData) {
      setmodalImagePreview(modalPreviewData)
      document.getElementById("fakeButtonPreview").click()
   }

   //Atualiza os dados do modal de atualização de imagem e abre o mesmo.
   function updateModalImage(modalImageData) {
      setModalImageUpdate(modalImageData)
      updateTags(modalImageData)

      document.getElementById("fakeButtonUpdate").click()

   }

   function deleteTag(content, tagName) {
      if (confirm("Ao clicar irá eliminar a tag " + tagName) == true) {
         var finded = null;
         const newContent = content
         finded = newContent?.tags.indexOf(tagName)
         newContent?.tags.splice(finded, 1)
         console.log(newContent)
         if (finded != null) {
            setModalImageUpdate(newContent)
            updateTags(newContent)
         }
      }
   }

   function addTag() {
      let addTag = prompt("Qual é a tag que deseja adicionar?", "");
      if (addTag != null) {
         const newContent = modalImageUpdate
         newContent?.tags.push(addTag)
         setModalImageUpdate(newContent)
         updateTags(newContent)
      }
   }

   function updateTags(content) {
      let buttons = []
      let saveTags = []
      for (let i = 0; i < content?.tags.length; i++) {
         buttons.push(<><div className="btn btn-danger mr-1 mb-1" onClick={() => deleteTag(content, content?.tags[i])}>{content?.tags[i]}</div></>)
         saveTags.push(content?.tags[i])
      }
      setSavedTags(saveTags)
      setTags(buttons)
   }

   return (
      <>
         {/* Modal de Preview de Imagens */}

         <button type="button" id="fakeButtonPreview" className="d-none" data-bs-toggle="modal" data-bs-target="#modalPreview" />
         <div className="modal fade" id="modalPreview" tabIndex="-1" role="dialog" data-tipledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title text-dark" id="exampleModalLabel">{modalImagePreview?.title}</h5>
                     <button type="button" className="close" data-bs-dismiss="modal" data-tip="Close" >
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body p-4 text-center">
                     <img src={modalImagePreview?.imageCDN} width="400px" alt="Avatar" />
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
                     <h5 className="modal-title" id="exampleModalLabel">{modalImageUpdate?.title}</h5>
                     <button type="button" className="close" data-bs-dismiss="modal" data-tip="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body p-0">
                     <form className="m-4" onSubmit={handleSubmit(updateImage)}>
                        <div className="text-center ">
                           <img src={modalImageUpdate?.imageCDN} className="rounded" width="100px" alt="Avatar" />
                        </div>
                        <div class="mb-3">
                           <label for="formFile" className="form-label">Default file input example</label>
                           <input className="form-control p-1" id="imageUpload" type="file" />
                        </div>

                        <div className="form-group">
                           <label className="text-dark">Author</label>
                           <input type="text" className="form-control" id="imageAuthorName" placeholder="Image Title" value={(modalImageUpdate?.author.firstName + " " + modalImageUpdate?.author.lastName)} disabled />
                        </div>

                        <div className="form-group">
                           <label className="text-dark">Title</label>
                           <input type="text" className="form-control" id="imageTitle" defaultValue={modalImageUpdate?.title} placeholder="Image Title" required />
                        </div>
                        <div className="form-group">
                           <label className="text-dark">Description</label>
                           <textarea type="text" className="form-control" id="imageDescription" {...register("description")} defaultValue={modalImageUpdate?.description} placeholder="Image description" required />
                        </div>

                        <div className="form-group">
                           <label className="text-dark">Categorys</label>
                           <select multiple className="form-control" id="imageCategory" {...register("categorys")} required>
                              {modalImageUpdate?.category.includes("landscape") ? <option id="categoryLandscape" selected>Landscape</option> : <option id="categoryLandscape" >Landscape</option>}
                              {modalImageUpdate?.category.includes("wallpaper") ? <option id="categoryWallpaper" selected>Wallpaper</option> : <option id="categoryWallpaper" >Wallpaper</option>}
                              {modalImageUpdate?.category.includes("drawing") ? <option id="categoryDrawing" selected>Drawing</option> : <option id="categoryDrawing" >Drawing</option>}
                              {modalImageUpdate?.category.includes("nature") ? <option id="categoryNature" selected>Nature</option> : <option id="categoryNature" >Nature</option>}
                           </select>
                        </div>
                        <p className="text-dark mb-2">Image Type</p>
                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" id="imageType" {...register("imageType")} >
                           {modalImageUpdate?.imageType == "real" ? <option id="imageTypeReal" selected>Real</option> : <option id="imageTypeReal">Real</option>}
                           {modalImageUpdate?.imageType == "digital" ? <option id="imageTypeDigital" selected>Digital</option> : <option id="imageTypeDigital">Digital</option>}
                        </select>
                        <div className="form-group">
                           <label className="text-dark">Tags</label>
                           <div className="col-12 d-flex px-0 row mx-0">
                              {
                                 tags
                              }
                              <div className="btn btn-outline-danger mb-1" onClick={() => addTag()}><i className="fas fa-plus"></i></div>
                           </div>
                        </div>

                        <button type="submit" className="btn btn-dark float-right mb-4">Atualizar dados</button>
                     </form>

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
                                       <ImageList key={image._id} image={image} modalPreview={modalPreview} updateModalImage={updateModalImage} />
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
                                       <img className="item" src={image.imageCDN} onClick={() => updateModalImage(image)}></img>
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
