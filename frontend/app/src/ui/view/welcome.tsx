export const Welcome: React.FC<{ login: () => void }> = ({ login }) => {
  return (
    <div className="p-12">
      <div className="text-black font-bold leading-normal tracking-normal text-5xl">
        Do One Thing, Achieve More.
      </div>
      <div className="text-black text-xl">Dremagraph is your personal journey map.</div>
      <div className="mt-4">
        <button
          onClick={login}
          className=" bg-white font-bold border-4 border-black px-6 py-3 rounded-xl tracking-wide hover:text-gray-800"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}
