import { PropsWithChildren } from 'react'

export const CenterBottom: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="fixed bottom-12 z-10 mx-auto left-1/2 -translate-x-1/2">{children}</div>
}
