import "moment/locale/pt"
import moment from "moment";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import { ref, storage, uploadBytesResumable, getDownloadURL } from '../../../../services/firebase'
import Masonry from 'react-masonry-css'

export default function ImageCategory({image, updateListFunc}) {

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
<Masonry
  breakpointCols={4}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">{image.imageCDN}</Masonry>
</>
        
    );
  }
