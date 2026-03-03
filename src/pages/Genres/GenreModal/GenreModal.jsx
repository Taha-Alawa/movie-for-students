import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../components/Modal/Modal"
import FormModel from "../../../components/FormModel/FormModel"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import { genreSchema } from "../GenreSchema"
import styles from "./GenreModal.module.css"

const GenreModal = ({ isOpen, onClose, genre, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(genreSchema),
    mode: "all",
    defaultValues: { name: "", id: undefined },
  })

  useEffect(() => {
    if (isOpen) {
      reset(genre ? { name: genre.name, id: genre.id } : { name: "", id: undefined })
    }
  }, [isOpen, genre, reset])

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({ name: data.name, id: genre?.id })
      onClose()

    } catch (error) {
      console.error("Error submitting genre", error)
    }
  }

  const title = genre ? `التصنيف: ${genre.name}` : "إضافة تصنيف"

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <FormModel>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <Input
            label="الاسم"
            type="text"
            placeholder="اسم التصنيف"
            error={errors.name?.message}
            {...register("name")}
          />
          <Button
            type="submit"
            text={isSubmitting ? "جاري الحفظ..." : genre ? "تحديث" : "إضافة"}
            disabled={isSubmitting}
          />
        </form>
      </FormModel>
    </Modal>
  )
}

export default GenreModal
