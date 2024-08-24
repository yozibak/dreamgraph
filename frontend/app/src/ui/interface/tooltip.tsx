import { createContext, useContext } from "react"
import { withContext } from "../utils"
import { ProjectExcerptInfo } from "../../application/services/projectExcerpt"

const ProjectExcerptContext = createContext<ProjectExcerptInfo>({} as ProjectExcerptInfo)

export const ProjectExcerptToolTip = withContext(ProjectExcerptContext, () => {
  const { title, value, status } = useContext(ProjectExcerptContext)
  return (
    <div className="bg-black text-white fixed right-32">
      <div>{title}:</div>
      <div className="ml-4">value: {value}</div>
      <div className="ml-4">status: {status}</div>
    </div>
  )
})
