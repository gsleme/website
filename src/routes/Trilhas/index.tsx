import { useEffect, useState } from 'react'

import image from '../../assets/images/image.png'

import { FaAward } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import type { Trilha } from '../../types/tipoDashboard'

function Trilhas () {
  const [categoria, setCategoria] = useState('Softskills')
  const [idTrilha, setIdTrilha] = useState('')
  
  useEffect(()=>{
    const trilhaEncontrada = trilhas.find((trilha:Trilha)=> trilha.areaFoco == categoria)
    setIdTrilha(trilhaEncontrada?.id ?? '')
  },[])

  const categorias: string[] = [
    'Categoria',
    'Categoria',
    'Categoria',
    'Categoria',
    'Categoria',
    'Categoria',
    'Categoria',
    'Categoria',
    'Categoria',
    'Categoria',
    'Categoria',
    'Categoria'
  ]

  const trilhas:Trilha[] = []

  const modules: {
    titulo: string
    descricao: string
    imagem: string
    xp_recompensa: number
  }[] = [
    {
      titulo: 'Otimização de Pesquisa e Análise',
      descricao: 'Técnicas para usar IA na criação e revisão de contratos.',
      imagem: image,
      xp_recompensa: 100
    },
    {
      titulo: 'Otimização de Pesquisa e Análise',
      descricao: 'Técnicas para usar IA na criação e revisão de contratos.',
      imagem: image,
      xp_recompensa: 100
    },
    {
      titulo: 'Otimização de Pesquisa e Análise',
      descricao: 'Técnicas para usar IA na criação e revisão de contratos.',
      imagem: image,
      xp_recompensa: 100
    },
    {
      titulo: 'Otimização de Pesquisa e Análise',
      descricao: 'Técnicas para usar IA na criação e revisão de contratos.',
      imagem: image,
      xp_recompensa: 100
    }
  ]

  const [active, setActive] = useState<number>(categorias.length / 2)

  return (
    <main>
      <section className='z-1'>
        <div className='mx-6'>
          <h1 className='titulo-1 text-5xl'>Trilhas</h1>
          <p className='mt-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure neque
            saepe accusamus laboriosam quia deleniti quaerat! Magni provident
            incidunt iure.
          </p>
        </div>
        <div className='pt-8'>
          <h2 className='text-xl text-center font-bold'>Explorar</h2>
          <div className='flex relative x-gradient-transparent w-screen max-w-240'>
            <ul className='flex gap-8 md:gap-12 w-full mt-4 px-20 overflow-x-scroll no-scrollbar translate-y-1'>
              {categorias.map((categoria, index) => (
                <li
                  key={index}
                  className='flex flex-col items-center text-center gap-2'
                >
                  <button
                    onClick={() => {
                      setActive(index)
                      setCategoria(categoria)
                    }}
                  >
                    {categoria}
                  </button>
                  <div
                    className={`h-2 w-[120%] ${
                      active == index ? 'bg-gray-200' : 'bg-none'
                    }`}
                  ></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className='flex justify-center w-full min-h-100 p-4 relative'>
        <div className='h-full w-screen bg-gray-800 absolute top-0 -z-10'></div>
        <ul className='flex flex-col items-center gap-4 w-full'>
          {modules
            .filter(
              (m: {
                titulo: string
                descricao: string
                imagem: string
                xp_recompensa: number
              }) => m.titulo == idTrilha
            )
            .map((module, index) => (
              <li key={index}>
                <Link
                  to={`/trilhas/{idTrilha}/{module.titulo.slice(10)}`}
                  className='flex p-4 rounded-xl bg-gray-300 w-full max-w-150 gap-4 hover:scale-110'
                >
                  <div className='flex flex-col gap-2 items-center min-w-20 my-auto'>
                    <img src={module.imagem} alt='' className='h-16 md:h-24' />
                    <div className='flex gap-2 items-center'>
                      <FaAward className='text-xl' />
                      <p className='text-sm'>
                        <span className='text-lg'>{module.xp_recompensa}</span>{' '}
                        xp
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3 className='font-bold text-xl mb-2'>
                        {module.titulo}
                      </h3>
                      <p>{module.descricao}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  )
}

export default Trilhas
