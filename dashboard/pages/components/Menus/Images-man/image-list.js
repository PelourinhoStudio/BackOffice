import "moment/locale/pt"
import moment from "moment";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import { ref, storage, uploadBytesResumable, getDownloadURL } from '../../../../services/firebase'
import ReactTooltip from 'react-tooltip';

export default function ImageList({ image, updateListFunc, modalPreview, updateImage }) {

      const { register, handleSubmit } = useForm()

      function updateImages(values) {
            const storageRef = ref(storage, 'images/' + data.images[0].name)
            const uploadTask = uploadBytesResumable(storageRef, data.images[0])
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
                  updateListFunc()
            }
      }

      return (
            <>
                  <ReactTooltip place="bottom" effect="solid" />
                  <tr key={image._id}>
                        <td>
                              <a onClick={() => modalPreview(image)}>
                                    <img src={image.imageCDN} className="rounded" width="50px" alt="Avatar" />
                              </a>
                        </td>
                        <td>
                              <div className="text-title" data-tip={image.title}>
                                    {image.title}
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
                              <a href="#" className="settings mr-2" onClick={() => updateImage(image)}><i className="fas fa-cog text-danger"></i></a>
                              <a href="" className="delete" data-bs-toggle="modal" data-bs-target={"#delete_" + image._id}><i className="fas fa-times-circle text-primary"></i></a>
                        </td>
                  </tr>
            </>

      );
}
