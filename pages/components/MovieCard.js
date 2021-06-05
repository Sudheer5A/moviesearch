function MovieCard({ image, title, rating, release }) {
  return (
    <div className="movieCard">
      <img src={image} alt="poster" />
      <div className="movieCard__textarea">
        <h1>{title}</h1>
        <p className="movieCard__textarea-rating">Rating: {rating}</p>
        <p>
          Released date: <br />
          {release}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
