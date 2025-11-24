import { useState } from 'react';
import FaqItem from '../../components/FaqItem/FaqItem'
import { Link } from 'react-router-dom';

function Faq () {
  const [aberto, setAberto] = useState(0)
  const faqs: { pergunta: string; resposta: string }[] = [
    {
      pergunta: 'Como posso criar minha conta na Leme?',
      resposta:
        'Você pode se cadastrar clicando em "Criar Perfil" no canto superior da tela. Você precisará de um e-mail válido e criará uma senha para começar a aprender!'
    },
    {
      pergunta: 'Como faço para acessar os cursos após o cadastro?',
      resposta:
        'Após fazer login, você será direcionado ao seu Dashboard. Lá, você pode navegar até "Trilhas" ou "Cursos" para escolher por onde começar e iniciar o conteúdo.'
    },
    {
      pergunta: 'O que eu preciso ter no computador para fazer os cursos?',
      resposta:
        'A maioria dos cursos não requer um sistema operacional ou software proprietário instalado. No entanto, há algumas exceções: Se o curso precisar de alguma instalação, você terá acesso ao passo a passo para fazer o download em seu computador.'
    },
    {
      pergunta: 'Quais serão os próximos cursos a serem lançados?',
      resposta:
        'Temos diversos cursos sendo desenvolvidos simultaneamente. Caso você tenha sentido a falta de algum tema no nosso catálogo, estamos sempre abertos para receber sugestões!'
    },
    {
      pergunta: 'O que são os pontos de experiência (XP)?',
      resposta:
        'Os pontos de experiência (XP) são a forma como registramos o seu progresso e dedicação na plataforma. Você ganha XP ao completar vídeos, leituras, e principalmente, ao finalizar os exercícios e módulos.'
    },
    {
      pergunta: 'O que acontece com a experiência que ganho?',
      resposta:
        'A sua experiência (XP) é somada ao seu perfil, ajudando você a subir de nível. O nível serve como um registro público do seu conhecimento e engajamento na Leme, e pode desbloquear futuros recursos ou reconhecimentos.'
    },
    {
      pergunta: 'A Leme é gratuita ou possui algum tipo de assinatura?',
      resposta:
        'No momento, a Leme oferece acesso gratuito a todos os cursos'
    }
  ]
  return (
    <main className='lg:flex-row gap-8'>
      <div>
        <h1 className='titulo-1 text-5xl'>Perguntas frequentes</h1>
        <p className='w-4/5 mt-4'>
          Ficou com alguma dúvida? Veja se já não resolvemos ela por aqui. Caso seja algo específico, fale com a gente no botão abaixo!
        </p>
        <Link to='/contato' className='botao-md flex w-fit my-4'>
        Fale com a Leme
        </Link>
      </div>
      <div className='w-full max-w-120 p-4 md:p-8 rounded-xl border border-gray-600 h-120 '>
        <ul className='flex flex-col gap-2 pr-4 overflow-y-scroll h-full'>
          {faqs.map((faq, index)=>(
            <FaqItem
              key={index}
              pergunta={faq.pergunta}
              resposta={faq.resposta}
              aberto={aberto}
              index={index}
              onClick={() => setAberto(index)}
            />
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Faq
