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

  //Verifica se os dados de autenticação estão corretos
    api.post("auth/login", LoginData).then((response) => {
      cookies.set('jwt', response.data, { path: '/' })

        //Se os dados de autenticação forem corretos, verifica se tem permissões para entrar na dashboard.
        api.get("me", {headers: {"x-access-token":  cookies.get('jwt')},
        })
        .then((response) => {
          //Se o utilizador não tiver permissões fica no login e recebe mensagem de erro
          if (!(response.data.userType === 'admin')) {
           cookies.remove('jwt')
           setwrongData(2)
          }else{
            router.push('/')
          }
        })
        //Se o utilizador já não estiver logado vai para o login
        .catch((err) => {
           cookies.remove('jwt')
           router.push('/')
              });
    }
    //Se os dados de autenticação não estiverem corretos recebe mensagem de erro
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
      <div className="bg-danger text-white mb-2 rounded p-2 text-center">
         <span>Password ou email incorretos!</span>
      </div>
      </>
      : wrongData === 2 ?
      <>
      <div className="bg-warning text-dark mb-2 rounded p-2 text-center">
         <span>Não tem permissões para entrar</span>
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


