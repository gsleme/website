import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { useAuth } from '../../contexts/AuthContext'

function Footer () {
  const { usuario } = useAuth()

  return (
    <footer className='flex flex-col justify-center items-center gap-2 px-8 py-4 w-full max-w-240'>
      <img src={logo} alt='Logomarca da Leme' className='h-10' />
      <p className='text-sm'>&copy; Leme 2025. Todos os direitos reservados</p>
      <nav className='w-full'>
        <ul className='flex flex-col md:flex-row justify-center items-center my-8 text-sm gap-6 [&_li]:hover:font-bold'>
          <li>
            <Link to={usuario ? '/dashboard' : '/'}>Home</Link>
          </li>
          <li>
            <Link to='/sobre-nos'>Sobre a Leme</Link>
          </li>
          <li>
            <Link to='/perguntas-frequentes'>FAQ - Perguntas frequentes</Link>
          </li>
          <li>
            <Link to='/contato'>Fale com a gente</Link>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
