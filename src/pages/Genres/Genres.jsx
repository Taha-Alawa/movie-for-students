import { useState, useEffect } from "react"
import GenreModal from "./GenreModal/GenreModal"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import TopPart from "../../components/TopPart/TopPart"
import Button from "../../components/Button/Button"
import styles from "./Genres.module.css"
import { getGenres, addGenre, updateGenre, deleteGenre } from "../../services/GenresService"

const Genres = () => {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [genreToDelete, setGenreToDelete] = useState(null)
  const [genres, setGenres] = useState([])

  const fetchGenres = async () => {
    try {
      const data = await getGenres()
      setGenres(data)
    } catch (error) {
      console.error("Error fetching genres", error)
    }
  }

  useEffect(() => {
    (async () => {
      await fetchGenres()
    })()
  }, [])

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

  const handleConfirmDelete = async () => {
    if (genreToDelete) {
      try {
        await deleteGenre(genreToDelete.id)
        fetchGenres()
        closeDeleteModal()

      } catch (error) {
        console.error("Error deleting genre", error)
      }
    }
  }

  const handleGenreSubmit = async (data) => {
    if (data.id != null) {
      try {
        await updateGenre(data)
        fetchGenres()
        closeDefaultModal()
      } catch (error) {
        console.error("Error updating genre", error)
      }
    } else {
      try {
        await addGenre(data)
        fetchGenres()
        closeDefaultModal()
      } catch (error) {
        console.error("Error adding genre", error)
      }
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
