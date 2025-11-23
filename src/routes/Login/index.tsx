import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'
import type { tipoUsuarioForm } from '../../types/tiposUsuario'
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert'

function Login () {
  const [mostrar, setMostrar] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<tipoUsuarioForm>()

  const onSubmit: SubmitHandler<tipoUsuarioForm> = async data => {
    console.log(data)
  }

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
        onSubmit={handleSubmit(onSubmit)}
        className='formulario bg-purple-400'
      >
        <fieldset>
          <div>
            <input
              type='email'
              id='email'
              placeholder='Email'
              className={errors.email?.message && 'red-line'}
              {...register('email', { required: 'Campo obrigatório' })}
            />
            <ErrorAlert mensagem={errors.email?.message} />
          </div>
          <div>
            <input
              type={mostrar ? 'text' : 'password'}
              id='senha'
              placeholder='Senha'
              className={errors.senha?.message && 'red-line'}
              {...register('senha', { required: 'Campo obrigatório' })}
            />
            <ErrorAlert mensagem={errors.senha?.message} />
          </div>
          <div
            onClick={() => (mostrar ? setMostrar(false) : setMostrar(true))}
            className='text-sm text-white cursor-pointer hover:font-bold [&_div]:flex [&_div]:items-center [&_div]:gap-2'
          >
            {mostrar ? (
              <div>
                <IoMdEyeOff className='text-lg' />
                Esconder senha
              </div>
            ) : (
              <div>
                <IoMdEye className='text-lg' />
                Mostrar senha
              </div>
            )}
          </div>
        </fieldset>
        <button type='submit' className='botao-md'>
          Entrar
        </button>
      </form>
    </main>
  )
}

export default Login
