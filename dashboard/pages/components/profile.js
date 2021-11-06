export default function Profile() {

    return(
<>
<div className="text-center mt-4">
    <img src="avatar.png"></img>
</div>
<div className="mt-3 row">
    <div className="m-auto bg-white col-7 rounded text-center text-dark py-2 p-1 font-weight-bold">
        Carlos Moreira
    </div>
</div>
<div className="justify-content-center d-flex row">
    <div className="mt-1  mr-1 bg-white col-4 rounded text-center text-danger py-2 font-weight-bold">
        Admin
    </div>
    <div className="mt-1 bg-white col-4 rounded text-center text-dark py-2 font-weight-bold">
        <i className="fa fa-circle text-success fa-xs"></i> Online
    </div>
</div>
</>
        
    );
  }
