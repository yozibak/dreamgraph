import { PropsWithChildren } from 'react'

export const Modal: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="fixed bottom-12 z-10 w-2/3 min-w-96 bg-gray-200">{children}</div>
}

