import { useState } from "react";
import "./MovieApp.css";

export const MovieApp = () => {
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);

  const urlBase = "https://api.themoviedb.org/3/search/movie";
  const API_KEY = "YOUR_API_KEY";

  const handleInputChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`
      );
      const data = await response.json();
      setMovieList(data.results);
    } catch (error) {
      console.error("Ha ocurrido el siguiente error: ", error);
    }
  };

  const toggleDescription = (movie) => {
    if (activeMovie && activeMovie.id === movie.id) {
      setActiveMovie(null); // Close description if already active
    } else {
      setActiveMovie(movie); // Open description for the clicked movie
    }
  };

  const scrollLeft = () => {
    const slider = document.getElementById("movie-slider");
    slider.scrollBy({
      left: -slider.offsetWidth / 2, // Desplazamiento más suave
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const slider = document.getElementById("movie-slider");
    slider.scrollBy({
      left: slider.offsetWidth / 2, // Desplazamiento más suave
      behavior: "smooth",
    });
  };

  return (
    <div className="container">
      <h1>Buscador de Películas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribí una película"
          value={search}
          onChange={handleInputChange}
        />
        <button>Buscar</button>
      </form>

      {movieList && movieList.length > 0 && (
        <>
          <div className="movie-slider" id="movie-slider">
            {movieList.map((movie) => (
              <div
                key={movie.id}
                className={`movie-card ${
                  activeMovie && activeMovie.id === movie.id ? "active" : ""
                }`}
                onClick={() => toggleDescription(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.overview.slice(0, 100)}...</p>
                {activeMovie && activeMovie.id === movie.id && (
                  <div className="movie-card-description">
                    <h3>Descripción Completa</h3>
                    <p>{movie.overview}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="scroll-btn" onClick={scrollLeft}>
            ←
          </button>
          <button className="scroll-btn scroll-btn-right" onClick={scrollRight}>
            →
          </button>
        </>
      )}

      {/* Mensaje si no hay resultados */}
      {movieList && movieList.length === 0 && (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};
