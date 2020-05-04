import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router-dom";
import { FaRegPlayCircle } from "react-icons/fa";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { URL_API, API } from "../../utils/contants";
import Loading from "../../components/Loading";
import ModalVideo from "../../components/ModalVideo";

import "./movie.scss";

export default function Movie() {
  const { id } = useParams();

  const movieInfo = useFetch(
    `${URL_API}/movie/${id}?api_key=${API}&language=es-ES`
  );

  //mostrar spinner cuando no hay movie
  if (movieInfo.Loading || !movieInfo.result) {
    return <Loading />;
  }

  return <RenderMovie movieInfo={movieInfo.result} />;
}

// funcion par poner imagen de fondo de pantalla oscura
function RenderMovie(props) {
  const {
    movieInfo: { backdrop_path, poster_path },
  } = props;

  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>
        <Col span={10} className="movie__info">
          <MovieInfo movieInfo={props.movieInfo} />
        </Col>
      </Row>
    </div>
  );
}

// funcion para mostrar la caratula o poster de movie
function PosterMovie(props) {
  const { image } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;

  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
}


// funcion para mostrar datos de la pelicula
function MovieInfo(props) {
  const {
    movieInfo: { id, title, release_date, overview, genres },
  } = props;

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${API}&language=es-ES`
  );

  // para abrir y cerrar el modal
  const openModal = () => setIsVisibleModal(true);
  const closeModal = () => setIsVisibleModal(false);

  const renderVideo = () => {
    if (videoMovie.result) {
      if (videoMovie.result.results.length > 0) {
        return (
          <React.Fragment>
            <Button onClick={openModal}>
              <FaRegPlayCircle style={{ margin: "0px 5px 0px 0" }} />
              Ver Trailer
            </Button>
            <ModalVideo
              videoKey={videoMovie.result.results[0].key}
              videoPlatform={videoMovie.result.results[0].site}
              isOpen={isVisibleModal}
              close={closeModal}
            />
          </React.Fragment>
        );
      }
    }
  };

  return (
    <React.Fragment>
      <div className="movie__info-header">
        <h1>
          {" "}
          {title}
          <span> {moment(release_date, " YYYY-MM-DD").format("YYYY")} </span>
        </h1>
        {renderVideo()}
      </div>
      <div className="movie__info-content">
        <h3>General</h3>
        <p>{overview} </p>
        <h3>Generos</h3>
        <ul>
          {genres.map((e) => (
            <li key={e.id}>{e.name} </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
