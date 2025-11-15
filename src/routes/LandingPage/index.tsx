import { useEffect, useRef, useState } from 'react'

// import de imagens
import logo from '../../assets/images/logo.png'
import image1 from '../../assets/images/image1.png'
import image2 from '../../assets/images/image2.png'
import image3 from '../../assets/images/image3.png'

// import de icones
import { FaArrowDown } from 'react-icons/fa'
import { RiCloseLargeLine } from 'react-icons/ri'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'

function LandingPage () {
  const navigate = useNavigate()
  const [contato, setContato] = useState(false)
  const [indice, setIndice] = useState(1)

  const depoimentos: {
    foto: string
    nome: string
    username: string
    comentario: string
  }[] = [
    {
      foto: 'https://tr.rbxcdn.com/180DAY-15b320a990235a1dc3456b89738d8b4d/420/420/Hat/Webp/noFilter',
      nome: 'Prime Usuário',
      username: 'primeusuario',
      comentario:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit corrupti harum, in ad fugiat vel?'
    },
    {
      foto: 'https://tr.rbxcdn.com/180DAY-15b320a990235a1dc3456b89738d8b4d/420/420/Hat/Webp/noFilter',
      nome: 'Second Usuário',
      username: 'secondusuario',
      comentario:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias, numquam.'
    },
    {
      foto: 'https://tr.rbxcdn.com/180DAY-15b320a990235a1dc3456b89738d8b4d/420/420/Hat/Webp/noFilter',
      nome: 'Third Usuário',
      username: 'thirdusuario',
      comentario:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, laborum error minus soluta quasi esse!'
    }
  ]

  // refs de controle de visibilidade do header
  const ref1 = useRef<HTMLButtonElement | null>(null)
  const [ref1Visivel, setRef1Visivel] = useState(false)
  const ref2 = useRef<HTMLButtonElement | null>(null)
  const [ref2Visivel, setRef2Visivel] = useState(false)
  const { setVisivel } = useOutletContext<{
    setVisivel: (v: boolean) => void
  }>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.target == ref1.current) setRef1Visivel(entry.isIntersecting)
        if (entry.target == ref2.current) setRef2Visivel(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (ref1.current) observer.observe(ref1.current!)
    if (ref2.current) observer.observe(ref2.current!)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setVisivel(ref1Visivel || ref2Visivel)
  }, [ref1Visivel, ref2Visivel, setVisivel])

  return (
    <main className='gap-8'>
      <section className='lp-section px-4 justify-between py-12'>
        <div className='flex flex-col items-center'>
          <h1 className='titulo-1 text-5xl text-center max-w-120 leading-14'>
            Esteja na direção certa da sua carreira com a
          </h1>
          <span className='font-staatliches text-6xl text-center text-purple-600 font-extrabold'>
            Leme
          </span>
        </div>
        <button
          onClick={() => navigate('/cadastrar')}
          ref={ref1}
          className='botao-md'
        >
          Comece agora
        </button>
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }
          className='seta-redirect'
        >
          <FaArrowDown />
        </button>
      </section>

      <section className='lp-section md:flex-row'>
        <img src={image1} alt='Imagem ilustrativa' className='lp-image' />
        <div className='lp-info'>
          <h2 className='titulo-1'>Se atualize de forma gamificada</h2>
          <p>
            Aqui na Leme você consegue dar um up na sua carreira com práticas
            gamificadas e trilhas personalizadas. Cada desafio te da mais
            proximidade para uma navegação sem icebergs.
          </p>
        </div>
      </section>

      <section className='lp-section'>
        <div className='flex flex-col justify-center items-center md:flex-row'>
          <div className='lp-info text-right items-end'>
            <h2 className='titulo-1'>Não fique para trás</h2>
            <p>
              A Leme sabe como anda o futuro do trabalho, por isso contamos com
              os melhores recursos para não te deixar afundar.
            </p>
          </div>
          <img src={image2} alt='Imagem ilustrativa' className='lp-image' />
        </div>
        {/* <ul>
          <li>
            <Link to='/cadastrar'>
              <h3>Detalhe 1</h3>
              <img src='' alt='' />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maiores, officiis!
              </p>
            </Link>
          </li>
          <li>
            <Link to='/cadastrar'>
              <h3>Detalhe 2</h3>
              <img src='' alt='' />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maiores, officiis!
              </p>
            </Link>
          </li>
          <li>
            <Link to='/cadastrar'>
              <h3>Detalhe 3</h3>
              <img src='' alt='' />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maiores, officiis!
              </p>
            </Link>
          </li>
        </ul> */}
      </section>

      <section className='lp-section min-h-[110vh] lg:min-h-screen lg:py-8 relative max-lg:justify-end lg:flex-row lg:items-end'>
        <div className='h-full w-screen bg-purple-800 absolute top-0 -z-10'></div>
        <div className='flex flex-col gap-6 my-8 w-screen absolute top-6'>
          <span className='lp-line w-2/5'></span>
          <span className='lp-line w-3/4 ml-6'></span>
          <span className='lp-line w-3/4 mr-6 self-end'></span>
          <span className='lp-line w-2/5 self-end'></span>
        </div>
        <div className='my-8 lg:self-center lg:mr-8 lg:mt-40 max-w-100'>
          <h2 className='titulo-1 text-center lg:text-left text-5xl'>
            Veja o que estão falando sobre a Leme
          </h2>
          <p className='hidden lg:block mt-4'>
            Depoimentos, agradecimentos e todo tipo de comentário sobre nossos
            resultados. Confira também nas nossas redes!
          </p>
        </div>
        <div className='mx-4 p-6 bg-white rounded-2xl max-w-80 overflow-hidden'>
          <div className='w-full overflow-hidden'>
            <ul
              className={`flex justify-center gap-8 transition-all duration-200 ease-linear ${
                indice == 0
                  ? 'translate-x-full'
                  : indice === 1
                  ? 'translate-x-0'
                  : '-translate-x-full'
              }  
          `}
            >
              {depoimentos.map((depoimento, index) => (
                <li
                  key={index}
                  className='flex flex-col gap-8 my-8 min-w-60'
                >
                  <div className='flex gap-4'>
                    <img
                      src={depoimento.foto}
                      alt='Foto de perfil do usuário'
                      className='h-12 rounded-full'
                    />
                    <div>
                      <p className='font-bold'>{depoimento.nome}</p>
                      <p className='text-sm'>@{depoimento.username}</p>
                    </div>
                  </div>
                  <p className='h-40 overflow-hidden'>
                    {depoimento.comentario}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className='flex justify-between gap-4 [&_button]:cursor-pointer [&_button]:hover:scale-110 text-2xl text-gray-400'>
            <button onClick={() => setIndice(indice == 0 ? 2 : indice - 1)}>
              <BiSolidLeftArrow className='hover:text-gray-600 active:text-gray-800' />
            </button>
            <div className='flex justify-center gap-2'>
              {[0, 1, 2].map(i => (
                <button
                  key={i}
                  onClick={() => setIndice(i)}
                  className={`size-4 rounded-full transition-all duration-200 ease-linear hover:bg-gray-600 active:bg-gray-800 ${
                    indice === i ? 'scale-110 bg-gray-600' : 'bg-gray-400'
                  }`}
                  aria-label={`Ir para link ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={() => setIndice(indice == 2 ? 0 : indice + 1)}>
              <BiSolidRightArrow className='hover:text-gray-600 active:text-gray-800' />
            </button>
          </div>
        </div>
      </section>

      <section className='lp-section md:flex-row'>
        <img src={image3} alt='Imagem ilustrativa' className='lp-image' />
        <div className='lp-info'>
          <h2 className='titulo-1'>Encontre uma direção especial para você</h2>
          <p>
            Contamos com uma IA especializada que consegue capturar seu
            progresso e formular estratégias. Com a Leme, são muitas
            possiblidades!
          </p>
        </div>
      </section>

      <section className='lp-section pb-0 gap-4 max-lg:justify-end lg:flex-row lg:items-end'>
        <div className='lg:self-center lg:mr-8 max-w-100'>
          <h2 className='titulo-1'>
            Alguma proposta interessante? Fale com a gente
          </h2>
          <p className='hidden lg:block mt-4'>
            Fisgou um interesse? Alguma dúvida sobre a Leme? Fale com a gente
            por aqui e não espere mais nada para ir rumo a sua carreira.
          </p>
        </div>
        <form
          onSubmit={() => setContato(true)}
          className='flex flex-col gap-4 items-center p-8 rounded-t-2xl bg-purple-800 w-full max-w-80 fim-convexo'
        >
          <fieldset className='flex flex-col gap-4 w-full'>
            <input
              className='entry'
              type='text'
              name=''
              id=''
              placeholder='Seu nome'
            />
            <input
              className='entry'
              type='text'
              name=''
              id=''
              placeholder='Seu email'
            />
            <input
              className='entry'
              type='text'
              name=''
              id=''
              placeholder='Assunto'
            />
            <textarea
              className='entry'
              name=''
              id=''
              placeholder='Do que precisa?'
            ></textarea>
          </fieldset>
          <button type='submit' className='botao-md'>
            Vamos lá
          </button>
          <div className='h-5 w-[110%] bg-purple-800 absolute bottom-0 -z-10'></div>
        </form>
      </section>
      <section className='lp-section relative min-h-[110vh]'>
        <div className='h-full w-screen bg-purple-800 absolute top-0 -z-10'></div>
        <img src={logo} alt='Logomarca da Leme' className='h-20' />
        <p className='text-center text-xl'>Você no comando da sua carreira</p>
        <button
          onClick={() => navigate('/cadastrar')}
          ref={ref2}
          className='botao-md'
        >
          Começar
        </button>
      </section>

      {/* Pop-ups */}
      <article
        className={`flex h-screen w-screen p-4 justify-center items-center fixed top-0 left-0 transition-full duration-400 bg-black/40 ${
          contato ? 'opacity-100 z-10' : 'opacity-0 -z-10'
        }`}
      >
        <div
          className={`transition-full duration-400 bg-white rounded p-4 ${
            contato ? 'translate-y-0' : 'translate-y-100'
          }`}
        >
          <button onClick={() => setContato(false)}>
            <RiCloseLargeLine />
          </button>
          <div>
            <h2 className='titulo-1'>
              É isso ai! Seu primeiro passo foi tomado
            </h2>
            <p>
              Agora acompanhe seu email, entratemos em contato em breve.
              Enquanto isso...
            </p>
            <div>
              <img src='' alt='' />
              <div>
                <Link className='botao-sm' to='/entrar'>
                  Entrar
                </Link>
                <Link className='botao-sm' to='/cadastrar'>
                  Cadastrar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default LandingPage
