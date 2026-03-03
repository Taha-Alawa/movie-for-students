import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Layout from "./layout/Layout"
import Login from "./pages/Login/Login"
import Genres from "./pages/Genres/Genres"
import Movies from "./pages/Movies/Movies"
import Guard from "./guards/Guard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route element={<Guard />}>
              <Route path="genres" element={<Genres />} />
              <Route path="movies" element={<Movies />} />
            </Route>
          </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
