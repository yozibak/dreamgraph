import { ReactNode } from 'react'

export const Tools: React.FC<{ buttons: ReactNode[] }> = ({ buttons }) => {
  return (
    <div className="rounded-full bg-gray-100 border border-gray-400 flex flex-row">
      {buttons.map((b, i) => (
        <div key={`tool-btns-${i}`} className="border-r border-r-gray-400 last:border-none">{b}</div>
      ))}
    </div>
  )
}
