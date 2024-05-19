export const Aesthetics = () => {
  return (
    <div className="bg-gray-200 w-full h-full p-4 font-sans font-light">
      <div className="text-black font-bold leading-normal tracking-normal text-4xl">Dreamgraph</div>
      <div className="text-black text-2xl">better project organization</div>

      <div>
        <button className=" bg-white font-bold border-4 border-black px-4 py-3 m-2 rounded-xl tracking-wide hover:text-gray-800">
          Log in
        </button>

        <button className=" text-black underline font-bold border-4 px-4 py-3 m-2 rounded-xl tracking-wide hover:text-gray-800">
          Sign out
        </button>

        <button className=" text-white bg-gray-600 px-4 py-3 m-2 rounded-full tracking-wide ">
          Add project
        </button>
      </div>

      <div className="w-1/3 bg-white px-3 pt-1 pb-2 shadow shadow-gray-300 rounded-md">
        <div className="text-black text-2xl py-2 leading-relaxed font-bold">Project 1</div>

        <div className="text-black flex justify-items-center">
          <div className="border-2 border-gray-500 h-0 my-auto"/>
          <Circle />
          <div className="ml-2 relative bottom-px">lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        </div>
        <div className="text-black">
          <Circle />
          <div className="ml-2 inline-block">
            lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
        <div className="text-red-600">Delete this project</div>
      </div>

      <div className="pt-8" />
      <div className="w-8 h-8 rounded-full bg-white border-blue-800 border-4 hover:bg-gray-50 hover:border-blue-600"></div>
      <div className="w-8 h-8 rounded-full bg-gray-50 border-blue-600 border-4"></div>
      <div className="w-8 h-8 rounded-full bg-white border-red-600 border-4"></div>
      <div className="w-8 h-8 rounded-full bg-gray-50 border-red-500 border-4"></div>
      <div className="w-8 h-8 rounded-full bg-white border-green-600 border-4"></div>
      <div className="w-8 h-8 rounded-full bg-gray-50 border-green-400 border-4"></div>

      <div className="w-8 h-8 rounded-full bg-white border-gray-600 border-4"></div>
      <div className="w-8 h-8 rounded-full bg-gray-50 border-gray-400 border-4"></div>
      <div className="w-8 h-8 rounded-full bg-gray-600 border-gray-900 border-4"></div>
    </div>
  )
}



const Circle = () => (
  <div className="w-3 h-3 border-2 rounded-full border-gray-600 inline-block my-auto" />
)
