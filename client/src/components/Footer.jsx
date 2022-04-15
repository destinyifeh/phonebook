import React from 'react';
import {Link} from 'react-router-dom';

function Footer(){

    return(
        <div className="container-fluid footer text-center">
           <Link className="" to=""><i className="fa fa-telegram "></i></Link>

        <p className="copy text-center mt-5">Dezexchange &copy; 2021 </p>
      </div>
    )
}

export default Footer;