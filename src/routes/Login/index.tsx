import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'
import type { tipoUsuarioForm } from '../../types/tiposUsuario'
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert'
import { useAuth } from '../../contexts/AuthContext'
const API_USUARIOS = import.meta.env.VITE_API_BASE_USUARIOS

function Login () {
  const [mostrar, setMostrar] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<tipoUsuarioForm>()

  const onSubmit: SubmitHandler<tipoUsuarioForm> = async data => {
    try {
      setLoading(true)

      const response = await fetch(`${API_USUARIOS}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          senha: data.senha
        })
      })

      if (!response.ok) {
        if (response.status == 404) {
          setError('email', { type: 'manual', message: 'Email não cadastrado' })

        } else if (response.status == 401) {
          setError('senha', { type: 'manual', message: 'Senha incorreta' })

        } else {
          throw new Error()
        }
      }

      const token:{token: string} = await response.json()

      login(token.token)
      alert('Boas vindas a Leme!')

    } catch (erro) {
      if (erro instanceof Error) {
        alert('Erro inesperado... Tente novamente mais tarde')
      }

    } finally {
      setLoading(false)
    }
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
