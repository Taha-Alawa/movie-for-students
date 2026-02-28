import { useState } from "react"
import GenreModal from "./GenreModal/GenreModal"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import TopPart from "../../components/TopPart/TopPart"
import Button from "../../components/Button/Button"
import styles from "./Genres.module.css"

const DUMMY_GENRES = [
  { id: 1, name: "أكشن" },
  { id: 2, name: "كوميدي" },
  { id: 3, name: "دراما" },
]

const Genres = () => {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [genreToDelete, setGenreToDelete] = useState(null)
  const [genres, setGenres] = useState(DUMMY_GENRES)

  const openAddModal = () => {
    setSelectedGenre(null)
    setDefaultModalOpen(true)
  }

  const openEditModal = (genre) => {
    setSelectedGenre(genre)
    setDefaultModalOpen(true)
  }

  const openDeleteModal = (genre) => {
    setGenreToDelete(genre)
    setDeleteModalOpen(true)
  }

  const closeDefaultModal = () => {
    setDefaultModalOpen(false)
    setSelectedGenre(null)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setGenreToDelete(null)
  }

  const handleConfirmDelete = () => {
    console.log("Delete genre", genreToDelete)
    closeDeleteModal()
  }

  const handleGenreSubmit = (data) => {
    if (data.id != null) {
      setGenres((prev) => prev.map((g) => (g.id === data.id ? { ...g, name: data.name } : g)))
    } else {
      const nextId = (genres.length > 0 ? Math.max(...genres.map((g) => g.id)) : 0) + 1
      setGenres((prev) => [...prev, { id: nextId, name: data.name }])
    }
  }

  return (
    <section className={styles.page} aria-label="قائمة التصنيفات">
      <TopPart title="التصنيفات">
        <Button text="إضافة تصنيف" onClick={openAddModal} />
      </TopPart>
      <ul className={styles.list}>
        {genres.map((genre) => (
          <li key={genre.id} className={styles.item}>
            <span className={styles.name}>{genre.name}</span>
            <span className={styles.actions}>
              <Button text="تعديل" onClick={() => openEditModal(genre)} variant="secondary" />
              <Button text="حذف" onClick={() => openDeleteModal(genre)} variant="danger" />
            </span>
          </li>
        ))}
      </ul>
      <GenreModal
        isOpen={defaultModalOpen}
        onClose={closeDefaultModal}
        genre={selectedGenre}
        onSubmit={handleGenreSubmit}
      />
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="حذف التصنيف"
        message={genreToDelete ? `هل أنت متأكد من حذف التصنيف "${genreToDelete.name}"؟` : ""}
      />
    </section>
  )
}

export default Genres
