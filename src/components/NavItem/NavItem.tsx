import { FaAnchor } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function NavItem ({
  nome,
  link,
  onClick
}: {
  nome: string
  link: string
  onClick: () => void
}) {
  return (
    <li className='group'>
      <NavLink
        to={link}
        end
        className={({ isActive }) =>
          `flex cursor-pointer  transition-300 h-6 ${
            isActive && 'text-lg font-bold pb-2 border-b-2 border-black'
          }`
        }
        onClick={() => onClick()}
      >
        {({ isActive }) => (
          <div className='w-full flex justify-between items-center space-x-2'>
            <span>{nome}</span>
            <FaAnchor className={`text-xl group-hover:opacity-40 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
          </div>
        )}
      </NavLink>
    </li>
  )
}

export default NavItem
