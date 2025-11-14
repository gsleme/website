import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { useState } from "react"

function App() {
  const [visivel, setVisivel] = useState(false)

  return (
    <div>
      <Header visivel={visivel}/>
      <Outlet context={{setVisivel}}/>
      <Footer/>
    </div>
  )
}

export default App
