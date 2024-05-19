import { TextButton } from '../components/button'

export const Header: React.FC<{ signOut: () => void }> = ({ signOut }) => {
  return (
    <div className="fixed top-0 z-20 flex flex-row">
      <div className='px-4 py-3 m-2'>
        projects
      </div>
      <div>
        <TextButton onClick={signOut} >
          Sign out
        </TextButton>
      </div>
    </div>
  )
}
