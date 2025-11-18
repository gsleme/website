import { BiSolidDownArrow } from 'react-icons/bi'

function FaqItem ({
  pergunta,
  resposta,
  index,
  aberto,
  onClick,
}: {
  pergunta: string,
  resposta: string,
  index: number,
  aberto:number,
  onClick: (e:number) => void,
}) {
  const isAberto = aberto == index

  return (
    <li
      onClick={()=>onClick(index)}
      className={`p-4 rounded ${isAberto ? 'bg-gray-400' : 'bg-gray-200'}`}>
      <div className='flex justify-between mb-2'>
        <h2 className={`w-4/5 ${isAberto && 'opacity-70 text-sm'}`}>{pergunta}</h2>
        <BiSolidDownArrow className={`text-xl text-gray-400 transition-300 ${isAberto && 'rotate-180 text-white'}`} />
      </div>
      <p className={`overflow-y-hidden transition-300 ${isAberto ? 'h-fit' : 'h-0'}`}>{resposta}</p>
    </li>
  )
}

export default FaqItem
