import { useEffect, useState } from 'react'
import { ProjectTooltipInfo } from '../../application/services/projectExcerpt'

const AnimationMs = 150

export const ProjectExcerptTooltip: React.FC<ProjectTooltipInfo> = ({
  projectExcerpt,
  shouldOpen,
  nodePosition,
}) => {
  const [shouldRender, setRender] = useState(false)

  // hold the data while animation's still running
  const [excerpt, setExcerpt] = useState(projectExcerpt)

  useEffect(() => {
    if (shouldOpen && projectExcerpt) {
      setRender(true)
      setExcerpt(projectExcerpt)
    }
  }, [shouldOpen, projectExcerpt])

  // unmount before it renders normally after the animation
  const scheduleUnmount = (time = AnimationMs - 10) => {
    if (!shouldOpen) {
      setTimeout(() => setRender(false), time)
    }
  }

  if (!shouldRender) return
  return (
    <div className="fixed" style={{ left: nodePosition.x, top: nodePosition.y }}>
      <div
        onAnimationStart={() => scheduleUnmount()}
        data-state={shouldOpen ? 'open' : 'closed'}
        data-side={'right'}
        className="
    z-50 w-64 rounded-md border border-zinc-200 bg-white p-4 text-zinc-950 shadow-md outline-none 
    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
    data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 
    dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
      >
        <div>{excerpt?.title}:</div>
        <div className='ml-4'>status: {excerpt?.status}</div>
        <div className='ml-4'>value: {excerpt?.value}</div>
      </div>
    </div>
  )
}
