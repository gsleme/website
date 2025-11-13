import { Link, useNavigate } from 'react-router-dom'

function LandingPage () {
  const navigate = useNavigate()

  return (
    <main>
      <section className='lp-section'>
        <h1>
          Esteja na direção certa para sua carreira com a <span>Leme</span>
        </h1>
        <button onClick={() => navigate('/cadastrar')}>Começar</button>
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
      <section className='lp-section'>
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
        <form onSubmit={() => alert()}>
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
        <button onClick={() => navigate('/cadastrar')}>Começar</button>
      </section>

      {/* Pop-ups */}
      <article>
        <button onClick={() => alert()}>x</button>
        <div>
          <h2>É isso ai! Seu primeiro passo foi tomado</h2>
          <p>
            Agora acompanhe seu email, entratemos em contato em breve. Enquanto
            isso...
          </p>
          <div>
            <img src='' alt='' />
            <div>
              <button>Entrar</button>
              <button>Cadastrar</button>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default LandingPage
