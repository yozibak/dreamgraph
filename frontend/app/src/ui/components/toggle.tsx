import { useState } from 'react'

type ToggleProps = {
  DefaultUI: () => React.ReactNode
  AltUI: ({ backToDefault }: { backToDefault: () => void }) => React.ReactNode
}

export const Toggle: React.FC<ToggleProps> = ({ DefaultUI, AltUI }) => {
  const [isAlt, setIsAlt] = useState(false)

  if (isAlt) return <AltUI backToDefault={() => setIsAlt(false)} />
  return (
    <div onClick={() => setIsAlt(true)}>
      <DefaultUI />
    </div>
  )
}
