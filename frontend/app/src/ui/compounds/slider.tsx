import { StaticStatus, StaticValue } from 'common'
import { CircleBig, CircleEdge } from '../components/icon'
import { useState } from 'react'

type SliderProps<V> = { onChange: (v: V) => void; value: V }

export const StatusSlider: React.FC<SliderProps<StaticStatus>> = ({ onChange, value }) => {
  return (
    <div className="w-40">
      <div className="flex justify-between">
        <CircleWithText
          onClick={() => onChange('normal')}
          highlight={value === 'normal'}
          color="border-gray-600"
          text="idle"
        />
        <CircleEdge className="grow w-4 border-gray-200" />
        <CircleWithText
          onClick={() => onChange('ongoing')}
          highlight={value === 'ongoing'}
          color="border-blue-600"
          text="ongoing"
        />
        <CircleEdge className="grow border-gray-200" />
        <CircleWithText
          onClick={() => onChange('done')}
          highlight={value === 'done'}
          color="border-green-600"
          text="done"
        />
      </div>
    </div>
  )
}

const CircleWithText: React.FC<{
  onClick: () => void
  highlight: boolean
  color: string
  text: string
}> = ({ onClick, highlight, color, text }) => {
  return (
    <div className="relative h-5">
      <CircleBig
        className={highlight ? color : `border-gray-200 hover:${color}`}
        onClick={onClick}
      />
      <div className="text-xs absolute -bottom-4 left-1/2 -translate-x-1/2">
        {highlight ? text : ''}
      </div>
    </div>
  )
}

export const ValueSlider: React.FC<SliderProps<StaticValue>> = ({ onChange, value }) => {
  const [v, setV] = useState(value)
  return (
    <div
      onMouseLeave={() => setV(value)}
      className="w-40 h-full flex space-x-1 justify-between items-center"
    >
      <ValueSliderBlock currentV={v} v={1} setV={setV} onClick={onChange} />
      <ValueSliderBlock currentV={v} v={2} setV={setV} onClick={onChange} />
      <ValueSliderBlock currentV={v} v={3} setV={setV} onClick={onChange} />
      <ValueSliderBlock currentV={v} v={4} setV={setV} onClick={onChange} />
      <ValueSliderBlock currentV={v} v={5} setV={setV} onClick={onChange} />
    </div>
  )
}

const ValueSliderBlock: React.FC<{
  currentV: StaticValue
  v: StaticValue
  setV: (v: StaticValue) => void
  onClick: (v: StaticValue) => void
}> = ({ currentV, v, setV, onClick }) => (
  <div
    onMouseEnter={() => setV(v)}
    onClick={() => onClick(v)}
    className={`grow h-4 ${currentV >= v ? 'bg-gray-600' : 'bg-gray-200'}`}
  />
)
