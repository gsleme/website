import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Modulo, Trilha } from '../../types/tipoTrilhas'

import { FaAward } from 'react-icons/fa6'
const API_TRILHAS = import.meta.env.VITE_API_BASE_TRILHAS
const API_MODULOS = import.meta.env.VITE_API_BASE_MODULOS

function Trilhas () {
  const [loading, setLoading] = useState(false)
  const [trilhas, setTrilhas] = useState<Trilha[]>([])
  const [trilhaSelecionada, setTrilhaSelecionada] = useState<Trilha>()
  const [titulos, setTitulos] = useState<string[]>([])
  const [tituloSelecionado, setTituloSelecionado] = useState('')
  const [modulosSelecionados, setModulosSelecionados] = useState<Modulo[]>([])

  useEffect(() => {
    const fetchTrilhas = async () => {
      try {
        const trilhaResponse = await fetch(API_TRILHAS)

        if (!trilhaResponse.ok) throw new Error()

        const trilhas: Trilha[] = await trilhaResponse.json()
        setTrilhas(trilhas)
        const titulosGerais: string[] = []
        trilhas.forEach((t: Trilha) => {
          titulosGerais.push(t.titulo)
        })

        setTitulos(titulosGerais)
        console.log(titulos)
      } catch (erro) {
        if (erro instanceof Error) {
          alert('Erro inesperado... Tente novamente mais tarde')
        }
        
      } finally {
        setLoading(false)
      }
    }

    fetchTrilhas()
  }, [])

  useEffect(() => {
    setTrilhaSelecionada(
      trilhas.find((trilha: Trilha) => trilha.titulo == tituloSelecionado)
    )
    const fetchModulos = async () => {
      try {
        const moduloResponse = await fetch(API_MODULOS)

        if (!moduloResponse.ok) throw new Error()

        const modulos: Modulo[] = await moduloResponse.json()
        setModulosSelecionados(
          modulos.filter(
            (modulo: Modulo) => modulo.idTrilha == trilhaSelecionada?.id
          )
        )
      } catch (erro) {
        if (erro instanceof Error) {
          alert('Erro inesperado... Tente novamente mais tarde')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchModulos()
  }, [tituloSelecionado, trilhaSelecionada])

  const [active, setActive] = useState<number>(titulos.length / 2)

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
              {titulos.map((titulo, index) => (
                <li
                  key={index}
                  className='flex flex-col items-center text-center gap-2'
                >
                  <button
                    onClick={() => {
                      setActive(index)
                      setTituloSelecionado(titulo)
                    }}
                  >
                    {titulo}
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
          {modulosSelecionados.map((modulo, index) => (
            <li key={index}>
              <Link
                to={`/trilhas/${modulo.idTrilha}/${modulo.titulo.slice(10)}`}
                className='flex p-4 rounded-xl bg-gray-300 w-full max-w-150 gap-4 hover:scale-110'
              >
                <div className='flex flex-col gap-2 items-center min-w-20 my-auto'>
                  <img src={''} alt='' className='h-16 md:h-24' />
                  <div className='flex gap-2 items-center'>
                    <FaAward className='text-xl' />
                    <p className='text-sm'>
                      <span className='text-lg'>{modulo.xpRecompensa}</span> xp
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <h3 className='font-bold text-xl mb-2'>{modulo.titulo}</h3>
                    <p>{modulo.descricao}</p>
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
