import { WaypointsIcon } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '../../auth'

export const Header: React.FC = () => {
  const auth = useContext(AuthContext)
  const command = auth.isAuthenticated ? 'Sign Out' : 'Sign In'
  return (
    <div className="fixed top-0 z-20 flex flex-row justify-start align-middle space-x-2 py-3 px-4">
      <div className="inline-flex justify-start space-x-2">
        <WaypointsIcon className="block" size={24} />
        <div className="font-semibold tracking-tight text-zinc-800">dreamgraph.me</div>
      </div>

      {/* TODO: make this better */}
      <button
        className="opacity-0 hover:opacity-100 inline-flex flex-col justify-center text-sm text-zinc-600 "
        onClick={auth.switchAuth}
      >
        <p className="min-w-4 ">{command}</p>
      </button>
    </div>
  )
}
