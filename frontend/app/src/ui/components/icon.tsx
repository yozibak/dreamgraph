type IconProps = {
  className?: string
  onClick?: () => void
}

export const Circle: React.FC<IconProps> = ({ className }) => (
  <div
    className={'w-3 h-3 border-2 rounded-full border-gray-600 inline-block my-auto ' + className}
  />
)

export const CircleBig: React.FC<IconProps> = ({ className, onClick }) => (
  <div
    onClick={onClick}
    className={'w-5 h-5 border-2 rounded-full border-gray-600 inline-block my-auto ' + className}
  />
)

export const CircleWithEdge = () => (
  <>
    <div className="w-2 border border-gray-500 h-0 my-auto" />
    <Circle />
  </>
)

export const CircleEdge: React.FC<IconProps> = ({ className }) => (
  <div className={'w-2 border border-gray-500 h-0 my-auto ' + className} />
)
