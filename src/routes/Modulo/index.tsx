import { Link, useParams } from 'react-router-dom'

import image from '../../assets/images/image.png'

import { FaAward } from 'react-icons/fa'

function Modulo () {
  const { modulo } = useParams()

  return (
    <main>
      <section className='flex justify-center w-full py-8 relative'>
        <div className='h-[270%] -translate-y-1/2 w-screen bg-purple-400 absolute top-0 -z-10'></div>
        <div className='w-full'>
          <h1 className='titulo-1 text-5xl'>Titulo do módulo</h1>
          <p className='mt-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, natus.
          </p>
        </div>
      </section>
      <section className='flex flex-col items-center md:items-start md:flex-row gap-8 w-full p-4'>
        <aside className='flex flex-col items-center gap-4 order-2 md:order-1 min-h-50 w-full min-w-50 md:w-2/5'>
          <h2 className='font-bold text-xl'>Continue sua jornada</h2>
          <nav className='w-full max-w-80'>
            <ul className='flex flex-col gap-4 w-full'>
              {[1, 2, 3, 4].map((e, index) => (
                <li key={index}>
                  <Link
                    to={'e'}
                    className='flex p-4 rounded-xl bg-gray-300 w-full gap-2'
                  >
                    <div className='flex gap-2 items-center'>
                      <img src={image} alt='' className='h-12' />
                      <div>
                        <h3 className='font-bold mb-2'>
                          {'module.titulo' + e}
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
          src='https://www.example.com'
          title={'titulo do módulo'}
          referrerPolicy='strict-origin-when-cross-origin'
          className='w-full h-100 border border-black'
        />
      </section>
    </main>
  )
}

export default Modulo
