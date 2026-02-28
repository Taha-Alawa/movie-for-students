import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../components/Modal/Modal"
import FormModel from "../../../components/FormModel/FormModel"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import { movieSchema } from "../MovieSchema"
import styles from "./MovieModal.module.css"

const MovieModal = ({ isOpen, onClose, movie, genres, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(movieSchema),
    mode: "all",
    defaultValues: {
      title: "",
      year: new Date().getFullYear(),
      rate: 0,
      location: "",
      genreId: undefined,
      id: undefined,
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (movie) {
        reset({
          title: movie.title,
          year: movie.year,
          rate: movie.rate,
          location: movie.location,
          genreId: movie.genreId,
          id: movie.id,
        })
      } else {
        reset({
          title: "",
          year: new Date().getFullYear(),
          rate: 0,
          location: "",
          genreId: undefined,
          id: undefined,
        })
      }
    }
  }, [isOpen, movie, genres, reset])

  const handleFormSubmit = (data) => {
    onSubmit({
      title: data.title,
      year: Number(data.year),
      rate: Number(data.rate),
      location: data.location,
      genreId: Number(data.genreId),
      id: movie?.id,
    })
    onClose()
  }

  const title = movie ? movie.title : "إضافة فيلم"

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <FormModel>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <Input
            label="العنوان"
            type="text"
            placeholder="عنوان الفيلم"
            error={errors.title?.message}
            {...register("title")}
          />
          <Input
            label="السنة"
            type="number"
            placeholder="2020"
            error={errors.year?.message}
            {...register("year", { valueAsNumber: true })}
          />
          <Input
            label="التقييم"
            type="number"
            placeholder="0 - 10"
            step="0.1"
            error={errors.rate?.message}
            {...register("rate", { valueAsNumber: true })}
          />
          <Input
            label="الموقع"
            type="text"
            placeholder="أدخل الموقع"
            error={errors.location?.message}
            {...register("location")}
          />
          <div className={styles.field}>
            <label htmlFor="genreId">التصنيف</label>
            <select
              id="genreId"
              className={styles.select}
              {...register("genreId", { valueAsNumber: true })}
            >
              {genres?.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            {errors.genreId && (
              <span className={styles.error}>{errors.genreId.message}</span>
            )}
          </div>
          <Button
            type="submit"
            text={isSubmitting ? "جاري الحفظ..." : movie ? "تحديث" : "إضافة"}
            disabled={isSubmitting}
          />
        </form>
      </FormModel>
    </Modal>
  )
}

export default MovieModal
