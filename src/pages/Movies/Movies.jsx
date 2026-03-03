import { useState, useEffect } from "react"
import MovieModal from "./MovieModal/MovieModal"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import TopPart from "../../components/TopPart/TopPart"
import Button from "../../components/Button/Button"
import styles from "./Movies.module.css"
import { getMovies, addMovie, updateMovie, deleteMovie } from "../../services/MoviesService"
import { getGenres } from "../../services/GenresService"

const Movies = () => {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [movieToDelete, setMovieToDelete] = useState(null)
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])

  const fetchGenres = async () => {
    try {
      const data = await getGenres()
      setGenres(data)
    } catch (error) {
      console.error("Error fetching genres", error)
    }
  }

  const fetchMovies = async () => {
    try {
      const data = await getMovies()
      setMovies(data)
    } catch (error) {
      console.error("Error fetching movies", error)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchMovies()
      await fetchGenres()
    })()
  }, [])

  const openAddModal = () => {
    setSelectedMovie(null)
    setDefaultModalOpen(true)
  }

  const openEditModal = (movie) => {
    setSelectedMovie(movie)
    setDefaultModalOpen(true)
  }

  const openDeleteModal = (movie) => {
    setMovieToDelete(movie)
    setDeleteModalOpen(true)
  }

  const closeDefaultModal = () => {
    setDefaultModalOpen(false)
    setSelectedMovie(null)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setMovieToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (movieToDelete) {
      try {
        await deleteMovie(movieToDelete.id)
        fetchMovies()
        closeDeleteModal()
      } catch (error) {
        console.error("Error deleting movie", error)
      }
    }
  }

  const handleMovieSubmit = async (data) => {
    if (data.id != null) {
    try {
        await updateMovie(data)
        fetchMovies()
        closeDefaultModal()
      } catch (error) {
        console.error("Error updating movie", error)
      }
    } else {
      try {
        await addMovie(data)
        fetchMovies()
        closeDefaultModal()
      } catch (error) {
        console.error("Error adding movie", error)
      }
    }
  }

  return (
    <main className={styles.page} aria-label="قائمة الأفلام">
      <TopPart title="الأفلام">
        <Button text="إضافة فيلم" onClick={openAddModal} />
      </TopPart>
      <section className={styles.moviesList}>
        {movies.map((movie) => (
          <article key={movie.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{movie.title}</h2>
            <p className={styles.meta}>السنة: {movie.year} | التقييم: {movie.rate}</p>
            <p className={styles.location}>{movie.location}</p>
            <p className={styles.genre}>{movie.genre.name}</p>
            <div className={styles.cardActions}>
              <Button text="تعديل" onClick={() => openEditModal(movie)} variant="secondary" />
              <Button text="حذف" onClick={() => openDeleteModal(movie)} variant="danger" />
            </div>
          </article>
        ))}
      </section>
      <MovieModal
        isOpen={defaultModalOpen}
        onClose={closeDefaultModal}
        movie={selectedMovie}
        genres={genres}
        onSubmit={handleMovieSubmit}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="حذف الفيلم"
        message={movieToDelete ? `هل أنت متأكد من حذف الفيلم "${movieToDelete.title}"؟` : ""}
      />
    </main>
  )
}

export default Movies
