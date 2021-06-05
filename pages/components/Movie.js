import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { AiFillStar } from "react-icons/ai";

function Movie() {
  const API_KEY = "a0b2840829d3ffe238edad99b44e97d4";
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [toprated, setTopRated] = useState([]);
  const [banner, setBanner] = useState([]);

  const getMovieData = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setBanner(
          data.results[Math.floor(Math.random() * data.results.length - 1)]
        );
        setMovies(data.results);
      });
  };

  const getPopularData = async () => {
    await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setPopular(data.results);
      });
  };

  const getNowplayingData = async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTopRated(data.results);
      });
  };
  //https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US
  // https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
  useEffect(() => {
    getMovieData();
    getPopularData();
    getNowplayingData();
  }, []);

  return (
    <div className="movie">
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `linear-gradient( rgba(0,0,0,0),#000000), url("http://image.tmdb.org/t/p/w500/${banner.backdrop_path}")`,
        }}
      >
        <div className="banner__info">
          <h1 style={{ margin: "0" }}>{banner.title}</h1>
          <p className="banner__info-overview">{banner.overview}</p>
          <p style={{ display: "flex", alignItems: "center" }}>
            {banner.vote_average} <AiFillStar style={{ marginLeft: "5px" }} />
          </p>
        </div>
      </header>
      <h1>Popular</h1>
      <div className="popularbox">
        <div className="popular">
          {popular.map((item, index) => {
            return (
              <MovieCard
                key={index}
                image={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
                title={item.original_title}
                overview={item.overview}
                rating={item.vote_average}
                release={item.release_date}
              />
            );
          })}
        </div>
      </div>
      <h1>Top rated</h1>
      <div className="topratedbox">
        <div className="toprated">
          {toprated.map((item, index) => {
            return (
              <MovieCard
                key={index}
                image={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
                title={item.original_title}
                overview={item.overview}
                rating={item.vote_average}
                release={item.release_date}
              />
            );
          })}
        </div>
      </div>
      <h1>Upcoming</h1>
      <div className="movie__section">
        {movies.map((item, index) => {
          return (
            <MovieCard
              key={index}
              image={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
              title={item.original_title}
              overview={item.overview}
              rating={item.vote_average}
              release={item.release_date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Movie;
