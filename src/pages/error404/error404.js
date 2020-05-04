import React from "react";
import {Link} from "react-router-dom"
import  "./error404.scss"

export default function Error404() {
  return (
    <div className="error404" >
      <h1 > Error 404 </h1>
        <h3>Pagina no Encontrada</h3>
        <Link to="/" > Volver a Inicio </Link>
    </div>
  );
}
