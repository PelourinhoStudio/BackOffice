import "moment/locale/pt"
import moment from "moment";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react"
import api from '../../../../services/api'
import { ref, storage, uploadBytesResumable, getDownloadURL } from '../../../../services/firebase'
import ReactTooltip from 'react-tooltip';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

export default function ImageList({ image, modalPreview, updateModalImage, deleteImage }) {

      const cookies = new Cookies();

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
                              <div className="text-title" data-tip={image.category}>
                                    {
                                          image.category.map((category) => {
                                                return (
                                                      <>
                                                            {category + " "}
                                                      </>
                                                )
                                          })
                                    }
                              </div>
                        </td>
                        <td>
                              {
                                    image.tags.map((tags) => {
                                          return (
                                                <>
                                                      {tags + " "}
                                                </>
                                          )
                                    })
                              }
                        </td>
                        <td>
                              {image.price + " €"}
                        </td>
                        <td>
                              {moment(image.year).format('LL')}
                        </td>
                        <td>
                              <a href="#" className="settings mr-2" onClick={() => updateModalImage(image)}><i className="fas fa-cog text-danger"></i></a>
                              <a href="" className="delete" data-bs-toggle="modal" onClick={() => deleteImage(image._id)}><i className="fas fa-times-circle text-primary"></i></a>
                        </td>
                  </tr>
            </>

      );
}
