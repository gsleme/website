import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import image from '../../assets/images/image.png'
import { FaAward } from 'react-icons/fa'
import type { tipoModulo } from '../../types/tipoTrilhas'
import { formatToLink } from '../../utils/formatarTitulo'
const API_MODULOS = import.meta.env.VITE_API_BASE_MODULOS

function Modulo () {
  const [loading, setLoading] = useState(false)
  const [moduloSelecionado, setModuloSelecionado] = useState<tipoModulo>()
  const [modulos, setModulos] = useState<tipoModulo[]>()
  const { modulo, trilha } = useParams()

  useEffect(()=>{
    const fetchModulos = async () => {
      try {
        setLoading(true)
        const moduloResponse = await fetch(API_MODULOS)
        if (!moduloResponse.ok) throw new Error

        const modulos:tipoModulo[] = await moduloResponse.json()
  
        const modulosFiltrados = modulos.filter((m:tipoModulo) => m.idTrilha == trilha && formatToLink(m.titulo) != modulo)
        setModulos(modulosFiltrados)
        setModuloSelecionado(modulos.find((m:tipoModulo) => formatToLink(m.titulo) == modulo))

      } catch (erro) {
        if (erro instanceof Error) {
          alert('Erro inesperado... Tente novamente mais tarde')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchModulos()

  },[])

  return (
    <main>
      <section className='flex justify-center w-full py-8 relative'>
        <div className='h-[270%] -translate-y-1/2 w-screen bg-purple-400 absolute top-0 -z-10'></div>
        <div className='w-full'>
          <h1 className='titulo-1 text-5xl'>{moduloSelecionado?.titulo}</h1>
          <p className='mt-4'>{moduloSelecionado?.descricao}</p>
        </div>
      </section>
      <section className='flex flex-col items-center md:items-start md:flex-row gap-8 w-full p-4'>
        <aside className='flex flex-col items-center gap-4 order-2 md:order-1 min-h-50 w-full min-w-50 md:w-2/5'>
          <h2 className='font-bold text-xl'>Continue sua jornada</h2>
          <nav className='w-full max-w-80'>
            <ul className='flex flex-col gap-4 w-full'>
              {modulos && modulos.map((modulo, index) => (
                <li key={index}>
                  <Link
                    to={`/trilhas/${trilha}/${formatToLink(modulo.titulo)}`}
                    className='flex p-4 rounded-xl bg-gray-300 w-full gap-2'
                  >
                    <div className='flex gap-2 items-center'>
                      <div>
                        <h3 className='font-bold mb-2'>
                          {modulo.titulo}
                        </h3>
                        <div className='flex gap-2 items-center'>
                          <FaAward className='text-lg' />
                          <p className='text-sm'>
                            <span>{'100'}</span> xp
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <iframe
          src={moduloSelecionado?.conteudo}
          title={moduloSelecionado?.titulo}
          referrerPolicy='strict-origin-when-cross-origin'
          className='w-full h-100 border border-black'
        />
      </section>
    </main>
  )
}

export default Modulo