import "moment/locale/pt"
import moment from "moment";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import { ref, storage, uploadBytesResumable, getDownloadURL } from '../../../../services/firebase'
import ReactTooltip from 'react-tooltip';

export default function ImageList({image, updateListFunc}) {

  const {register, handleSubmit } = useForm()


 function updateImages(values) {
  const storageRef = ref(storage, 'images/' + data.images[0].name);
  const uploadTask = uploadBytesResumable(storageRef, data.images[0]);
  const updateImages = {
    title: data.title,
    description: data.description,
    category: data.category,
    tags: data.tags,
    price: data.price,
    year: data.year,
    imageType: data.imageType,
    imageCDN: res,
    likes: data.likes,
    dislikes: data.dislikes
  }
  api
   .put(`/Images/${image._id}`, updateImages)
   

   if (updateListFunc) {
      updateListFunc();
   }
 }

    return(
<>
<ReactTooltip place="bottom" effect="solid"/>
<tr key={image._id}>
<td>
   <a data-bs-toggle="modal" data-bs-target={"#image_preview_" + image._id}>
      <img src={image.imageCDN} className="rounded" width="50px" alt="Avatar" />
   </a>
</td>
<td>
  <div className="text-title" data-tip={image.title}>
  {image.title}
  </div>
     
</td>
<td>
<div className="text-title " data-tip={image.description}>
      {image.description}
</div>
</td>
<td>
<div className="text-title " data-tip={image.category}>
      {image.category}
</div>
</td>
<td>
      {image.tags}
</td>
<td>
      {image.price}
</td>
<td>
      {moment(image.year).format('LLL')}
</td>
<td>
<a href="#" className="settings mr-2" data-bs-toggle="modal" data-bs-target={"#image_update_" + image._id}><i className="fas fa-cog text-danger"></i></a>
<a href="" className="delete" data-bs-toggle="modal" data-bs-target={"#delete_" + image._id}><i className="fas fa-times-circle text-primary"></i></a>

</td>
</tr>


<div className="modal fade" id={"image_preview_" + image._id} tabIndex="-1" role="dialog" data-tipledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{image.title}</h5>
        <button type="button" className="close" data-bs-dismiss="modal" data-tip="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body p-0">
         <img src={image.imageCDN} width="400px" alt="Avatar" />
      </div>
    </div>
  </div>
</div>

<div className="modal fade" id={"image_update_" + image._id} tabIndex="-1" role="dialog" data-tipledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Atualizar Obra</h5>
        <button type="button" className="close" data-bs-dismiss="modal" data-tip="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
              <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label For="inputEmail4">Email</label>
              <input type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
            </div>
            <div className="form-group col-md-6">
              <label For="inputPassword4">Password</label>
              <input type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
            </div>
          </div>
          <div className="form-group">
            <label For="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
          </div>
          <div className="form-group">
            <label For="inputAddress2">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label For="inputCity">City</label>
              <input type="text" className="form-control" id="inputCity"/>
            </div>
            <div className="form-group col-md-4">
              <label For="inputState">State</label>
              <select id="inputState" className="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label For="inputZip">Zip</label>
              <input type="text" className="form-control" id="inputZip"/>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck"/>
              <label className="form-check-label" For="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</div>




</>
        
    );
  }
