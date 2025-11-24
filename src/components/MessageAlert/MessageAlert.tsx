import { IoClose } from "react-icons/io5"

function MessageAlert({mensagem, state, setState}:{mensagem:string, state:boolean, setState:(b:boolean) => void}) {
  return (
    <div className="flex gap-4 fixed bg-white">
      <button
        onClick={() => setState(false)}
        className="p-4 rounded-full bg-purple-800 text-white"
      >
      <IoClose/>
      </button>
      <h2 className="text-xl text-center">{mensagem}</h2>
    </div>
  )
}

export default MessageAlert