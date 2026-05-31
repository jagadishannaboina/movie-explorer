import { useEffect, useState } from "react";

function App() {

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] =
    useState(null);

  const [favorites, setFavorites] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || []
    );


  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );

  }, [favorites]);


  const getTrendingMovies =
    async () => {

      const res = await fetch(
        "http://localhost:3000/api/trending"
      );

      const data =
        await res.json();

      setMovies(data.movies);
    };


  const searchMovies =
    async () => {

      if (!query) {
        getTrendingMovies();
        return;
      }

      const res = await fetch(
`http://localhost:3000/api/search?query=${query}`
      );

      const data =
        await res.json();

      setMovies(data.movies);
    };


  const addFavorite =
    (movie) => {

      if (
        favorites.find(
          (fav) =>
            fav.id === movie.id
        )
      ) return;

      setFavorites([
        ...favorites,
        movie,
      ]);
    };


  const removeFavorite =
    (id) => {

      setFavorites(
        favorites.filter(
          (movie) =>
            movie.id !== id
        )
      );
    };


  useEffect(() => {
    getTrendingMovies();
  }, []);


  useEffect(() => {

    const timer =
      setTimeout(
        searchMovies,
        500
      );

    return () =>
      clearTimeout(timer);

  }, [query]);


  return (

    <div
      style={{
        background:
          "#0f172a",
        minHeight:
          "100vh",
        padding: "20px",
        color: "white",
      }}
    >

      <h1>
        🎬 Movie Explorer
      </h1>


      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        style={{
          padding: "10px",
          width: "300px",
          marginBottom:
            "20px",
        }}
      />


      <h2>
        ❤️ Favorites
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          marginBottom:
            "20px",
        }}
      >

        {favorites.map(
          (movie) => (

            <div
              key={movie.id}
            >

              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                width="100"
              />

              <button
                onClick={() =>
                  removeFavorite(
                    movie.id
                  )
                }
              >
                ❌
              </button>

            </div>

          )
        )}

      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
"repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
        }}
      >

        {movies.map((movie) => (

          <div
            key={movie.id}

            onClick={() =>
              setSelectedMovie(
                movie
              )
            }

            style={{
              background:
                "#1e293b",
              padding: "10px",
              borderRadius:
                "10px",
              cursor:
                "pointer",
            }}
          >

            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "100%",
                height: "300px",
                objectFit:
                  "cover",
              }}
            />

            <h3>
              {movie.title}
            </h3>

            <p>
              ⭐{" "}
              {
movie.vote_average
              }
            </p>

            <button
              onClick={(e) => {

                e.stopPropagation();

                addFavorite(
                  movie
                );
              }}
            >
              ❤️ Favorite
            </button>

          </div>

        ))}

      </div>


      {selectedMovie && (

        <div
          onClick={() =>
            setSelectedMovie(
              null
            )
          }
          style={{
            position:
              "fixed",
            inset: 0,
            background:
"rgba(0,0,0,0.8)",
            display:
              "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
          }}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              background:
                "#1e293b",
              padding: "20px",
              width: "400px",
              borderRadius:
                "10px",
            }}
          >

            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              width="100%"
            />

            <h2>
              {
selectedMovie.title
              }
            </h2>

            <p>
              ⭐{" "}
              {
selectedMovie.vote_average
              }
            </p>

            <p>
              📅{" "}
              {
selectedMovie.release_date
              }
            </p>

            <p>
              {
selectedMovie.overview
              }
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;