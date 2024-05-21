import { PropsWithChildren } from 'react'

type PaperProps<E = HTMLDivElement> = React.HTMLAttributes<E>

export const Panel: React.FC<PropsWithChildren<PaperProps>> = ({ children, className, style }) => (
  <div
    className={
      `rounded-sm opacity-95 bg-white border-black border-2 ` + className
    }
    style={style}
  >
    {children}
  </div>
)
