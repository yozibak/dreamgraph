import { useContext, useState } from 'react'

import { ProjectsContext, useProjects } from './store/projects'
import { CreateProjectInput } from 'common'

export const Dreams = () => {
  const context = useProjects()
  return (
    <ProjectsContext.Provider value={context}>
      <div>
        <h1>My graph</h1>
        <List />
        <AddForm />
      </div>
    </ProjectsContext.Provider>
  )
}

export const List = () => {
  const { projects, searchProject, removeProject, editProject } = useContext(ProjectsContext)
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.projectId}>
          <b>{project.title}</b>
          <span>⇨ {searchProject(project.unlocks[0])?.title}</span>
          <button onClick={() => removeProject(project.projectId)}>🗑️</button>
          <button onClick={() => editProject({...project, title: 'edited'})}>edit</button>
        </li>
      ))}
    </ul>
  )
}

export const AddForm = () => {
  const { addProject, projects } = useContext(ProjectsContext)
  const [formState, setFormState] = useState<CreateProjectInput>({ title: '', unlocks: [] })
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({ ...formState, unlocks: [e.target.value] })
  }
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await addProject(formState)
      }}
    >
      <label>
        Title:
        <input onChange={onChangeInput} type="text" name="title" />
      </label>
      <label>
        Unlocks:
        <select onChange={onChangeSelect}>
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.projectId} value={project.projectId}>
              {project.title}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}
