import { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'

function Cadastro () {
  const [mostrar, setMostrar] = useState(false)

  return (
    <main className='pt-10 gap-8'>
      <div className='text-center'>
        <h1 className='titulo-1 text-5xl'>Criar um Perfil</h1>
        <p>
          Ou gostaria de{' '}
          <Link to='/entrar' className='font-bold'>
            Entrar
          </Link>
          ?
        </p>
      </div>
      <form
        onSubmit={() => {}}
        className='formulario rounded-2xl bg-purple-600'
      >
        <fieldset>
          <input type='text' id='nome' placeholder='Nome' />
          <input type='email' id='email' placeholder='Email' />
          <input type='text' id='username' placeholder='Nome de usuário' />
          <input
            type={mostrar ? 'text' : 'password'}
            id='senha'
            placeholder='Senha'
          />
          <input
            type={mostrar ? 'text' : 'password'}
            id='confirmarSenha'
            placeholder='Confirmar senha'
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
        <p className='text-white'>
          Ao criar uma conta você concorda com os{' '}
          <Link to='/' className='font-bold'>
            Termos de Uso
          </Link>
          .
        </p>
        <button className='botao-md'>Criar Perfil</button>
      </form>
    </main>
  )
}

export default Cadastro
