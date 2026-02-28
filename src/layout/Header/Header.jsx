import { NavLink } from "react-router"
import styles from "./Header.module.css"
import Button from "../../components/Button/Button"
import { useNavigate } from "react-router"

const Header = () => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    navigate("/")
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="التنقل الرئيسي">
        <NavLink to="/genres" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>التصنيفات</NavLink>
        <NavLink to="/movies" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>الأفلام</NavLink>
      </nav>
      <Button onClick={handleLogout} text="تسجيل الخروج" className={styles.logoutBtn} />
    </header>
  )
} 

export default Header
