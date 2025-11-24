import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { Link } from 'react-router-dom'
import type { tipoUsuario, tipoUsuarioForm } from '../../types/tiposUsuario'
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert'
import { useAuth } from '../../contexts/AuthContext'
import { Areas } from '../../types/contentAreas'
const API_USUARIOS = import.meta.env.VITE_API_BASE_USUARIOS

function Cadastro () {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm<tipoUsuarioForm>()

  const [mostrar, setMostrar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [areaSelecionada, setAreaSelecionada] = useState('')
  const [acessibilidadeSelecionada, setAcessibilidadeSelecionada] = useState('')
  const watchSenha = watch('senha')

  const onSubmit: SubmitHandler<tipoUsuarioForm> = async data => {
    try {
      setLoading(true)

      const checkResponse = await fetch(API_USUARIOS)
      const usuarios: tipoUsuario[] = await checkResponse.json()

      const emailJaExiste = usuarios.some(
        (usuario: tipoUsuario) => usuario.email === data.email
      )

      const usernameJaExiste = usuarios.some(
        (usuario: tipoUsuario) => usuario.username === data.username
      )

      if (emailJaExiste) {
        setError('email', {
          type: 'manual',
          message: 'Email já cadastrado'
        })
        return
      }

      if (usernameJaExiste) {
        setError('username', {
          type: 'manual',
          message: 'Username já cadastrado'
        })
        return
      }

      const cadastroResponse = await fetch(`${API_USUARIOS}/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: data.nome,
          username: data.username,
          email: data.email,
          senha: data.senha,
          area: data.area,
          acessibilidade: data.acessibilidade,
          modulos_concluidos: 0,
          xp_total: 0
        })
      })

      if (!cadastroResponse.ok) throw new Error()

      const loginResponse = await fetch(`${API_USUARIOS}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          senha: data.senha
        })
      })

      if (!loginResponse.ok) throw new Error()

      const token: { token: string } = await loginResponse.json()

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
              {...register('nome', {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/,
                  message: 'Precisa ser apenas letras'
                },
                minLength: {
                  value: 3,
                  message: 'Precisa de pelo menos 3 letras'
                }
              })}
            />
            <ErrorAlert mensagem={errors.nome?.message} />
          </div>
          <div>
            <input
              type='email'
              id='email'
              placeholder='Email'
              className={errors.email?.message && 'red-line'}
              {...register('email', {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email inválido'
                }
              })}
            />
            <ErrorAlert mensagem={errors.email?.message} />
          </div>
          <div>
            <input
              type='text'
              id='username'
              placeholder='Nome de usuário'
              className={errors.username?.message && 'red-line'}
              {...register('username', {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^\S+$/,
                  message: 'Não pode conter espaços'
                },
                minLength: {
                  value: 6,
                  message: 'Precisa de pelo menos 6 caracteres'
                }
              })}
            />
            <ErrorAlert mensagem={errors.username?.message} />
          </div>
          <div className='my-4'>
            <p className='mb-4 text-white'>Qual sua área de atuação?</p>
            <div className='flex flex-wrap gap-2'>
              {Areas.map(
                (area, index) => (
                  <label
                    key={index}
                    onClick={() => setAreaSelecionada(area)}
                    className={`cursor-pointer rounded-full px-4 py-1 min-w-20 text-center border ${
                      areaSelecionada == area
                        ? 'bg-purple-200 text-purple-800 border-text-purple-800'
                        : 'bg-gray-200 text-gray-800 border-text-gray-800'
                    }`}
                  >
                    <input
                      type='radio'
                      value={area == 'Não sei/Nenhuma dessas' ? 'SoftSkills' : area}
                      {...register('area', { required: 'Campo obrigatório' })}
                      className='hidden peer'
                    />
                    <span>{area}</span>
                  </label>
                )
              )}
            </div>
            <ErrorAlert mensagem={errors.area?.message} />
          </div>
          <div className='my-4'>
            <p className='mb-4 text-white'>Possui alguma condição?</p>
            <div className='flex flex-wrap gap-2'>
              {['Libras', 'Cego', 'Nenhuma'].map(
                (acessibilidade, index) => (
                  <label
                    key={index}
                    onClick={() => setAcessibilidadeSelecionada(acessibilidade)}
                    className={`cursor-pointer rounded-full px-4 py-1 min-w-20 text-center border ${
                      acessibilidadeSelecionada == acessibilidade
                        ? 'bg-purple-200 text-purple-800 border-text-purple-800'
                        : 'bg-gray-200 text-gray-800 border-text-gray-800'
                    }`}
                  >
                    <input
                      type='radio'
                      value={acessibilidade.toLowerCase()}
                      {...register('acessibilidade', { required: 'Campo obrigatório' })}
                      className='hidden peer'
                    />
                    <span>{acessibilidade}</span>
                  </label>
                )
              )}
            </div>
            <ErrorAlert mensagem={errors.acessibilidade?.message} />
          </div>
          <div>
            <input
              type={mostrar ? 'text' : 'password'}
              id='senha'
              placeholder='Senha'
              className={errors.senha?.message && 'red-line'}
              {...register('senha', {
                required: 'Campo obrigatório',
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/,
                  message:
                    'Precisa ter pelo menos um número, uma letra maiúscula, uma letra minúscula, um número e um símbolo'
                },
                minLength: {
                  value: 6,
                  message: 'Precisa de pelo menos 6 caracteres'
                }
              })}
            />
            <ErrorAlert mensagem={errors.senha?.message} />
          </div>
          <div>
            <input
              type={mostrar ? 'text' : 'password'}
              id='confirmarSenha'
              placeholder='Confirmar senha'
              className={errors.confirmarSenha?.message && 'red-line'}
              {...register('confirmarSenha', {
                required: 'Campo obrigatório',
                validate: value => {
                  return value === watchSenha || 'Senhas não estão iguais'
                }
              })}
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
