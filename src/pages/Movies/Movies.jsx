import { useState } from "react"
import MovieModal from "./MovieModal/MovieModal"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import TopPart from "../../components/TopPart/TopPart"
import Button from "../../components/Button/Button"
import styles from "./Movies.module.css"

const GENRES = [
  { id: 1, name: "أكشن" },
  { id: 2, name: "كوميدي" },
  { id: 3, name: "دراما" },
]

const DUMMY_MOVIES = [
  { id: 1, title: "فيلم الأول", year: 2020, rate: 4.5, location: "المخزن أ", genreId: 1, genreName: "أكشن" },
  { id: 2, title: "فيلم الثاني", year: 2021, rate: 4.2, location: "المخزن ب", genreId: 2, genreName: "كوميدي" },
  { id: 3, title: "فيلم الثالث", year: 2022, rate: 4.8, location: "المخزن أ", genreId: 1, genreName: "أكشن" },
]

const getGenreName = (genreId) => GENRES.find((g) => g.id === genreId)?.name ?? ""

const Movies = () => {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [movieToDelete, setMovieToDelete] = useState(null)
  const [movies, setMovies] = useState(DUMMY_MOVIES)

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

  const handleConfirmDelete = () => {
    if (movieToDelete) {
      setMovies((prev) => prev.filter((m) => m.id !== movieToDelete.id))
    }
    closeDeleteModal()
  }

  const handleMovieSubmit = (data) => {
    const genreName = getGenreName(data.genreId)
    if (data.id != null) {
      setMovies((prev) =>
        prev.map((m) =>
          m.id === data.id
            ? { ...m, ...data, genreName }
            : m
        )
      )
    } else {
      const nextId = (movies.length > 0 ? Math.max(...movies.map((m) => m.id)) : 0) + 1
      setMovies((prev) => [...prev, { ...data, id: nextId, genreName }])
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
        genres={GENRES}
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
