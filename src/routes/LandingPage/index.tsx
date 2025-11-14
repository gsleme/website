import { useEffect, useRef, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import { RiCloseLargeLine } from 'react-icons/ri'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

function LandingPage () {
  const navigate = useNavigate()
  const [contato, setContato] = useState(false)

  // refs de controle de visibilidade do header
  const ref1 = useRef<HTMLButtonElement | null>(null)
  const [ref1Visivel, setRef1Visivel] = useState(false)
  const ref2 = useRef<HTMLButtonElement | null>(null)
  const [ref2Visivel, setRef2Visivel] = useState(false)
  const ref3 = useRef<HTMLButtonElement | null>(null)
  const [ref3Visivel, setRef3Visivel] = useState(false)
  const { setVisivel } = useOutletContext<{
    setVisivel: (v: boolean) => void
  }>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.target == ref1.current) setRef1Visivel(entry.isIntersecting)
        if (entry.target == ref2.current) setRef2Visivel(entry.isIntersecting)
        if (entry.target == ref3.current) setRef3Visivel(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (ref1.current) observer.observe(ref1.current!)
    if (ref2.current) observer.observe(ref2.current!)
    if (ref3.current) observer.observe(ref3.current!)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setVisivel(ref1Visivel || ref2Visivel || ref3Visivel)
  }, [ref1Visivel, ref2Visivel, ref3Visivel, setVisivel])

  return (
    <main>
      <section className='lp-section'>
        <h1>
          Esteja na direção certa para sua carreira com a <span>Leme</span>
        </h1>
        <button
          onClick={() => navigate('/cadastrar')}
          ref={ref1}
          className='botao-md'
        >
          Começar
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
      <section className='lp-section'>
        <img src='' alt='' />
        <div>
          <h2>Se atualize de forma gamificada</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            labore at cupiditate, perferendis dolor optio delectus quam iure
            maiores. Temporibus!
          </p>
        </div>
      </section>
      <section className='lp-section'>
        <div>
          <h2>Se atualize de forma gamificada</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            labore at cupiditate, perferendis dolor optio delectus quam iure
            maiores. Temporibus!
          </p>
        </div>
        <img src='' alt='' />
        <ul>
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
              <h3>Detalhe 1</h3>
              <img src='' alt='' />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maiores, officiis!
              </p>
            </Link>
          </li>
        </ul>
      </section>
      <section className='lp-section' ref={ref2}>
        <h2>Veja o que estão falando sobre a Leme</h2>
        <div>
          <ul>
            {[
              {
                foto: 'foto.png',
                nome: 'Nome do Usuário',
                username: 'nomedousuario',
                comentario:
                  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit corrupti harum, in ad fugiat vel?'
              }
            ].map((e, index) => (
              <li key={index}>
                <div>
                  <img src={e.foto} alt='' />
                  <div>
                    <p>{e.nome}</p>
                    <p>@{e.username}</p>
                  </div>
                </div>
                <p>{e.comentario}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className='lp-section'>
        <div>
          <img src='' alt='' />
          <h2>Encontre uma direção personalizada para você</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            labore at cupiditate, perferendis dolor optio delectus quam iure
            maiores. Temporibus!
          </p>
        </div>
      </section>
      <section className='lp-section'>
        <h2>Alguma proposta interessante? Fale com a gente</h2>
        <form onSubmit={() => setContato(true)}>
          <fieldset>
            <input type='text' name='' id='' />
            <input type='text' name='' id='' />
            <input type='text' name='' id='' />
            <textarea name='' id=''></textarea>
          </fieldset>
          <button type='submit'>Vamos lá</button>
        </form>
      </section>
      <section className='lp-section'>
        <img src='' alt='' />
        <p>Você na direção da sua carreira</p>
        <button
          onClick={() => navigate('/cadastrar')}
          ref={ref3}
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
            <h2>É isso ai! Seu primeiro passo foi tomado</h2>
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
