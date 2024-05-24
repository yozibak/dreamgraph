import { useState } from 'react'

type ToggleProps = {
  DefaultUI: ({ toggle }: { toggle: () => void }) => React.ReactNode
  AltUI: ({ toggle }: { toggle: () => void }) => React.ReactNode
}

export const Toggle: React.FC<ToggleProps> = ({ DefaultUI, AltUI }) => {
  const [isAlt, setIsAlt] = useState(false)
  return isAlt ? (
    <AltUI toggle={() => setIsAlt(false)} />
  ) : (
    <DefaultUI toggle={() => setIsAlt(true)} />
  )
}
