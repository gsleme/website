import { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'

function Login () {
  const [mostrar, setMostrar] = useState(false)

  return (
    <main className='pt-10 gap-8'>
      <div className='text-center'>
        <h1 className='titulo-1 text-5xl'>Entrar</h1>
        <p>
          Ou gostaria de{' '}
          <Link to='/criar-perfil' className='font-bold'>
            Criar um perfil
          </Link>
          ?
        </p>
      </div>
      <form
        onSubmit={() => {}}
        className='formulario rounded-2xl bg-purple-400'
      >
        <fieldset>
          <input type='email' id='email' placeholder='Email' />
          <input
            type={mostrar ? 'text' : 'password'}
            id='senha'
            placeholder='Senha'
            className='w-full'
          />
          <button
            onClick={() => (mostrar ? setMostrar(false) : setMostrar(true))}
            className='flex items-center gap-2 text-sm cursor-pointer hover:font-bold'
          >
            {mostrar ? (
              <IoMdEyeOff className='text-lg' />
            ) : (
              <IoMdEye className='text-lg' />
            )}
            Mostrar senha
          </button>
        </fieldset>
        <button type='submit' className='botao-md'>Entrar</button>
      </form>
    </main>
  )
}

export default Login
