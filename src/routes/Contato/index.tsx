import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { IconType } from 'react-icons'
import type { tipoMensagem } from '../../types/tiposMensagem'
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert'

// import de ícones
import { FaMapPin, FaShareAlt } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { IoEnter } from 'react-icons/io5'
import {
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTelegram2Fill,
  RiTwitterXFill,
  RiWhatsappFill,
  RiYoutubeFill
} from 'react-icons/ri'

function Contato () {
  const [contato, setContato] = useState(2)
  const socials: {
    emoji: IconType
    rede: string
    endereco: string
    link: string
  }[] = [
    {
      emoji: RiInstagramFill,
      rede: 'Instagram',
      endereco: '@leme_oficial',
      link: 'https://www.instagram.com'
    },
    {
      emoji: RiWhatsappFill,
      rede: 'WhatsApp',
      endereco: '(11) 91234-5678',
      link: 'https://www.whatsapp.com'
    },
    {
      emoji: RiYoutubeFill,
      rede: 'YouTube',
      endereco: '@Leme Oficial',
      link: 'https://www.youtube.com'
    },
    {
      emoji: RiFacebookFill,
      rede: 'Facebook',
      endereco: '@Leme Oficial',
      link: 'https://www.facebook.com'
    },
    {
      emoji: RiLinkedinFill,
      rede: 'LinkedIn',
      endereco: 'in/leme',
      link: 'https://www.linkedin.com'
    },
    {
      emoji: RiTwitterXFill,
      rede: 'Twitter',
      endereco: '@leme_oficial',
      link: 'https://www.twitter.com'
    },
    {
      emoji: RiTelegram2Fill,
      rede: 'Telegram',
      endereco: '@leme_oficial',
      link: 'https://web.telegram.org'
    }
  ]

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<tipoMensagem>()

  const onSubmit: SubmitHandler<tipoMensagem> = async data => {
    console.log(data)
  }

  return (
    <main className='gap-8'>
      <div>
        <h1 className='titulo-1 text-5xl'>Fale com a Leme!</h1>
        <p className='mt-4'>
          Precisa de um contato mais direto? Estamos aqui! Experimente mandar
          uma mensagem ou acesse nossas redes.
        </p>
      </div>
      <div className='flex flex-col justify-center items-center md:flex-row gap-8'>
        <ul
          className='flex md:flex-col gap-4
          [&_svg]:size-6 [&_li]:p-4 [&_li]:rounded-full [&_li]:shadow-md [&_li]:cursor-pointer [&_li]:hover:scale-110 [&_li]:transition-bg [&_li]:duration-300 [&_li]:ease-linear
        '
        >
          <li
            onClick={() => setContato(0)}
            className={contato == 0 ? 'bg-purple-800 text-white' : ''}
          >
            <FaMapPin />
          </li>
          <li
            onClick={() => setContato(1)}
            className={contato == 1 ? 'bg-purple-800 text-white' : ''}
          >
            <FaShareAlt />
          </li>
          <li
            onClick={() => setContato(2)}
            className={contato == 2 ? 'bg-purple-800 text-white' : ''}
          >
            <FaMessage />
          </li>
        </ul>
        <div className='overflow-x-hidden w-80 md:w-120 rounded-2xl shadow-lg'>
          <div
            className={`flex w-screen transition-300
            ${
              contato == 0
                ? 'translate-x-0'
                : contato === 1
                ? '-translate-x-80 md:-translate-x-120'
                : '-translate-x-160 md:-translate-x-240'
            }
          `}
          >
            <div className='p-4 bg-gray-200 w-80 md:w-120 shrink-0'>
              <div>
                <h2 className='titulo-1 text-2xl'>Unidade Local</h2>
                <p>
                  Rua Endereço, 2305. Nome do bairro, São Paulo - SP. 00123-045
                </p>
              </div>
              <div className='p-2 mt-4 rounded h-2/3 bg-white'>
                api do maps futuramente
              </div>
            </div>
            <nav className='p-4 bg-gray-200 w-80 md:w-120 shrink-0'>
              <ul className='flex flex-col gap-4'>
                {socials.slice(0, 3).map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.link}
                      target="_blank" rel="noopener noreferrer"
                      className='flex justify-between items-center group p-3 border border-black rounded-xl'
                    >
                      <div className='flex items-center gap-2'>
                        {
                          <social.emoji className='size-12 rounded-xl bg-purple-800 text-white p-2' />
                        }
                        <div>
                          <h2 className='font-bold'>{social.rede}</h2>
                          <p className='text-sm'>{social.endereco}</p>
                        </div>
                      </div>
                      <IoEnter className='size-6 group-hover:scale-120 group-hover:text-purple-800 transition-300' />
                    </a>
                  </li>
                ))}
              </ul>
              <ul className='flex justify-center gap-4 mt-4'>
                {socials.slice(3).map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.link}
                      target="_blank" rel="noopener noreferrer"
                      className='flex p-2 bg-purple-800 text-white rounded-full hover:scale-110 transition-300 shadow-md'
                    >
                      {<social.emoji />}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='formulario bg-purple-800 w-80 md:w-120 shrink-0 transition-300'
            >
              <fieldset>
                <div>
                  <input
                    type='text'
                    id='nome'
                    placeholder='Seu nome'
                    className={errors.nome?.message && 'red-line'}
                    {...register('nome', { required: 'Campo obrigatório' })}
                  />
                  <ErrorAlert mensagem={errors.nome?.message} />
                </div>
                <div>
                  <input
                    type='text'
                    id='email'
                    placeholder='Seu email'
                    className={errors.email?.message && 'red-line'}
                    {...register('email', { required: 'Campo obrigatório' })}
                  />
                  <ErrorAlert mensagem={errors.email?.message} />
                </div>
                <div>
                  <textarea
                    id='mensagem'
                    placeholder='Do que precisa?'
                    className={errors.mensagem?.message && 'red-line'}
                    {...register('mensagem', { required: 'Campo obrigatório' })}
                  ></textarea>
                  <ErrorAlert mensagem={errors.mensagem?.message} />
                </div>
              </fieldset>
              <button type='submit' className='botao-md'>
                Vamos lá
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contato
