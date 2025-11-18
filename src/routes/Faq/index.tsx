import { useState } from 'react';
import FaqItem from '../../components/FaqItem/FaqItem'

function Faq () {
  const [aberto, setAberto] = useState(0)
  const faqs: { pergunta: string; resposta: string }[] = [
    {
      pergunta: 'Lorem ipsum dolor sit amet?',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint.'
    },
    {
      pergunta: 'Lorem ipsum, dolor sit amet consectetur adipisicing?',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui distinctio aliquam temporibus sed. Possimus, doloribus.'
    },
    {
      pergunta: 'Lorem ipsum dolor sit?',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ipsam voluptates at.'
    },
    {
      pergunta: 'Lorem ipsum dolor sit amet?',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint.'
    },
    {
      pergunta: 'Lorem ipsum dolor sit amet?',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint.'
    },
    {
      pergunta: 'Lorem ipsum dolor sit amet?',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint.'
    },
    {
      pergunta: 'Lorem ipsum dolor sit amet?',
      resposta:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, sint.'
    }
  ]
  return (
    <main className='lg:flex-row gap-8'>
      <div>
        <h1 className='titulo-1 text-5xl'>Perguntas frequentes</h1>
        <p className='w-4/5 mt-4'>
          Ficou com alguma dúvida? Veja se já não resolvemos ela por aqui.
        </p>
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
