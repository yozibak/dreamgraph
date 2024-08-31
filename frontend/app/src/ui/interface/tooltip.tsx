import { ProjectImportanceExpression, ProjectStatusExpression } from 'app-domain'
import React, { useEffect, useState } from 'react'
import { ProjectTooltipInfo } from '../../application/services/projectExcerpt'
import { Card } from '../components/card'
import { Positioned } from '../components/layout'
import { Badge } from '../components/ui/badge'

const AnimationMs = 150

export const ProjectExcerptTooltip: React.FC<ProjectTooltipInfo> = ({
  projectExcerpt,
  shouldOpen,
  nodePosition,
  clickOnInfo,
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

  if (!shouldRender || !excerpt) return
  return (
    <Positioned position={nodePosition} width={320}>
      <Card
        className="cursor-pointer w-80 opacity-95"
        onClick={clickOnInfo}
        onAnimationStart={() => scheduleUnmount()}
        data-state={shouldOpen ? 'open' : 'closed'}
        data-side={'bottom'}
      >
        <div className="flex justify-left space-x-2">
          <CircleWithValue value={excerpt.value} />
          <div className="flex flex-col justify-center space-y-2">
            <div className="ml-1 font-semibold leading-none tracking-tight">{excerpt.title}</div>
            <div className="inline-flex">
              <Badge variant="secondary">{ProjectImportanceExpression[excerpt.importance]}</Badge>
              <div className="inline-flex align-middle ml-2">
                <p className="text-sm text-zinc-500">{ProjectStatusExpression[excerpt.status]}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Positioned>
  )
}

export const CircleWithValue: React.FC<{ value?: number }> = ({ value }) => {
  return (
    <div className="w-14 h-14 inline-flex items-center justify-center">
      <div className="w-14 h-14 m-auto rounded-full border-4 border-zinc-600 inline-flex items-center justify-center">
        <div className="text-zinc-600">{value}</div>
      </div>
    </div>
  )
}
