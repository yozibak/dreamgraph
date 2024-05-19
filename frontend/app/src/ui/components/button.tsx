import { PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<{
  onClick: (() => void) | (() => Promise<void>)
}>

export const TextButton: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick} className=" text-black px-4 py-3 m-2 tracking-wide hover:text-gray-600">
    {children}
  </button>
)

export const FloatingButton: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-gray-600 text-white px-4 py-3 m-2 rounded-full tracking-wide hover:bg-gray-500 hover:text-gray-50"
  >
    {children}
  </button>
)
