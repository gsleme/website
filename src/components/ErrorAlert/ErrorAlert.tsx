import { IoMdAlert } from 'react-icons/io'

function ErrorAlert ({ mensagem }: { mensagem?: string }) {
  return (
    <div
      className={`py-2 text-white flex items-center gap-2 ${
        mensagem ? 'block' : 'hidden'
      }`}
    >
      <IoMdAlert />
      <p>{mensagem}</p>
    </div>
  )
}

export default ErrorAlert
