import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { useState } from "react"

function App() {
  const [visivel, setVisivel] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <Header visivel={visivel}/>
      <Outlet context={{setVisivel}}/>
      <Footer/>
    </div>
  )
}

export default App
