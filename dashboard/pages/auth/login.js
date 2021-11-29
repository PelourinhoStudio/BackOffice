import axios from "axios";
import React from 'react';
import { useForm } from 'react-hook-form';
import api from './../../services/api'
import { useState } from "react"
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'

const Login = (() => {
  const cookies = new Cookies();
  const router = useRouter()
  const { register, handleSubmit } = useForm();
  
  const [ isLoadingLogin, setLoadingLogin ] = useState(false);
  const [ wrongData, setwrongData ] = useState(0);

  async function delay(delayInms) {
	return new Promise(resolve => {
	  setTimeout(() => {
		resolve(2);
	  }, delayInms);
	});
  }

  async function LoginFunc(values) {
    const LoginData = {
      email: values.email,
      password: values.password,
    }
	await delay(1000)

    api.post("auth/login", LoginData).then((response) => {
      cookies.set('jwt', response.data, { path: '/' })
      router.push('/')
    }
    ).catch((err) => {
        setwrongData(1)
    });
   }

	return (
      
<>
<div className="main-container login">
   <main className="form-signin py-5">
      <div className="text-center mb-4">
         <p className="logo">PSTUDIO</p>
      </div>
      <form onSubmit={handleSubmit(async (data)=> {
      setLoadingLogin(true);
      await LoginFunc(data);
      setLoadingLogin(false);
      })}>
      { wrongData === 1 ?
      <>
      <div className="bg-danger text-white mb-2 rounded p-2">
         <span>Password ou email incorretos!</span>
      </div>
      </>
      : <></>
      }
      <div className="form-floating">
         <label for="floatingInput">Email address</label>
         <input {...register("email", { required: true })} type="email" className="form-control mb-2" id="floatingInput"  />
      </div>
      <div className="form-floating">
        <label for="floatingPassword" >Password</label>
         <input {...register("password", { required: true })} type="password" className="form-control" id="floatingPassword"  />
      </div>
      { isLoadingLogin ?
      <>
      <button type="submit" className="w-100 btn btn-lg btn-dark mt-3 text-red"><i className="fas fa-spinner text-secondary loading-effect"></i> Sign in</button>
      </>
      :
      <>
      <button type="submit" className="w-100 btn btn-lg btn-dark mt-3 text-white">Sign in</button>
      </>
      }
      </form>
   </main>
</div>
</>
	);
})

export default Login;


