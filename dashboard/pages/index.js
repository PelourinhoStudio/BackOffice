
import Head from 'next/head'
import Script from 'next/script'
import Login from './auth/login'
import Cookies from 'universal-cookie';
import Dashboard from './dashboard'

export default function Home() {
   const cookies = new Cookies();
   return (
      <>
         <Head>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
         </Head>

         <body>
         { 
         
         (cookies.get('jwt') === undefined) ?

         <><Login/></> 
         : 
         <><Dashboard/></>
         }
      
 
         <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></Script>
      </body>
                  
      </>
   )
}
