import { EdgeItem, Graph, makeGraphNetwork } from 'graph'
import { graphOptions } from '../interface/network'

export const Welcome: React.FC<{ login: () => void; appVersion: string }> = ({
  login,
  appVersion,
}) => {
  return (
    <>
      <div className="mt-12 px-8 z-20 relative">
        <div className="text-gray-950 font-bold leading-normal tracking-normal text-4xl sm:text-6xl">
          Get untangled.
        </div>
        <div className="my-4 text-black text-2xl leading-8">
          Dreamgraph organizes your project dependencies.
        </div>
        <div className="mt-8">
          <button
            onClick={login}
            className=" bg-white font-bold border-4 border-black px-8 py-3 rounded-xl tracking-wide hover:text-gray-800"
          >
            Sign up
          </button>
        </div>
      </div>
      <a className="fixed bottom-12 left-8 z-20" href="https://github.com/yozibak/dreamgraph">
        version: beta-{appVersion}
      </a>
      <SampleNetwork />
    </>
  )
}

const randomIntBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const sampleNodes = [...Array(30)].map((_, i) => ({
  id: i.toString(),
  label: ``,
  size: randomIntBetween(1, 4) * 10,
}))
const sampleEdges = [...Array(30)].flatMap((_, i) => [
  { from: i.toString(), to: randomIntBetween(0, 30) },
])

const sampleNetwork = makeGraphNetwork()

sampleNodes.forEach((node) => sampleNetwork.putNode(node))
sampleEdges.forEach((edge) => sampleNetwork.putEdge(edge as unknown as EdgeItem))

const SampleNetwork = () => (
  <div className="fixed top-0 h-full w-full opacity-50">
    <Graph network={sampleNetwork} options={graphOptions} />
  </div>
)
