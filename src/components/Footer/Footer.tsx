import logo from '../../assets/images/logo.png'

function Footer() {
  return (
    <footer className='flex flex-col justify-center items-center gap-2 px-8 py-4'>
        <img src={logo} alt="Logomarca da Leme" className='h-10'/>
        <p className='text-sm'>&copy; Leme 2025. Todos os direitos reservados</p>
    </footer>
  )
}

export default Footer