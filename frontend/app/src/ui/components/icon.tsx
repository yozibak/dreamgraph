

export const Circle = () => (
  <div className="w-3 h-3 border-2 rounded-full border-gray-600 inline-block my-auto" />
)

export const CircleBig = () => <div className="w-5 h-5 border-2 rounded-full border-gray-600 inline-block my-auto" />

export const CircleWithEdge = () => (
  <>
    <div className="w-2 border border-gray-500 h-0 my-auto" />
    <Circle />
  </>
)
