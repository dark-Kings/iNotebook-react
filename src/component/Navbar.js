import React  from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
    const navegation = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("token");
             navegation("/login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                       {!(localStorage.getItem("token"))? <form className="d-flex me-auto" role="search">
                          <Link className='btn btn-primary mx-2 my-1' to='/login' role="button">Login</Link>
                          <Link className='btn btn-primary mx-2 my-1' to='signup' role="button">Signup</Link>
                        </form>:<button className="btn btn-primary" onClick={handleLogout}>Logout</button>}

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar