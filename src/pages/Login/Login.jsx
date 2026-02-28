import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import FormModel from "../../components/FormModel/FormModel"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import { loginSchema } from "./loginSchema"
import styles from "./Login.module.css"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <section className={styles.page} aria-label="تسجيل الدخول">
      <h1 className={styles.title}>تسجيل الدخول</h1>
      <FormModel>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="البريد الإلكتروني"
            type="email"
            placeholder="example@mail.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="كلمة المرور"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button 
            type="submit" 
            text={isSubmitting ? "جاري التسجيل..." : "تسجيل الدخول"} 
            disabled={isSubmitting} 
          />
        </form>
      </FormModel>
    </section>
  )
}

export default Login
