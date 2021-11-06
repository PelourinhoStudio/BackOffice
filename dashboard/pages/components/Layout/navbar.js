export default function Navbar() {

    return(
<>
<nav className="navbar navbar-expand-lg navbar-light pr-0">
         <a className="navbar-brand" href="#">PSTUDIO</a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse mt-2" id="navbarSupportedContent">
            <form className="form-inline my-0" style={{marginLeft: "176px"}}>
            <div className="searchForm">
               <button className="btn search-btn" type="submit"><i className="fas fa-search text-primary"></i></button>
               <input className="form-control mr-sm-2" type="search" placeholder="Search for files by name or color" aria-label="Search for files by name or color"/>
            </div>
            </form>
            <ul className="navbar-nav ml-auto">
            <li className="nav-item Ativo">
               <a className="nav-link" href="#">Exposições</a>
            </li>
            <li className="nav-item Ativo">
               <a className="nav-link" href="#">Artistas</a>
            </li>
            <li className="nav-item Ativo">
               <a className="nav-link" href="#">Contactos</a>
            </li>
            <li className="nav-item">
               <a className="nav-link" href="#">Loja Online</a>
            </li>
            <li className="nav-item dropdown">
               <a className="nav-link dropdown-toggle p-0 ml-2" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <img src="avatar-nav.png"></img>
               </a>
               <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
               </div>
            </li>
            </ul>
         </div>
      </nav>
</>
        
    );
  }
