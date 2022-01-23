export default function Navbar() {

    return(
<>
<nav className="navbar navbar-expand-lg navbar-light pr-0">
         <a className="navbar-brand" href="#">PSTUDIO</a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse mt-2" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item Ativo">
               <a className="nav-link" href="#">Exhibitions</a>
            </li>
            <li className="nav-item Ativo">
               <a className="nav-link" href="#">Artists</a>
            </li>
            <li className="nav-item Ativo">
               <a className="nav-link" href="#">Contacts</a>
            </li>
            <li className="nav-item">
               <a className="nav-link" href="#">Online Store</a>
            </li>
            </ul>
         </div>
      </nav>
</>
        
    );
  }
