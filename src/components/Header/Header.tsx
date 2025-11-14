import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { LuMenu, LuSearch } from 'react-icons/lu'
import { useState } from 'react'
import { RiCloseLargeLine } from 'react-icons/ri'
import NavItem from '../NavItem/NavItem'

function Header ({ visivel }: { visivel: boolean }) {
  const location = useLocation()
  const [buscar, setBuscar] = useState(false)
  const [menu, setMenu] = useState(false)
  const locationLP = location.pathname == '/'
  const locationEntrar = location.pathname == '/entrar'
  const locationCadastrar = location.pathname == '/cadastrar'

  const switchState = (state: string) => {
    if (state == 'buscar') {
      if (buscar) {
        setBuscar(false)
      } else {
        setMenu(false)
        setBuscar(true)
      }
    } else if (state == 'menu') {
      if (menu) {
        setMenu(false)
      } else {
        setBuscar(false)
        setMenu(true)
      }
    }
  }

  if (locationLP || locationEntrar || locationCadastrar) {
    return (
      <header className='flex justify-center items-center py-2 z-2'>
        <img src={logo} alt='Logomarca da Leme' className='h-14' />

        <div
          className={`flex justify-between items-center fixed transition-full duration-400 w-screen bg-white px-6 py-2 -mt-4 ${
            !visivel && locationLP ? 'translate-y-0' : '-translate-y-50'
          }`}
        >
          <img src={logo} alt='Logomarca da Leme' className='h-10' />
          <nav className='flex gap-2 items-center'>
            <Link to='/entrar' className='botao-sm'>
              Entrar
            </Link>
            <Link to='/cadastrar' className='botao-sm'>
              Cadastrar
            </Link>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <header className='flex flex-col items-center w-screen fixed z-1'>
      <div className='flex flex-col justify-center items-center px-6 py-2 w-full fixed bg-white z-2'>
        <div className='flex justify-between items-center w-full bg-white z-3'>
          <img src={logo} alt='Logomarca da Leme' className='h-14' />
          <div className='flex gap-4 transition-300 text-4xl [&_svg]:cursor-pointer [&_svg]:hover:scale-110'>
            <button onClick={() => switchState('buscar')}>
              {buscar ? <RiCloseLargeLine /> : <LuSearch />}
            </button>
            <button onClick={() => switchState('menu')}>
              {menu ? <RiCloseLargeLine /> : <LuMenu />}
            </button>
          </div>
        </div>

        <div
          className={`w-full transition-300 ${
            buscar ? 'mt-4 opacity-100 z-2' : '-mt-14 opacity-0 -z-4'
          }`}
        >
          <form className='flex justify-between items-center bg-gray-300 rounded-full p-2 max-w-100'>
            <input
              type='text'
              className='w-full focus:outline-none pl-4 pr-2'
              placeholder='O que você está procurando?'
            />
            <button
              type='submit'
              className='text-4xl cursor-pointer transition-300 opacity-30 hover:opacity-100'
            >
              <LuSearch />
            </button>
          </form>
        </div>

        <div
          className={`w-full transition-300 ${
            menu ? 'mt-4 opacity-100 z-2' : '-mt-70 opacity-0 -z-4'
          }`}
        >
          <nav>
            <ul className='flex flex-col p-4 gap-4'>
              <NavItem nome='Home' link='/dashboard' onClick={() => switchState('menu')}/>
              <NavItem nome='Trilhas' link='/trilhas' onClick={() => switchState('menu')}/>
              <NavItem nome='Sobre a Leme' link='/sobre-nos' onClick={() => switchState('menu')}/>
              <NavItem nome='FAQ - Perguntas frequentes' link='/perguntas-frequentes' onClick={() => switchState('menu')}/>
              <NavItem nome='Fale com a gente' link='/contato' onClick={() => switchState('menu')}/>
              <NavItem nome='Minha conta' link='/minha-conta' onClick={() => switchState('menu')}/>
              <li>
                <button
                  onClick={() => {}}
                  className='hover:scale-110 cursor-pointer'
                >
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div
        className={`flex h-screen w-screen p-4 justify-center items-center fixed top-0 left-0 transition-full duration-400 bg-black/20 ${
          buscar || menu ? 'opacity-100 z-1' : 'opacity-0 -z-10'
        }`}
      ></div>
    </header>
  )
}

export default Header
