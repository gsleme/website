import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'
import type { tipoUsuarioForm } from '../../types/tiposUsuario'
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert'

function Cadastro () {
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
        onSubmit={handleSubmit(onSubmit)}
        className='formulario bg-purple-600'
      >
        <fieldset>
          <div>
            <input
              type='text'
              id='nome'
              placeholder='Nome'
              className={errors.nome?.message && 'red-line'}
              {...register('nome', { required: 'Campo obrigatório' })}
            />
            <ErrorAlert mensagem={errors.nome?.message} />
          </div>
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
              type='text'
              id='username'
              placeholder='Nome de usuário'
              className={errors.username?.message && 'red-line'}
              {...register('username', { required: 'Campo obrigatório' })}
            />
            <ErrorAlert mensagem={errors.username?.message} />
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
          <div>
            <input
              type={mostrar ? 'text' : 'password'}
              id='confirmarSenha'
              placeholder='Confirmar senha'
              className={errors.confirmarSenha?.message && 'red-line'}
              {...register('confirmarSenha', { required: 'Campo obrigatório' })}
            />
            <ErrorAlert mensagem={errors.confirmarSenha?.message} />
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
