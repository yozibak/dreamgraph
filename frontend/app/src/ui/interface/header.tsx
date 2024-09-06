import { WaypointsIcon } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '../../auth'
import githubIcon from '../assets/github.svg'
import pjson from '../../../package.json'

export const Header: React.FC = () => {
  const auth = useContext(AuthContext)
  const command = auth.isAuthenticated ? 'Sign Out' : 'Log In'
  return (
    <div className="fixed top-0 w-full z-50">
      <div className="flex flex-row justify-between align-middle space-x-2 py-3 px-4">
        {/* left */}
        <div className="flex justify-start space-x-2">
          <WaypointsIcon className="block" size={24} />
          <div className="font-semibold tracking-tight text-zinc-800">dreamgraph.me</div>
        </div>

        {/* right */}
        <div className="flex justify-end items-center">
          <button
            onClick={auth.switchAuth}
            className="block text-sm tracking-tight font-semibold text-zinc-700 cursor-pointer mr-3"
          >
            {command}
          </button>
          <a href="https://github.com/yozibak/dreamgraph" className="flex">
            <img src={githubIcon} className="block w-4 h-4 mr-1 opacity-60" />
            <div className="text-sm tracking-tight text-zinc-500 leading-none">{pjson.version}</div>
          </a>
        </div>
      </div>
    </div>
  )
}
