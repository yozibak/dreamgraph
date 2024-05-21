import { PropsWithChildren } from 'react'

export const CenterBottom: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="fixed bottom-12 z-10 mx-auto left-1/2 -translate-x-1/2">{children}</div>
}

export const Container: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="h-dvh w-dvw text-gray-800 ">{children}</div>
)

export const TwoColumnsGrid: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="grid grid-cols-project gap-4">{children}</div>
)
