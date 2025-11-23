import type { tipoIntegrantes } from '../../types/tipoIntegrantes'

import image5 from '../../assets/images/image5.png'
import integrante1 from '../../assets/images/integrante-felipe.jpeg'
import integrante2 from '../../assets/images/integrante-gustavo.jpeg'
import integrante3 from '../../assets/images/integrante-nikolas.jpeg'

import { RiCloseLargeLine, RiLinkedinFill } from 'react-icons/ri'
import { ImGithub } from 'react-icons/im'
import { FaBuildingFlag, FaPeopleRoof } from 'react-icons/fa6'
import { GiSpellBook } from 'react-icons/gi'
import { useState } from 'react'

function Sobre () {
  const [verMais, setVerMais] = useState(false)
  const integrantes: tipoIntegrantes[] = [
    {
      foto: integrante1,
      nome: 'Felipe Ferrete Soares Lemes',
      rm: '562999',
      linkedin: 'https://www.linkedin.com/in/felipe-ferrete-ab63a318a',
      github: 'https://github.com/FelipeFerrete'
    },
    {
      foto: integrante2,
      nome: 'Gustavo Bosak Santos',
      rm: '566315',
      linkedin: 'https://linkedin.com/in/gustavo-bosak-santos',
      github: 'https://github.com/gustavo-bosak'
    },
    {
      foto: integrante3,
      nome: 'Nikolas Henrique de Souza Lemes Brisola',
      rm: '564371',
      linkedin: 'https://www.linkedin.com/in/nikolas-brisola-ab3588353',
      github: 'https://github.com/NikolasBrisola'
    }
  ]

  return (
    <main>
      <h1 className='titulo-1 text-5xl'>Saiba mais sobre a Leme</h1>
      <section className='flex flex-col md:flex-row justify-between items-center gap-4 p-4 my-4 rounded'>
        <img src={image5} alt='Imagem ilustrativa' className='h-60' />
        <p className='w-80'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit ad
          obcaecati dolore suscipit? Repellat voluptatibus sapiente ea, rerum
          qui pariatur repellendus itaque atque unde? Aut esse qui quas animi
          vero!{' '}
          <button className='font-bold' onClick={() => setVerMais(true)}>
            ... Ver mais
          </button>
        </p>
      </section>
      <section className='my-8'>
        <h2 className='titulo-1 text-center'>Conheça o time</h2>
        <p className='my-4 text-center'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          unde?
        </p>
        <ul className='flex flex-col md:flex-row gap-8 mx-auto my-6 w-4/5'>
          {integrantes.map((integrante, index) => (
            <li
              key={index}
              className='flex flex-col gap-2 justify-between p-4 bg-purple-600 rounded-xl w-full transition-300 hover:scale-110 hover:bg-purple-400'
            >
              <img
                src={integrante.foto}
                alt={`Foto do integrante ${integrante.nome.split(' ')[0]}`}
                className='w-full'
              />
              <div>
                <h3 className='text-2xl font-bold'>
                  {integrante.nome.split(' ')[0]}
                </h3>
                <p className=''>
                  {integrante.nome.split(' ').splice(1).join(' ')}
                </p>
                <p className='mb-4 text-sm'>RM: {integrante.rm}</p>
              </div>
              <div className='flex gap-2 [&_a]:p-2 [&_a]:bg-white [&_a]:rounded-full [&_a]:text-2xl [&_a]:flex [&_a]:items-center [&_a]:justify-between [&_a]:hover:w-40'>
                <a
                  href={integrante.github}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group'
                >
                  <ImGithub />
                  <p className='text-sm w-0 group-hover:w-4/5 overflow-hidden transition-300'>
                    GitHub
                  </p>
                </a>
                <a
                  href={integrante.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group'
                >
                  <RiLinkedinFill />
                  <p className='text-sm w-0 group-hover:w-4/5 overflow-hidden transition-300'>
                    LinkedIn
                  </p>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className='titulo-1 text-center'>Acompanhe nossos resultados</h2>
        <p className='my-4 text-center'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
          unde?
        </p>
        <ul className='flex flex-col md:flex-row justify-between mt-4 gap-4 [&_svg]:mx-auto [&_svg]:mb-4 [&_svg]:size-12 text-center'>
          <li className='p-8 rounded-xl bg-purple-600'>
            <FaPeopleRoof />
            <h3 className='text-5xl'>30 mil</h3>
            <p>pessoas ajudadas</p>
          </li>
          <li className='p-8 rounded-xl bg-purple-400'>
            <GiSpellBook />
            <h3 className='text-5xl'>300</h3>
            <p>materiais diferentes</p>
          </li>
          <li className='p-8 rounded-xl bg-purple-200'>
            <FaBuildingFlag />
            <h3 className='text-5xl'>5 mil</h3>
            <p>empresas parceiras</p>
          </li>
        </ul>
      </section>

      <div
        className={`flex h-screen w-screen p-4 justify-center items-center fixed top-0 left-0 transition-full duration-400 bg-black/40 ${
          verMais ? 'opacity-100 z-10' : 'opacity-0 -z-10'
        }`}
      >
        <div
          className={`transition-full duration-400 bg-white px-8 py-4 max-w-100 rounded-4xl ${
            verMais ? 'translate-y-0' : 'translate-y-100'
          }`}
        >
          <button
            onClick={() => {
              setVerMais(false)
            }}
            className='p-2 rounded-full bg-purple-500 my-4'
          >
            <RiCloseLargeLine />
          </button>
          <div className='flex flex-col items-center'>
            <h2 className='titulo-1'>
              Conheça mais sobre a Leme: uma plataforma que te coloca no
              comando.
            </h2>
            <p className='h-70 overflow-y-scroll pr-4 my-4'>
              {/* separar em tags p cada parágrafo */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, laudantium et quidem reprehenderit alias quos aspernatur? Laboriosam obcaecati harum maiores eius nihil voluptatem eligendi illum quae, totam iste, quaerat quisquam! Mollitia maxime fugiat incidunt quam eveniet eligendi similique ea corporis sed cum, velit necessitatibus distinctio assumenda, aliquid cupiditate? Adipisci, culpa recusandae, quibusdam enim libero tenetur aliquid numquam iure omnis repellat aliquam unde iste ratione magni amet natus accusamus molestias impedit asperiores eligendi consequatur optio neque quod! Accusantium asperiores dolorem possimus. Cupiditate nulla aspernatur error architecto voluptatem omnis, eaque, ducimus asperiores nesciunt nam temporibus quam odit repellendus odio laboriosam facilis provident laborum neque quae commodi. Facilis quis quam error, magni beatae id eum dolorum. Reiciendis delectus dolor, molestiae ratione quis accusantium natus voluptas consequatur excepturi. Quia numquam soluta quis perferendis possimus, sequi libero suscipit voluptatum non facere perspiciatis, aspernatur blanditiis? Possimus non laudantium velit ipsa. Velit perferendis facere inventore doloribus rerum!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Sobre
