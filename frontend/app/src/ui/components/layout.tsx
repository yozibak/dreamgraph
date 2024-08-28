import { PropsWithChildren } from 'react'
import { Position } from '../../application/state/interaction'

export const CenterBottom: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="fixed bottom-12 z-10 mx-auto left-1/2 -translate-x-1/2">{children}</div>
}

export const Container: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="h-dvh w-dvw text-gray-800 ">{children}</div>
)

export const TwoColumnsGrid: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="grid grid-cols-project gap-x-4 gap-y-6">{children}</div>
)

export const Positioned: React.FC<PropsWithChildren<{ position: Position; width: number }>> = ({
  children,
  position,
  width,
}) => (
  <div className="fixed" style={{ left: position.x - width / 6, top: position.y }}>
    {children}
  </div>
)
